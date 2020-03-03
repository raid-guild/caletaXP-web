import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';

import { CurrentUserContext } from '../../contexts/Store';
import { Web3SignIn } from '../../components/account/Web3SignIn';

const GameDetail = props => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  return (
    <div>
      <h1>Game Detail</h1>
      <Row>
        <Col>
          <h2>Game {props.match.params.game}</h2>
        </Col>
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
    </div>
  );
};

export default GameDetail;
