import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/" className="brand">
          <strong>Employee Management System</strong>
        </Navbar.Brand>
        <Nav className="ms-auto nav-links">
          <Nav.Link as={Link} to="/" className="nav-btn">
            Employees
          </Nav.Link>
          <Nav.Link as={Link} to="/employee" className="nav-btn special">
            Post Employee
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
