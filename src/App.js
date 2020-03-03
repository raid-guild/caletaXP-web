import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Web3SignIn } from './components/account/Web3SignIn';
import { CurrentUserContext } from './contexts/Store';
import Routes from './Routes';

function App() {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  console.log('currentUser', currentUser);

  return (
    <div className="App">
      {currentUser && currentUser.username ? (
        <p>{currentUser.username}</p>
      ) : (
        <Web3SignIn setCurrentUser={setCurrentUser} />
      )}

      <Router>
        {/* <Header /> */}
        <Routes />
      </Router>
    </div>
  );
}

export default App;
