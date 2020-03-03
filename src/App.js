import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Routes from './Routes';
import Header from './components/navigation/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container>
          <Routes />
        </Container>
      </Router>
    </div>
  );
}

export default App;
