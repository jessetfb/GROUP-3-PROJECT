
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { NavLink } from 'react-router-dom';
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

function NavBar({ searchTerm, setSearchTerm }) {

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("i was clicked")
    console.log(searchTerm)

  };

  return (

    <Navbar className="bg-body-tertiary sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">
          <Col xs="auto" className="ms-4">
            <p className="h1 mb-0">Car-Hub Rentals</p>
            <Image
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svghttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCfmHUCMrqW2XVga6kp46aRhMeCMBQa3kcDA&s"
              alt="logo"
              fluid
            />
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
            <Nav.Link as={NavLink} to="/Bookings">View Bookings</Nav.Link>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
