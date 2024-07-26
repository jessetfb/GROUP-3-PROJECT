/*
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { NavLink } from 'react-router-dom';
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

function NavBar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("i was clicked")
    console.log(searchTerm)
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar className="bg-body-tertiary sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">
          <Col xs="auto" className="ms-4">
            <p className="h1 mb-0">Car-Hub Rentals</p>
            <Image src="" fluid />
          </Col>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
            fill
            variant="tabs"
            defaultActiveKey="/home"
          >
            <Nav.Link as={NavLink} to="/" style={{ marginRight: '2rem' }}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/add-car" style={{ marginRight: '2rem' }}>Add Cars</Nav.Link>
            <Nav.Link as={NavLink} to="/Bookings">Bookings</Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>

          <Nav className="ms-auto">
            {token ? (
              <Button variant="outline-danger" onClick={handleLogout} className="ms-2">Logout</Button>
            ) : (
              <Button variant="outline-primary" onClick={() => navigate('/login')} className="ms-2">Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
*/
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import "./NavBar.css"; // Custom CSS file

function NavBar({ searchTerm, setSearchTerm }) {
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("i was clicked");
    console.log(searchTerm);
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
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-input"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="outline-light"
              type="submit"
              className="search-button"
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
