import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="container-fluid p-5 d-flex align-items-center">
      <Card className="text-center w-100">
        <Card.Header className="font-weight-bold display-4">Welcome to Code Era</Card.Header>
        <Card.Body>
          <Card.Text className="lead">
            The ultimate university coding platform!
          </Card.Text>
          <p className="mb-4">
            Our platform provides students with an opportunity to enhance their coding skills and stay ahead in the competition by solving a wide range of coding questions. Code Era also provides an easy way for teachers to track the performance of their students, by giving them access to the scores of the students on the platform.
          </p>
         {localStorage.getItem("token")===null &&  <a href="/login"><Button variant="primary">Login Here</Button></a>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
