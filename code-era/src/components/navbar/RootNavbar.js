import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function RootNavbar() {
  return (
    <>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">Code Era</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/problemset">Problem Set</Nav.Link>
              <Nav.Link href="/problem">Problem</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                {/* <NavDropdown.Item href="">logout</NavDropdown.Item> */}
                {/* <NavDropdown.Item href="#action/3.3">Item 3</NavDropdown.Item> */}
                <NavDropdown.Divider />
                {/* <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item> */}
                <NavDropdown.Item onClick={window.localStorage.clear()} href="/login">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default RootNavbar;
