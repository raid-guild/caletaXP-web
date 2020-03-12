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

  return (
    <>
      <div className="user-details">
        <Row>
          <Col>
            <h2 className="username">@{match.params.username}</h2>
            <h3 className="oneup-count">{oneUps.length || 0} 1-Ups</h3>
            <div className="button-options">
              <Button variant="info" disabled={true} className="button-primary">
                Log in with web3
              </Button>
              <Button variant="info" disabled={true} className="button-primary">
                Send to Dao
              </Button>
            </div>
            <p>Coming soon</p>
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
          {/* <Col ></Col> */}
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Spinner animation="grow" variant="info" />
            ) : (
              <div className="feed-wrapper">
                <OneUpFeed oneUps={oneUps} handleNav={false} />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserDetail;
