import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

import Weapon1Src from '../../assets/img/weapon1.png';
import Weapon2Src from '../../assets/img/weapon2.png';
import Weapon3Src from '../../assets/img/weapon3.png';

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
              These are the points you have accumulated (or points that others
              have given to you).{' '}
            </p>
            <p>
              You’ll soon be able to submit these transactions to your community
              DAO...stay tuned!
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
              CaletaXP aims to become a core piece of infrastructure in our bid to
              gamify life, by dishing out XP in native chats before people are
              even aware of web3.
            </p>
            <p>
              {' '}
              Start by adding the Telegram bot (caletaXP bot) to your chat. The
              only two commands we support at this stage are: /help and /1up
              @username to dish out points.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>COME EAT SOME DOG FOOD.</h2>
            <p>
              Lots left to do, come join the party as we move past prototype, and
              into the game.
            </p>
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
