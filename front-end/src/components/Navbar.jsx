import React, { useState, useEffect } from "react";
import { Button, Container, Form, Nav, Col, Navbar, Image, InputGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./NavBar.css"; // Custom CSS file

function NavBar({ searchTerm, setSearchTerm }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search button clicked");
    console.log(searchTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Navbar expand="lg" className="navbar-custom sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">
          <Col xs="auto" className="ms-4">
            <Image
              src="https://i.pinimg.com/564x/5a/db/34/5adb3415e2cffbcb0b114bdd10957163.jpg"
              alt="logo"
              fluid
              className="navbar-logo"
            />
            <p className="navbar-title">Car-Hub Rentals</p>
          </Col>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto my-2 my-lg-0"
            navbarScroll
            fill
            variant="tabs"
            defaultActiveKey="/home"
          >
            <Nav.Link as={NavLink} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-car" className="nav-link-custom">
              Add Cars
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Bookings" className="nav-link-custom">
              View Bookings
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 search-input"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
          <Nav className="ms-auto">
            {token ? (
              <Button variant="outline-danger" onClick={handleLogout} className="ms-2">
                Logout
              </Button>
            ) : (
              <Button variant="outline-primary" onClick={() => window.location.href = '/login'} className="ms-2">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
