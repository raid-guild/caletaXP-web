import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { GAME_DATA } from '../../utils/Data';

const GamesList = () => {
  const renderGameCards = () => {
    return GAME_DATA.map(game => {
      return (
        <Col key={game.id}>
          <Link to={`games/${game.id}`}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="images/chili.jpg" />
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                  <p>{game.playerCount} Players</p>
                  <p>{game.totalXp} Xp</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      );
    });
  };

  return <Row>{renderGameCards()}</Row>;
};

export default GamesList;
