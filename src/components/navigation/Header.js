import React from 'react';
import styled from 'styled-components'
import { Navbar, Nav, Container } from 'react-bootstrap';
// import { CurrentUserContext } from '../../contexts/Store';
import { Link } from 'react-router-dom';
import LogoSrc from '../../assets/img/logo-glow.png';

const Logo = styled.img`
    width: 40%;
    margin: 15px 15px 15px 0px;
    @media (max-width: 768px) {
      width: 60%;
    }
`;

const Header = () => {
  // const [currentUser] = useContext(CurrentUserContext);

  return (
    <Navbar expand="lg" className="Navbar">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Logo src={LogoSrc} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Link to="/info" className="nav-item">about</Link>
            {/* <Link to="/games">Games</Link>
            {currentUser && currentUser.username ? (
              <Link to="/my-page">69 XP</Link>
            ) : null} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
