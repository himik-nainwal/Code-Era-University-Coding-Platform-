import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/login.css";
import logo from "../assets/lo.jpg";
function Login() {
  const [StudentId, setStudentId] = useState("");
  const [Password, setPassword] = useState("");
  const handleSubmit = (e) => {
    console.log(StudentId);
    console.log(Password);
    e.preventDefault();
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: StudentId,
        password: Password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.location.href = "./profile";
        }
      });
  };
  return (
    <Container id="main-container" className="d-grid h-100">
      <Form id="sign-in-form" className="text-center w-100">
        <img className="loginLogo mb-4" src={logo} alt="Logo" />
        <h1 className="fs-3 fw-normal mb-3">Please sign in</h1>
        <Form.Group controlId="student-id">
          <Form.Control
            className="mb-2 position-relative"
            type="studentId"
            size="lg"
            placeholder="Student Id"
            value={StudentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            className="mb-2 position-relative"
            type="password"
            size="lg"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <p className="small mb-2 pb-lg-3 ms-5">
          <a href="#!">Forgot password?</a>
        </p>
        <div className="d-grid">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
