import React, { useState } from 'react';
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Tabs, Tab, Button, Spinner } from 'react-bootstrap';

import OneUpFeed from '../../components/claims/OneUpFeed';
import OneUpHighScores from '../../components/claims/OneUpHighScores';
import { get } from '../../utils/Requests';
import { useInterval } from '../../utils/PollingUtil';

import SwordSrc from '../../assets/img/sword.png';

const Sword = styled.img`
    width: 150px;
    height: 80px;
    margin: 15px 15px 25px 0px;
    transform: rotate(-20deg);
`;

const Home = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [oneUps, setOneUps] = useState([]);

  const [delay, setDelay] = useState(300);

  const fetchData = async () => {
    if (delay === 300) {
      setLoading(true);
    }
    const res = await get('one-ups');

    console.log(res);

    setOneUps(res.data);
    setLoading(false);
    setDelay(3000);
  };

  useInterval(fetchData, delay);

  const handleNav = username => {
    const pathName = username.split('@')[1];
    history.push(`user-detail/${pathName}`);
  };

  return (
    <>
      <Row>
        <Col md='6'>
        <Sword src={SwordSrc} />
        <h2>Community tracking <br />
          for MMO coordination <br />
          games.
        </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            feugiat ullamcorper neque nec aliquam. Fusce felis purus, tincidunt
            at ante id, consequat gravida nisl. Nulla ante leo, hendrerit ut
            placerat sit amet, imperdiet sed justo. Integer sit amet lectus
            vestibulum, condimentum sapien at, semper nunc.
          </p>

          <Link to="/info">
            <Button variant="info" className="button-primary">Learn More</Button>
          </Link>
        </Col>
        <Col md='6'>
          <Tabs defaultActiveKey="highScores" className="Scoreboard">
            <Tab eventKey="highScores" title="High Scores" className="highscores">
              {loading ? (
                <Spinner animation="grow" variant="info" />
              ) : (
                <OneUpHighScores oneUps={oneUps} handleNav={handleNav} />
              )}
            </Tab>
            <Tab eventKey="feed" title="Recent" className="recentscores">
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
