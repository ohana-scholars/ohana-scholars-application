import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row id="landing" className="align-items-center justify-content-center">
      <Col xs={8} className="text-center">
        <h1>Welcome to Ohana Scholars!</h1>
        <h5>Looking for help in your classes? Get started by clicking below!</h5>
        <Button className="pink-btn">Create an account</Button>
        <Button className="pink-btn">Search subjects and courses</Button>
      </Col>
    </Row>
  </Container>
);

export default Landing;
