import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { CurrentUserContext } from '../../contexts/Store';
import { Link } from 'react-router-dom';

const Header = () => {
  const [currentUser] = useContext(CurrentUserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">CaletaXP</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Link to="/info">Info</Link>
          <Link to="/games">Games</Link>
          {currentUser && currentUser.username ? (
            <Link to="/my-page">69 XP</Link>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
