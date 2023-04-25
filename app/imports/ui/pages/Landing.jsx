import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Button, Image } from 'react-bootstrap';
import { Calendar2DateFill, Search, StarFill } from 'react-bootstrap-icons';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid>
    <Row id="landing" className="align-items-center">
      <Col xs={1} />
      <Col xs={6}>
        <h1>Welcome to Ohana Scholars!</h1>
        <h5>Looking for study partners for your upcoming midterms and finals?</h5>
        <Link to="/signup"><Button className="pink-btn btn-lg" id="goto-signup-btn">Start here and create an account!</Button></Link>
        <p>Already have an account? <Link to="/signin">Sign in</Link></p>
      </Col>
      <Col xs={1}>
        <Image rounded src="/images/ohana-scholars-logo.png" width="400px" alt="placeholder picture for something" />
      </Col>
    </Row>
    <Row id="second-row" className="py-5 align-items-center justify-content-center">
      <Col xs={3} className="px-2 text-center">
        <Search size={110} className="py-2" />
        <h5>Browse all courses and find who else needs help!</h5>
      </Col>
      <Col xs={3} className="px-2 text-center">
        <Calendar2DateFill size={110} className="py-2" />
        <h5>Create, schedule, and join study sessions!</h5>
      </Col>
      <Col xs={3} className="px-2 text-center">
        <StarFill size={110} className="py-2" />
        <h5>Rate your partners on how well they helped you!</h5>
      </Col>
    </Row>
  </Container>
);

export default Landing;
