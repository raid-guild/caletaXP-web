import React, { useState, useContext, useEffect } from 'react';
import {
  Row,
  Col,
  Spinner,
  Button,
  Tabs,
  Tab,
  Image,
  Modal,
} from 'react-bootstrap';
import Box from '3box';

import { get } from '../../utils/Requests';
import { useInterval } from '../../utils/PollingUtil';
import { Web3SignIn } from '../../components/account/Web3SignIn';
import {
  CurrentUserContext,
  Web3ConnectContext,
  addresses,
} from '../../contexts/Store';
import { addOneUpStatus } from '../../utils/Helpers';
import OneUpFeed from '../../components/claims/OneUpFeed';
import SubmitToDao from '../../components/submissions/SubmitToDao';
import SubmissionList from '../../components/submissions/SubmissionList';
import ERC20Abi from '../../contracts/erc20.json';
import LiveSubmissionCountdown from '../../components/submissions/LiveSubmissionCountdown';

import styled from 'styled-components';
import TelegramIconSrc from '../../assets/img/telegram-icon.svg';
import DiscordIconSrc from '../../assets/img/discord-icon.svg';

const TelegramIcon = styled.img`
  width: 22px;
`;
const DiscordIcon = styled.img`
  width: 22px;
`;

const UserDetail = ({ match, history }) => {
  const [loading, setLoading] = useState(false);
  const [oneUps, setOneUps] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [validSubmissionCount, setValidSubmissionCount] = useState();
  const [userDetail, setUserDetail] = useState();
  const [otherUserDetail, setOtherUserDetail] = useState();
  const [user3BoxDetail, setUser3BoxDetail] = useState();
  const [upBalance, setUpBalance] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [currentWeb3User, setCurrentUser] = useContext(CurrentUserContext);
  const [w3c] = useContext(Web3ConnectContext);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const [delay, setDelay] = useState(300);
  const fetchData = async () => {
    if (delay === 300) {
      setLoading(true);
    }

    try {
      const res = await get(`one-up/${match.params.username}`);
      const submissionRes = await get(
        `submissions/username/${match.params.username}`,
      );
      if (!submissionRes.data.length) {
        submissionRes.data = [];
      }
      if (!res.data.length) {
        res.data = [];
      }

      const oneUpsStatus = res.data.map(oneUp => addOneUpStatus(oneUp));

      let ethRes;
      if (userDetail) {
        ethRes = await get(`ethAddress/${userDetail.ethAddress}`);
      }

      if (ethRes && ethRes.data.length > 1) {
        const otherProfile = ethRes.data.find(profile => {
          return profile.fields.username.substr(1) !== match.params.username;
        });
        setOtherUserDetail(otherProfile.fields);
        const otherUps = await get(
          `one-up/${otherProfile.fields.username.substr(1)}`,
        );

        if (!otherUps.data.length) {
          otherUps.data = [];
        }
        const otherUpsStatus = otherUps.data.map(oneUp =>
          addOneUpStatus(oneUp),
        );
        setOneUps([...oneUpsStatus, ...otherUpsStatus]);

        const otherSubmissionRes = await get(
          `submissions/username/${otherProfile.fields.username.substr(1)}`,
        );

        const mergedSubmissions = otherSubmissionRes.data.length
          ? [...submissionRes.data, ...otherSubmissionRes.data]
          : submissionRes.data;

        setSubmissions(mergedSubmissions);
        setValidSubmissionCount(
          oneUpsStatus.filter(up => up.status.name === 'window').length +
            otherUpsStatus.filter(up => up.status.name === 'window').length,
        );
      } else {
        setOneUps(oneUpsStatus);

        setSubmissions(submissionRes.data);
        setValidSubmissionCount(
          oneUpsStatus.filter(up => up.status.name === 'window').length,
        );
      }

      setLoading(false);
      setDelay(10000);
    } catch (err) {
      console.log('get err', err);
      setDelay(null);
    }
  };

  useInterval(fetchData, delay);

  useEffect(() => {
    const upAddress =
      +process.env.REACT_APP_CHAIN_ID === 42
        ? addresses.kovan.upToken
        : addresses.main.upToken;

    const get3BoxProfileAndTokens = async () => {
      const profile = await Box.getProfile(userDetail.ethAddress);

      //TODO: should use network only infura
      if (w3c.web3) {
        const contract = new w3c.web3.eth.Contract(ERC20Abi, upAddress);

        const upBalanceInWei = await contract.methods
          .balanceOf(userDetail.ethAddress)
          .call();
        const tokens = w3c.web3.utils.fromWei('' + upBalanceInWei);
        setUpBalance(tokens);
      }

      setUser3BoxDetail(profile);
    };
    if (userDetail && userDetail.ethAddress) {
      get3BoxProfileAndTokens();
    }
  }, [userDetail, w3c]);

  useEffect(() => {
    const get1upProfile = async () => {
      const res = await get(`username/${match.params.username}`);

      if (res.data[0]) {
        setUserDetail(res.data[0].fields);
      }
    };
    if (match.params.username) {
      get1upProfile();
    }
  }, [match]);

  const handleNav = submissionId => {
    history.push(
      `/user-detail/${match.params.username}/submission/${submissionId}`,
    );
  };

  const handleDiscordClaim = async discordUserId => {
    handleModalClose();
    if (discordUserId) {
      const res = await get(`claim/discord/${discordUserId}`);
      alert('a message was sent to your Discord with further instructions');
      console.log('sent dm', res);
    }
  };

  const noChatIdUsername =
    userDetail && !userDetail.telegramChatId && !userDetail.discordChatId;
  const noChatIdOtherUsername =
    otherUserDetail &&
    !otherUserDetail.telegramChatId &&
    !otherUserDetail.discordChatId;

  return (
    <>
      <div className="user-details">
        <Row>
          <Col>
            {user3BoxDetail ? (
              <>
                <a
                  href={
                    currentWeb3User &&
                    userDetail &&
                    userDetail.ethAddress === currentWeb3User.username
                      ? `https://3box.io/${userDetail.ethAddress}/edit`
                      : `https://3box.io/${userDetail.ethAddress}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="username">
                    <Image
                      width="40"
                      height="40"
                      style={{ backgroundColor: '#b5b5b5' }}
                      src={
                        user3BoxDetail.image
                          ? `https://ipfs.infura.io/ipfs/${user3BoxDetail.image[0].contentUrl['/']}`
                          : null
                      }
                      roundedCircle
                    />{' '}
                    {user3BoxDetail.name} {user3BoxDetail.emoji}
                  </h2>
                </a>
              </>
            ) : (
              <h2 className="username">
                {(userDetail && userDetail.username) ||
                  '@' + match.params.username}
              </h2>
            )}
            <div className="other-username-wrapper">
              <h3>
                {(userDetail && userDetail.telegramChatId) ||
                noChatIdUsername ? (
                  <TelegramIcon src={TelegramIconSrc} />
                ) : null}
                {userDetail && userDetail.discordChatId ? (
                  <DiscordIcon src={DiscordIconSrc} />
                ) : null}

                {(userDetail && userDetail.username) ||
                  '@' + match.params.username}
              </h3>

              {otherUserDetail ? (
                <h3>
                  {otherUserDetail.telegramChatId || noChatIdOtherUsername ? (
                    <TelegramIcon src={TelegramIconSrc} />
                  ) : null}
                  {otherUserDetail.discordChatId ? (
                    <DiscordIcon src={DiscordIconSrc} />
                  ) : null}

                  {otherUserDetail.username}
                </h3>
              ) : null}
            </div>
            <div className="button-options">
              {currentWeb3User &&
                currentWeb3User.username &&
                userDetail &&
                userDetail.ethAddress === currentWeb3User.username && (
                  <SubmitToDao
                    oneUps={oneUps}
                    user={{
                      username: match.params.username,
                      ethAddress: currentWeb3User.username,
                    }}
                  />
                )}
              {currentWeb3User && currentWeb3User.username ? (
                <>
                  {!userDetail && oneUps.length && (
                    <>
                      {oneUps[0].fields.sourceName === 'discord' ? (
                        <Button
                          onClick={handleModalShow}
                          variant="info"
                          className="button-primary"
                        >
                          Claim Username
                        </Button>
                      ) : (
                        <Button
                          href={`https://t.me/oneupworld_bot?start=${currentWeb3User.username}`}
                          variant="info"
                          className="button-primary"
                        >
                          Claim Username
                        </Button>
                      )}
                    </>
                  )}
                </>
              ) : (
                <Web3SignIn setCurrentUser={setCurrentUser} />
              )}
            </div>
          </Col>
          <Col>
            <div className="oneup-total-wrapper">
              <h3 className="oneup-count">
                {oneUps.length || 0} TOTAL <br />
                <span>nominations received</span>
              </h3>
              {upBalance && (
                <div className="upBalance">
                  <h3 className="oneup-count">
                    {parseFloat(upBalance).toFixed(2)} CLAIMED <br />
                    <span>1UP balance</span>
                  </h3>
                </div>
              )}
            </div>
            {validSubmissionCount ? (
              // <SubmissionCountdown upCount={validSubmissionCount} />
              <LiveSubmissionCountdown upCount={validSubmissionCount} />
            ) : null}
            {/* <p>
              These are the points that others have given to you. You can only
              submit points 1 week after you have earned them!{' '}
            </p> */}
            <div className="emoji-wrapper">
              <p>
                <span role="img" aria-label="new">
                  ⭐
                </span>
                : New 1UP!
              </p>
              <p>
                <span role="img" aria-label="valid">
                  🍄
                </span>
                : In the submission window
              </p>
              <p>
                <span role="img" aria-label="invalid">
                  💀
                </span>
                : Too old to submit
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {loading ? (
              <Spinner animation="grow" variant="info" />
            ) : (
              <Tabs defaultActiveKey="oneUps" className="Scoreboard">
                <Tab eventKey="oneUps" title="All 1Ups" className="oneUps">
                  {loading ? (
                    <Spinner animation="grow" variant="info" />
                  ) : (
                    <OneUpFeed
                      oneUps={oneUps}
                      handleNav={false}
                      isUserDetail={true}
                    />
                  )}
                </Tab>
                <Tab
                  eventKey="feed"
                  title="Submissions"
                  className="submissions"
                >
                  {loading ? (
                    <Spinner animation="grow" variant="info" />
                  ) : (
                    <SubmissionList
                      submissions={submissions}
                      handleNav={handleNav}
                    />
                  )}
                </Tab>
              </Tabs>
            )}
          </Col>
        </Row>
      </div>

      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Calim Ethereum Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will send a DM to you with instructions to claim this account
          with your Ethereum Address
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleDiscordClaim(oneUps[0].fields.discordUserId)}
          >
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDetail;
