import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}

from 'mdb-react-ui-kit';
import '../styles/login.css'
import logo_img from '../assets/lo.jpg'

const Home = () => {
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
          {/* onSubmit={this.handleSubmit} */}
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

export default Home