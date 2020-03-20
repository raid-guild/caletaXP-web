import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Tabs, Tab, Button, Spinner } from 'react-bootstrap';

import OneUpFeed from '../../components/claims/OneUpFeed';
import OneUpHighScores from '../../components/claims/OneUpHighScores';
import { get } from '../../utils/Requests';
import { useInterval } from '../../utils/PollingUtil';

import Socials from '../../components/shared/Socials';


const Home = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [oneUps, setOneUps] = useState([]);

  const [delay, setDelay] = useState(300);

  const fetchData = async () => {
    if (delay === 300) {
      setLoading(true);
    }

    try {
      const res = await get('one-ups');

      setOneUps(res.data);
      setLoading(false);
      setDelay(10000);
    } catch {
      console.log('get err');
      setDelay(null);
    }
  };

  useInterval(fetchData, delay);

  const handleNav = username => {
    const pathName = username.split('@')[1];
    history.push(`user-detail/${pathName}`);
  };

  return (
    <>
      <div className="home">
        <Row>
          <Col md="5">
            <h2 className="hero-title">
              Community tracking <br />
              for MMO coordination <br />
              games.
            </h2>
            <p>
              CaletaXP keeps track of value added activities within your
              community. Simply connect our Telegram bot (soon Discord), and start
              playing!
            </p>
            <p>
              Join our community if you would like to contribute, cool mind
              blowing things are around the corner.
            </p>

            <Link to="/info">
              <Button variant="info" className="button-primary">
                Learn More
              </Button>
            </Link>
            <div className="home-socials">
              <Socials />
            </div>
          </Col>
          <Col md="7">
            <Tabs defaultActiveKey="highScores" className="Scoreboard">
              <Tab
                eventKey="highScores"
                title="High Scores"
                className="highscores"
              >
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
        <Row>
          <h1 className="insert-coin">insert coin</h1>
        </Row>
      </div>
    </>
  );
};

export default withRouter(Home);
