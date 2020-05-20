import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Spinner, Button, Tabs, Tab, Image } from 'react-bootstrap';
import Box from '3box';

import { get } from '../../utils/Requests';
import { useInterval } from '../../utils/PollingUtil';
import { Web3SignIn } from '../../components/account/Web3SignIn';
import { CurrentUserContext, Web3ConnectContext, addresses } from '../../contexts/Store';
import { addOneUpStatus } from '../../utils/Helpers';
import OneUpFeed from '../../components/claims/OneUpFeed';
import SubmitToDao from '../../components/submissions/SubmitToDao';
import SubmissionList from '../../components/submissions/SubmissionList';
import SubmissionCountdown from '../../components/submissions/SubmissionCountdown';

import ERC20Abi from '../../contracts/erc20.json';

const UserDetail = ({ match, history }) => {
  const [loading, setLoading] = useState(false);
  const [oneUps, setOneUps] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [validSubmissionCount, setValidSubmissionCount] = useState();
  const [userDetail, setUserDetail] = useState();
  const [user3BoxDetail, setUser3BoxDetail] = useState();
  const [upBalance, setUpBalance] = useState();
  const [currentWeb3User, setCurrentUser] = useContext(CurrentUserContext);
  const [w3c] = useContext(Web3ConnectContext);

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

      const oneUpsStatus = res.data.map(oneUp => addOneUpStatus(oneUp));
      setOneUps(oneUpsStatus);

      setSubmissions(submissionRes.data);
      setValidSubmissionCount(
        oneUpsStatus.filter(up => up.status.name === 'window').length,
      );

      setLoading(false);
      setDelay(10000);
    } catch {
      console.log('get err');
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

      const contract = new w3c.web3.eth.Contract(ERC20Abi, upAddress);

      const upBalanceInWei = await contract.methods
        .balanceOf(userDetail.ethAddress)
        .call();
      const tokens = w3c.web3.utils.fromWei('' + upBalanceInWei);
      setUpBalance(tokens);
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

  return (
    <>
      <div className="user-details">
        <Row>
          <Col>
            <h2 className="username">
              {(userDetail && userDetail.username) ||
                '@' + match.params.username}
            </h2>
            <h3 className="oneup-count">{oneUps.length || 0} 1-Ups</h3>
            {user3BoxDetail && (
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
                  <p>
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
                  </p>
                </a>
                <div className="upBalance">
                  <h3 className="oneup-count">
                    Current 1UP Tokens:{' '}
                    {parseFloat(upBalance).toFixed(2)}
                  </h3>
                </div>
              </>
            )}
            <div className="button-options">
              {validSubmissionCount ? (
                <SubmissionCountdown upCount={validSubmissionCount} />
              ) : null}
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
                          href={`https://discordapp.com/channels/@me/705176680284684289`}
                          variant="info"
                          className="button-primary"
                        >
                          Claim Your Username
                        </Button>
                      ) : (
                        <Button
                          href={`https://t.me/oneupworld_bot?start=${currentWeb3User.username}`}
                          variant="info"
                          className="button-primary"
                        >
                          Claim Your Username
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
            <p>
              These are the points that others have given to you. You can only
              submit points 1 week after you have earned them!{' '}
            </p>
            <p>
              <span role="img" aria-label="new">
                ⭐
              </span>
              : New 1Up!
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
    </>
  );
};

export default UserDetail;
