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
    const res = await get(`one-up/${match.params.username}`);

    setOneUps(res.data);
    setLoading(false);
    setDelay(3000);
  };

  useInterval(fetchData, delay);

  return (
    <>
      <Row>
        <Col>
          <h2>@{match.params.username}</h2>
          <h3>{oneUps.length || 0} Total 1-Ups</h3>
        </Col>
        <Col>
          <Button variant="info" disabled={true}>
            Log in with web3
          </Button>
          <Button variant="info" disabled={true}>
            Send to Dao
          </Button>
          <p>Coming soon</p>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <OneUpFeed oneUps={oneUps} handleNav={false} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserDetail;
