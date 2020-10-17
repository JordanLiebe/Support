import React, { FC } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header: FC = () => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Navbar.Brand href="#home">Support</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">My Issues</Nav.Link>
          <Nav.Link href="/">Create</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
