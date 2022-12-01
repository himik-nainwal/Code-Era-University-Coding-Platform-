import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./ProbDetails.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FormControl } from '@mui/material';


const ProbDetails = () => {
  return (
    <Box component = "Form" 
    sx ={{'& .MuiTextField-root':{
      m: 1, width: '30ch'
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
        <TextField id ="cpp_boilerplate"
        label="cpp_boilerplate"
        multiline  maxRows={4}>
        </TextField>
      </Row>
      <Row>
        <TextField id ="example_test_case_input"
        label="example_test_case_input"
        multiline maxRows={4}
        >
        </TextField>
      </Row>
      </Col>
      <Col>
      <Row>
        <TextField id ="correct_code"
        label="correct_code"
        multiline maxRows={4}>
        </TextField>
      </Row>
      <Row>
        <TextField id ="custom_judge"
        label="custom_judge" multiline maxRows={4}>
        </TextField>
      </Row>
      <Row>
        <TextField id ="all_test_cases_output"
        label="all_test_cases_output"
        multiline maxRows={4}
        >
        </TextField>
      </Row>
      </Col>
      <Col>
      <Row>
        <TextField id ="example_test_case_input"
        label="example_test_case_input"
        multiline maxRows={4}
        >
        </TextField>
      </Row>
      <Row>
        <TextField id ="all_test_cases_input"
        label="all_test_cases_input"
        multiline variant="filled" maxRows={4}
        >
        </TextField>
      </Row>
      </Col>
      
    </Container>
    </Box>
  )
}

export default ProbDetails