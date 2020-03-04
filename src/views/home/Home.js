import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ClaimFeed from '../../components/claims/ClaimFeed';
import GamesList from '../../components/games/GamesList';

const Home = () => {
  return (
    <>
      <Row>
        <Col>
          <h2>Header</h2>
          <p>
            <GamesList />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            feugiat ullamcorper neque nec aliquam. Fusce felis purus, tincidunt
            at ante id, consequat gravida nisl. Nulla ante leo, hendrerit ut
            placerat sit amet, imperdiet sed justo. Integer sit amet lectus
            vestibulum, condimentum sapien at, semper nunc.
          </p>
        </Col>
        <Col>
          <h2>XP Claimed</h2>
          <ClaimFeed />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </>
  );
};

export default Home;
