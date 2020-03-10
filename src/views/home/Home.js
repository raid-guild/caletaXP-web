import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Tabs, Tab, Button, Spinner } from 'react-bootstrap';

import OneUpFeed from '../../components/claims/OneUpFeed';
import OneUpHighScores from '../../components/claims/OneUpHighScores';
import { get } from '../../utils/Requests';

const Home = ({ history }) => {
  // poll for new oneUps and pass down to each sub to do that math/sorting
  const [loading, setLoading] = useState(false);
  const [oneUps, setOneUps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await get('one-ups');
      console.log('res', res);

      setOneUps(res.data);
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNav = username => {
    const pathName = username.split('@')[1];
    history.push(`user-detail/${pathName}`);
  };

  return (
    <>
      <h2>What is this?</h2>
      <Row>
        <Col>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            feugiat ullamcorper neque nec aliquam. Fusce felis purus, tincidunt
            at ante id, consequat gravida nisl. Nulla ante leo, hendrerit ut
            placerat sit amet, imperdiet sed justo. Integer sit amet lectus
            vestibulum, condimentum sapien at, semper nunc.
          </p>

          <Link to="/info">
            <Button variant="info">Learn More</Button>
          </Link>
        </Col>
        <Col>
          <Tabs defaultActiveKey="highScores">
            <Tab eventKey="highScores" title="High Scores">
              {loading ? (
                <Spinner animation="grow" variant="info" />
              ) : (
                <OneUpHighScores oneUps={oneUps} handleNav={handleNav} />
              )}
            </Tab>
            <Tab eventKey="feed" title="1-Up Live Feed">
              {loading ? (
                <Spinner animation="grow" variant="info" />
              ) : (
                <OneUpFeed oneUps={oneUps} handleNav={handleNav} />
              )}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(Home);
