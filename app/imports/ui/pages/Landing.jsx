import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row id="landing" className="align-items-center">
      <Col xs={1} />
      <Col xs={6}>
        <h1>Welcome to Ohana Scholars!</h1>
        <h5>Looking a study partner for your upcoming midterms and finals?</h5>
        <h5>Get started by clicking below!</h5>
        <Link to="/signup"><Button className="pink-btn">Create an account</Button></Link>
        <p>Already have an account? <Link to="/signin">Sign in</Link></p>
      </Col>
    </Row>
  </Container>
);

export default Landing;
