import React, { useState } from 'react';
import { Row, Col, Spinner, Button } from 'react-bootstrap';

import OneUpFeed from '../../components/claims/OneUpFeed';
import { get } from '../../utils/Requests';
import { useInterval } from '../../utils/PollingUtil';

const UserDetail = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [oneUps, setOneUps] = useState([]);

  const [delay, setDelay] = useState(300);
  const fetchData = async () => {
    if (delay === 300) {
      setLoading(true);
    }

    try {
      const res = await get(`one-up/${match.params.username}`);

      setOneUps(res.data);
      setLoading(false);
      setDelay(10000);
    } catch {
      console.log('get err');
      setDelay(null);
    }
  };

  useInterval(fetchData, delay);

  const submitToDAO = (oneUps) => {
    const daoHost = "https://alchemy.daostack.io"
    const daoRoute = "/dao/0xafdd1eb2511cd891acf2bff82dabf47e0c914d24/scheme/0x6da49c4e88ae95c4faaa9c2133b1fa7190b763cebc3d62332b1b07c859311221/proposals/create/";
    const beneficiary = `beneficiary=${'0x123'}`;
    const description = `&description=http://1up.world/user-detail/${'username'}`;
    const profileUrl = `&url=http://1up.world/user-detail/${'username'}`;
    const tokenInfo = `&ethReward=0&externalTokenAddress=0x543ff227f64aa17ea132bf9886cab5db55dcaddf&externalTokenReward=0`;
    const rewards = `&nativeTokenReward=${oneUps.length}&reputationReward=${oneUps.length}`
    const title = `&title=Submission 1 for ${'@username'}&url=&tags=[]`
    const url = `${daoHost}${daoRoute}?${beneficiary}${description}${profileUrl}${tokenInfo}${rewards}${title}`
    const encodedUrl = encodeURI(url);
    window.open(encodedUrl, "_blank")
  }

  return (
    <>
      <div className="user-details">
        <Row>
          <Col>
            <h2 className="username">@{match.params.username}</h2>
            <h3 className="oneup-count">{oneUps.length || 0} 1-Ups</h3>
            <div className="button-options">
              <Button variant="info" disabled={true} className="button-primary">
                Web3 Login
              </Button>
              <Button onClick={() => submitToDAO(oneUps)} variant="info" className="button-primary">
                Send to Dao
              </Button>
            </div>
          </Col>
          <Col>
            <p>
              These are the points you have accumulated (or points that others
              have given to you).{' '}
            </p>
            <p>
              You’ll soon be able to submit these transactions to your community
              DAO...stay tuned!
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Spinner animation="grow" variant="info" />
            ) : (
                <div className="feed-wrapper">
                  <OneUpFeed
                    oneUps={oneUps}
                    handleNav={false}
                    showChatTitle={true}
                  />
                </div>
              )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserDetail;
