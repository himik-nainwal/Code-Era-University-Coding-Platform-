import React from "react";
import imgr from '../../src/assets/IMG_9711.jpg'
import '../styles/Profile.css'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

function Profile() {
  return (
    <section id='profile'>
    <h2>Welcome Himik</h2>
    <div className='vh-10' style={{backgroundColor: '#e8e8e8'}}>
      <MDBContainer>
      <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={imgr}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3" >
                    <MDBCardTitle><h3>Himik Nainwal</h3></MDBCardTitle>
                    <MDBCardText><h5>@himiknainwal</h5></MDBCardText>
                    <MDBCardText>B.Tech CSE 4th Year</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Easy</p>
                        <p className="mb-0">41</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Medium</p>
                        <p className="mb-0">976</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Hard</p>
                        <p className="mb-0">85</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <MDBBtn outline className="me-1 flex-grow-1">Solve</MDBBtn>
                      <MDBBtn className="flex-grow-1">Edit</MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow>
      <MDBCol md="9" lg="7" xl="5">
        <MDBCard style ={{borderRadius:'10px'}}>
          <MDBCardBody>
            <MDBCardTitle>Questions Solved </MDBCardTitle>
            <MDBCardText>
             Number of Questions
            </MDBCardText>
            <MDBBtn href='#'>Solve Now</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="9" lg="7" xl="5">
        <MDBCard style ={{borderRadius:'10px'}}>
          <MDBCardBody>
            <MDBCardTitle>Acceptance Rate </MDBCardTitle>
            <MDBCardText>
              Harshit Bhai daaldena
            </MDBCardText>
            <MDBBtn href='#'>Full Stats</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
      </MDBContainer>
      
    </div>
    
    </section>
  );
}

export default Profile;
