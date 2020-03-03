import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { CurrentUserContext } from '../../contexts/Store';

const Header = () => {
  const [currentUser] = useContext(CurrentUserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">CaletaXP</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link href="/info">Info</Nav.Link>
          <Nav.Link href="/games">Games</Nav.Link>
          <Nav.Link href="/ranks">Ranks</Nav.Link>
          {currentUser && currentUser.username ? <p>69 XP</p> : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
