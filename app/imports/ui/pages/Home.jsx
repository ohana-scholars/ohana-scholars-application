import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row id="landing" className="align-items-center justify-content-center">
      <Col xs={8} className="text-center">
        <h1>Hello!</h1>
        <Link to="/add"><Button className="pink-btn">Create a session</Button></Link>
        <Link to="/list"><Button className="pink-btn">Browse sessions</Button></Link>
        <Link to="/courses"><Button className="pink-btn">Browse courses</Button></Link>
      </Col>
    </Row>
  </Container>
);

export default Home;
