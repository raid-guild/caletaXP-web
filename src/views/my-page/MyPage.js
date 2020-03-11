import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { CurrentUserContext } from '../../contexts/Store';
import { Web3SignIn } from '../../components/account/Web3SignIn';

const MyPage = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  return (
    <div>
      <h1>My Page</h1>
      <Row>
        <Col>
          {currentUser && currentUser.username ? (
            <p>{currentUser.username}</p>
          ) : (
            <>
              <p>Is this your page?</p>
              <Web3SignIn setCurrentUser={setCurrentUser} />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MyPage;
