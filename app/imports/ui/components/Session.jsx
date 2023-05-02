import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Image, ListGroup, Row, Col } from 'react-bootstrap';
import Participant from './Participant';
import AddParticipant from './AddParticipant';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Session = ({ session, participants }) => (
  <Card className="h-110">
    <Card.Header>
      <Row>
        <Col className="py-2"><Image rounded src={session.image} width={200} /></Col>
      </Row>
      <Card.Title>{session.name}</Card.Title>
      <Card.Subtitle>{session.month} {session.day} | {session.time}</Card.Subtitle>
      <Card.Text>{session.location}</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Text>{session.notes}</Card.Text>
      <AddParticipant owner={session.owner} contactId={session._id} />
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
// eslint-disable-next-line meteor/no-session
Session.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string,
    subject: PropTypes.string,
    title: PropTypes.string,
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

export default Session;
