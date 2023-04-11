import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, ListGroup } from 'react-bootstrap';
// import _ from 'underscore';
// import { _ } from 'underscore';

/** Renders a session card. */
const Session = ({ session }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={session.picture} width={75} />
      <Card.Title>{session.name}</Card.Title>
      <Card.Subtitle>{session.location}</Card.Subtitle>
      <Card.Subtitle>Date: {session.month} {session.day}</Card.Subtitle>
      <Card.Subtitle>Time: {session.time}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Subtitle>Notes</Card.Subtitle>
      <Card.Text>{session.notes}</Card.Text>
      <ListGroup variant="flush">
        <Card.Subtitle>Participants</Card.Subtitle>
        {session.participants}
        {session.participants.map(participant => <Card.Text key={participant._id} />)}
        {/* {session.participants.map((participant) => <Card.Text key={participant._id} />)} */}
      </ListGroup>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component. (ESLint error below not our problem)
// eslint-disable-next-line meteor/no-session
Session.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string,
    course: PropTypes.string,
    location: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.number,
    time: PropTypes.string,
    notes: PropTypes.string,
    picture: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Session;
