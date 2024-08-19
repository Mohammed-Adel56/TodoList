import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import UserAuth from "../Context/Auth";
import Cookies from "js-cookie";
const Header = () => {
  const { isAuthenticated, logout } = useContext(UserAuth);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">ToDo</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? "text-decoration-none text-blue  px-2"
                : "text-decoration-none text-white  px-2";
            }}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? "text-decoration-none text-blue  px-2"
                : "text-decoration-none text-white  px-2";
            }}
            to="/register"
            hidden={isAuthenticated}
          >
            Register
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? "text-decoration-none text-blue  px-2"
                : "text-decoration-none text-white  px-2";
            }}
            to="/login"
            hidden={isAuthenticated}
          >
            Login
          </NavLink>
          <div
            className="btn text-decoration-none text-white  px-2"
            hidden={!isAuthenticated}
            onClick={() => {
              logout();
              Cookies.remove("token");
            }}
          >
            Logout
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
