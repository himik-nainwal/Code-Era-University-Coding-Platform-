import React ,{useState}from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../assets/lo.jpg";
import Container from "react-bootstrap/Container";

const Forgot = () => {
    const [StudentId, setStudentId] = useState("");
    const [Email, setEmail] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch("https://localhost:5000/forgot-password",{
            method: "POST",
            crossDomain:true,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                student_id: StudentId,
                Email: email,
              }),
        })
    }
  return (
    <Container id="main-container" className="d-grid h-100">
      <Form id="sign-in-form" className="text-center w-100">
        <img className="loginLogo mb-4" src={logo} alt="Logo" />
        <h1 className="fs-3 fw-normal mb-3">Did you forgot your password !</h1>
        <Form.Group controlId="student-id">
          <Form.Control
            className="mb-2 position-relative"
            type="studentId"
            size="lg"
            placeholder="Email Id"
            value={Email}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </Form.Group>
         <Button
            variant="primary"
            size="lg"
            type="submit"
            onClick={handleSubmit}
          >
            Resend Link
          </Button>
        
      </Form>
    </Container>
  )
}

export default Forgot