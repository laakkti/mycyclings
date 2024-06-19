import React from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { HouseDoor } from "react-bootstrap-icons";


const NavigationBar = () => {
    return (
      <Navbar bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand></Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>
              <Button  variant="success" size='sm'>
              <HouseDoor color="white" size={20} />
              </Button>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/statistics">
            <Nav.Link>Statistics</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>

        </Nav>
      </Navbar>
    );
  };

  export default NavigationBar;