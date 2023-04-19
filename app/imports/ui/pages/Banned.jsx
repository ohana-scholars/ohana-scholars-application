import React from 'react';
// import { Link } from 'react-router-dom';
import { Col, Container, Row, Image } from 'react-bootstrap';

/* A simple static component to render some text for the banned page. */
const Banned = () => (
  <Container fluid>
    <Row id="landing" className="text-center p-5">
      <Col>
        <Image src="/images/doge-spinning.gif" width="400px" />
      </Col>
      <Col>
        <font size="10" fontFamily="Comic Neue">
          YOU ARE BANNED
        </font>
      </Col>
      <Col>
        <Image src="/images/doge-spinning.gif" width="400px" />
      </Col>
    </Row>
  </Container>
);

export default Banned;
