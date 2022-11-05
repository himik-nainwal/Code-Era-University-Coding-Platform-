import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from "../assets/lo.jpg"

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }
  render() {
    return (
      <Container id="main-container" className="d-grid h-100">
        <Form id="sign-in-form" className="text-center w-100">
        <img className="loginLogo mb-4" src={logo} alt="Logo" />
        </Form>
      </Container>
    );
  }
}