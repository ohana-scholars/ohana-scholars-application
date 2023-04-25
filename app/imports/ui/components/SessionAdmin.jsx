import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Participant from './Participant';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const SessionAdmin = ({ session, participants }) => (
  <Card className="h-110">
    <Card.Header>
      <Row>
        <Col><Image src={session.image} width={75} /></Col>
        <Col />
        <Col><Link to={`/edit/${session._id}`}>Edit</Link></Col>
        <Col><Link to={`/deletesession/${session._id}`}>Delete</Link></Col>
      </Row>
      <Card.Title>{session.name}</Card.Title>
      <Card.Subtitle>{session.month} {session.day} | {session.time}</Card.Subtitle>
      <Card.Text>{session.location}</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Text>{session.notes}</Card.Text>
      <Card.Text className="text-muted">created by: {session.owner}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <Card.Subtitle>Participants</Card.Subtitle>
      <ListGroup variant="flush">
        {participants.map((participant) => <Participant key={participant._id} participant={participant} />)}
      </ListGroup>
    </Card.Footer>
  </Card>
);

// Require a document to be passed to this component.
SessionAdmin.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string,
    course: PropTypes.string,
    location: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.number,
    time: PropTypes.string,
    notes: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({
    note: PropTypes.string,
    contactId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  })).isRequired,
};

export default SessionAdmin;
