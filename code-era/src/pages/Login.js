import React, { Component } from "react";
import 'D:/archive/rea/my-app/src/styles/login.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import logo_img from 'D:/archive/rea/my-app/src/assets/lo.jpg'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { student_id, password } = this.state;
    console.log(student_id, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        student_id,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.location.href = "./userDetails";
        }
      });
  }
  render() {
    return (
      <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='10'>

          <div className='d-flex flex-row ps-5 pt-5'>
            
            <span className="h1 fw-bold mb-0" >
              <img src={logo_img}/>
            </span>
          </div>
          </MDBCol>
          <MDBCol>
            <form onSubmit={this.handleSubmit}>
          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' 
             id='formControlLg' type='number' size="lg" 
             placeholder="Enter Student ID" 
             onChange={(e)=> this.setState({student_id: e.target.value})}/>
            
            <MDBInput wrapperClass='mb-4 mx-5 w-100'
             placeholder='Password' id='formControlLg'
              type='password' size="lg"
              onChange={(e) => this.setState({ password: e.target.value })}
              />             

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>

          </div>
          </form>
          </MDBCol>
      </MDBRow>

    </MDBContainer>
    );
  }
}