import React from 'react'
import '../styles/login.css'
import logo_img from '../assets/lo.jpg'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
const Home = () => {
  return (
<MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0" >
              <img src={logo_img}/>
            </span>
          </div>
          </MDBCol>
          <MDBCol>
          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Login</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
            {/* <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg"
  name='Gmail Email'
  validations={{
  gmailValidation: function (values, value) {
    let email = value;
    
    if (email) {
      if (email.includes('@') && email.length > 9) { 
        let split = email.split('@');
    
        if (split[1].toLowerCase() !== 'gehu.ac.in') {
          return 'Graphic Era ID';
        } else if (/[~`!#$%\^&*+=\-\[\]\\';,@/{}|\\":<>\?]/g.test(split[[0]])) {
          return 'Please use Graphic Era ID ';
        } else return true;
      } else return true;
    } else return true;
  }
  }}
  required
/> */}
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

            <MDBBtn className="mb-4 px-5 mx-5 w-100"  color='info' size='lg'>Login</MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>
          </div>
          </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Home