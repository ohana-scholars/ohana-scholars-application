import React from 'react';
// import { Link } from 'react-router-dom';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the appeal page. */
const Appeal = () => (
  <Container fluid className="pt-5">
    <Row id="landing" className="text-center p-5">
      <Col>
        <Image rounded src="/images/doge-spinning.gif" width="400px" alt="doge" />
      </Col>
      <Col>
        <font size="10" fontFamily="Comic Sans" className="pt-5">
          no.
        </font>
        <Row><Image rounded src="/images/dog-smug.jpeg" width="200px" alt="doge" /></Row>
      </Col>
      <Col>
        <Image rounded src="/images/spindog.gif" width="400px" alt="doggo" />
      </Col>
    </Row>
  </Container>
);

export default Appeal;
