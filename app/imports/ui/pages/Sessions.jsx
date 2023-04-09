import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Sessions = () => (
  <Container id="sessions-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={8} className="d-flex flex-column justify-content-center">
        <h1>Sessions</h1>
        <p>plaeholder page where sessions will go</p>
      </Col>
      <Button href="../sessions">Add Session</Button>
    </Row>
  </Container>
);

export default Sessions;
