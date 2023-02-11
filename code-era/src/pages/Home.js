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
          Code-Era is a cutting-edge coding platform designed for university students who are looking to enhance their programming skills and take their careers to the next level. Our platform provides students with access to a wide range of coding challenges and exercises, as well as a supportive community of like-minded individuals who are passionate about coding and technology.

At Code-Era, we believe that every student should have access to the resources they need to succeed in the highly competitive world of coding. That's why we've created a platform that is easy to use, accessible, and engaging, and that provides students with the tools and resources they need to develop their skills and achieve their goals.

Whether you are just starting out on your coding journey or are already an experienced developer, Code-Era has something to offer. Our platform is constantly evolving and growing, so you can always find new challenges and exercises to tackle, and new ways to improve your skills.

Our team is made up of experienced developers, educators, and technologists who are passionate about helping students succeed. We work tirelessly to create a supportive and inclusive community where students from all backgrounds can come together to learn, grow, and succeed.

So if you're looking to take your coding skills to the next level, join Code-Era today and start your journey towards a successful career in tech!          </p>
         {localStorage.getItem("token")===null && <a href="/login"><Button variant="primary">Login Here</Button></a>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
