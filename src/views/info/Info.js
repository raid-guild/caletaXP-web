import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

import Weapon1Src from '../../assets/img/weapon1.png';
import Weapon2Src from '../../assets/img/weapon2.png';
import Weapon3Src from '../../assets/img/weapon3.png';
import Socials from '../../components/shared/Socials';

const Weapon1 = styled.img`
  width: 60%;
  margin: 20px 0px;
  transform: rotate(20deg);
`;

const Weapon2 = styled.img`
  width: 60%;
  margin: 20px 0px;
`;

const Weapon3 = styled.img`
  width: 60%;
  margin: 20px 0px;
`;

const Info = () => {
  return (
    <>
      <div className="info">
        <Row>
          <Col>
            <h2>WHAT IS THIS?</h2>
            <p>
            1UPs are points that others have given to you for work / contributions you have done.
            1UPs need to be submitted to the 1UP DAO within 1 week of receiving them… otherwise, they expire. {' '}
            </p>
            <p>
            Submitted 1UPs are aggregated within the 1UP DAO, effectively granting you voting power and 1UP tokens.
            Over time,  1UP can be spent on rewards (which haven't been created yet).
            1UPs can be given for anything that deserves one, but at the end of the day, they will be approved by the DAO. Gamified life, here we go!
            </p>
          </Col>
          <Col className="center-me">
            <Weapon1 src={Weapon1Src} />
          </Col>
        </Row>
        <Row>
          <Col className="center-me">
            <Weapon2 src={Weapon2Src} />
          </Col>
          <Col>
            <h2>WHAT'S THIS ABOUT</h2>
            <p>
            1UP aims to become a core piece of infrastructure in our bid to gamify life,
            by dishing out 1UPs in native chats before people are even aware of web3.
            </p>
            <p>
              {' '}
              Start by adding the Telegram bot (@oneupworld_bot) to your chat.
              The only two commands we support at this stage are: /help and /1up @username to dish out points.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>JOIN THE EXPERIMENT.</h2>
            <p>
            Right now, there is only a single “1UP” game. The vision is to allow any community to run a 1UP game,
            in parallel to their existing community, and to expand this concept to various networks.
            We also need to build our “game” which will be at the center of the action. Come join the party,
            as we move past prototype, and into the future.
            </p>
            <Socials />
          </Col>
          <Col className="center-me">
            <Weapon3 src={Weapon3Src} />
          </Col>
        </Row>
        <Row>
          <h1 className="insert-coin">insert coin</h1>
        </Row>
      </div>
    </>
  );
};

export default Info;
