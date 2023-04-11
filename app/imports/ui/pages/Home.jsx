import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row id="landing" className="align-items-center justify-content-center">
      <Col xs={8} className="text-center">
        <h1>Hello, (user&apos;s first name)!</h1>
        <Button className="pink-btn">Create a session</Button>
        <Button className="pink-btn">Browse courses</Button>
        <Button className="pink-btn">Browse sessions</Button>
      </Col>
    </Row>
  </Container>
);

export default Home;
