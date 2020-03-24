import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Spinner, Button, Tabs, Tab } from 'react-bootstrap';
import Box from '3box';

import { get } from '../../utils/Requests';
import { useInterval } from '../../utils/PollingUtil';
import { Web3SignIn } from '../../components/account/Web3SignIn';
import { CurrentUserContext } from '../../contexts/Store';
import { addOneUpStatus } from '../../utils/Helpers';
import OneUpFeed from '../../components/claims/OneUpFeed';
import SubmitToDao from '../../components/submissions/SubmitToDao';
import SubmissionList from '../../components/submissions/SubmissionList';
import SubmissionCountdown from '../../components/submissions/SubmissionCountdown';

const UserDetail = ({ match, history }) => {
  const [loading, setLoading] = useState(false);
  const [oneUps, setOneUps] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [validSubmissionCount, setValidSubmissionCount] = useState();
  const [userDetail, setUserDetail] = useState();
  const [user3BoxDetail, setUser3BoxDetail] = useState();
  const [currentWeb3User, setCurrentUser] = useContext(CurrentUserContext);

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
    const get3BoxProfile = async () => {
      const profile = await Box.getProfile(userDetail.ethAddress);

      setUser3BoxDetail(profile);
    };
    if (userDetail && userDetail.ethAddress) {
      get3BoxProfile();
    }
  }, [userDetail]);

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
            {user3BoxDetail && <p>{user3BoxDetail.emoji}</p>}
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
                  {!userDetail && (
                    <Button
                      href="https://t.me/oneupworld_bot"
                      variant="info"
                      className="button-primary"
                    >
                      Claim Your Username
                    </Button>
                  )}
                </>
              ) : (
                <Web3SignIn setCurrentUser={setCurrentUser} />
              )}
            </div>
          </Col>
          <Col>
            <p>
              These are the points you have accumulated (or points that others
              have given to you).{' '}
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
