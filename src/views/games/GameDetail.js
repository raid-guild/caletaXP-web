import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { CurrentUserContext } from '../../contexts/Store';
import { Web3SignIn } from '../../components/account/Web3SignIn';
import Rankings from '../../components/games/Rankings';
import GameDetailCard from '../../components/games/GameDetailCard';

import { GAME_DATA } from '../../utils/Data';
import { get } from '../../utils/Requests';

const GameDetail = props => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const game = GAME_DATA.find(game => game.id === +props.match.params.game);

  useEffect(() => {
    const fetchData = async () => {
      const res = await get('test');

      console.log('res', res);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
