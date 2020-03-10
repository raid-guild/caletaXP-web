import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import OneUpFeed from '../../components/claims/OneUpFeed';
import { get } from '../../utils/Requests';

const UserDetail = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [oneUps, setOneUps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await get(`one-up/${match.params.username}`);

      setOneUps(res.data);

      setLoading(false);

      console.log('res', res);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row>
        <Col>
          <h2>@{match.params.username}</h2>
          <h3>{oneUps.length || 0} Total 1-Ups</h3>
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
