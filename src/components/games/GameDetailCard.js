import React from 'react';
import { Col } from 'react-bootstrap';

const GameDetailCard = ({ game }) => {
  return (
    <>
      <Col>
        <h3>{game.name}</h3>
        <p>{game.playerCount} Players</p>
        <p>{game.totalXp} Xp</p>
      </Col>
      <Col>
        <img variant="top" src="/images/chili.jpg" />
      </Col>
    </>
  );
};

export default GameDetailCard;
