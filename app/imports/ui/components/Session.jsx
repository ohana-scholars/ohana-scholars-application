import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Card from 'react-bootstrap/Card';
import { Image, ListGroup, Row, Col, Button } from 'react-bootstrap';

const addSession = (session) => {
  session.participants.push(Meteor.users.findOne().username);
  console.log(`Added: ${Meteor.users.findOne().username}`);
};

const Session = ({ session }) => (
  <Card className="h-110">
    <Card.Header>
      <Row>
        <Col><Image src={session.image} width={75} /></Col>
      </Row>
      <Card.Title>{session.name}</Card.Title>
      <Card.Subtitle>{session.month} {session.day} | {session.time}</Card.Subtitle>
      <Card.Text>{session.location}</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Text>{session.notes}</Card.Text>
      <Button onClick={addSession(session)}>Add Session</Button>
    </Card.Body>
    <Card.Footer>
      <Card.Subtitle>Participants</Card.Subtitle>
      <ListGroup variant="flush">
        {session.participants.map((participant) => (
          <p>{participant}</p>
        ))}
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
    participants: PropTypes.arrayOf(String),
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Session;
