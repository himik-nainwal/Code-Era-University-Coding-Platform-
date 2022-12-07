import React ,{useState}from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./AddProb.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AddProb(){
  const [] =useState("");
const handleSubmit=(e) => {
  e.preventDefault();
  fetch("https://localhost:5000/add_question_details",{
      method:"POST",
      crossDomain: true,
      headers:{
        "Content-type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify
  })
}
  return (
    <Box component = "Form" 
    sx ={{'& .MuiTextField-root':{
      m: 1, width: '25ch'
    },
    }}
    noValidate >
    <Container className='main'>
      <Col>
      <Row>
        <TextField id ="question-id"
        label="Enter Question id ">
        </TextField>
      </Row>
      
      <Row>
        <TextField id ="question_title"
        label="Question Title">
        </TextField>
      </Row>
      </Col>
      <Col>
      <Row>
        <TextField id ="question_title_slug"
        label="Question Title Slug">
        </TextField>
      </Row>
      <Row>
        <TextField id ="difficulty_level"
        label="Difficulty Level">
        </TextField>
      </Row>
      </Col>
      <Col>
      <Row>
        <TextField id ="description_html"
        label="Description HTML"
        multiline 
        >
        </TextField>
      </Row>
      </Col>
    </Container>
    </Box>
  )

}
export default AddProb