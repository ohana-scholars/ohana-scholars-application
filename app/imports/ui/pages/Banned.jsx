import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Button } from 'react-bootstrap';

/* A simple static component to render some text for the banned page. */
const Banned = () => (
  <Container fluid className="pt-5">
    <Row id="landing" className="text-center p-5">
      <Col>
        <font size="10" fontFamily="Comic Neue">
          YOU ARE BANNED
        </font>
        <Row className="pt-2"><font size={5} color="red">Reason: You did a bad bad thing.</font></Row>
        <Row className="pt-5">
          <Col xs={3} />
          <Col className="text-center p-5" xs={3}>
            <Link to="/appeal"><Button className="pink-btn btn-lg">Appeal</Button>{' '}</Link>
          </Col>
          <Col className="text-center p-5" xs={3}>
            <Link to="/signout"><Button className="pink-btn btn-lg" id="navbar-sign-out">Sign Out</Button></Link>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default Banned;
