import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function RootNavbar({ user }) {
  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ background: "#243b55" }}
      >
        <Container>
          <Navbar.Brand href="/">Code Era</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/problemset">Problem Set</Nav.Link>
              <Nav.Link href="/Leaderboard">Leaderboard</Nav.Link>
              {!user && <Nav.Link href="/login">Login</Nav.Link>}
              {(user?.role === "admin" || user?.role === "dev") && (
                <Nav.Link href="/admin">Admin Portal</Nav.Link>
              )}
            </Nav>
            <Nav>
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                {/* <NavDropdown.Item href="">logout</NavDropdown.Item> */}
                {/* <NavDropdown.Item href="#action/3.3">Item 3</NavDropdown.Item> */}
                <NavDropdown.Divider />
                {/* <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item> */}
                <NavDropdown.Item onClick={handleClick} href="/login">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default RootNavbar;
