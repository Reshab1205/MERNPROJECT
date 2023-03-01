import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import { MdNotifications } from 'react-icons/md';
import { VscCircleLargeOutline } from 'react-icons/vsc'
const Navigationbar = () => {

  

  return (
    <div>

      <Navbar bg="light" expand="lg" id="navbar-color">
        <Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <NavLink to="/Samples" className="navtags"> <VscCircleLargeOutline /></NavLink>
                <NavLink to="/EnterSample" className="navtags">@super_woman</NavLink>
              </Nav>
            

            <Nav className="d-flex">
            <NavLink to="/search" className="navtags"> <FiSearch /> </NavLink>
            <NavLink to="/" className="navtags"><MdNotifications /></NavLink>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar> 

    </div>
  );
};

export default Navigationbar;
