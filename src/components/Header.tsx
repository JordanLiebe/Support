import React, { FC, useContext } from 'react';
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthenticationContext from '../contexts/AuthenticationContext';

const Header: FC = () => {
  const auth = useContext(AuthenticationContext);
  const user = auth.user;
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Navbar.Brand href="#home">Support</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
          {auth.isLoggedIn && auth.user && (
            <Link to="/Issues" className="nav-link">
              Issues
            </Link>
          )}
        </Nav>

        {auth.isLoggedIn && auth.user ? (
          <Nav>
            <Link to="/Account" className="nav-link">
              Welcome,{' '}
              {auth.user.first_Name +
                ' ' +
                auth.user.middle_Name +
                ' ' +
                auth.user.last_Name}
            </Link>
            <Link to="/Logout" className="nav-link">
              Logout
            </Link>
          </Nav>
        ) : (
          <Nav>
            <Link to="/Register" className="nav-link">
              Register
            </Link>
            <Link to="/Login" className="nav-link">
              Login
            </Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
