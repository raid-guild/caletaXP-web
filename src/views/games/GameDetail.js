import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';

import { CurrentUserContext } from '../../contexts/Store';
import { Web3SignIn } from '../../components/account/Web3SignIn';
import Rankings from '../../components/games/Rankings';
import GameDetailCard from '../../components/games/GameDetailCard';

import { GAME_DATA } from '../../utils/Data';

const GameDetail = props => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const game = GAME_DATA.find(game => game.id === +props.match.params.game);

  return (
    <div>
      <Row>
        <GameDetailCard game={game} />
        <Col>
          {currentUser && currentUser.username ? (
            <p>{currentUser.username}</p>
          ) : (
            <>
              <p>Ready to claim your XP?</p>
              <Web3SignIn setCurrentUser={setCurrentUser} />
            </>
          )}
        </Col>
      </Row>
      <Row>
        <h3>Rankings</h3>
        <Rankings />
      </Row>
    </div>
  );
};

export default GameDetail;
