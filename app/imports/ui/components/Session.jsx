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
    </Card.Header>
    <Card.Body>
      <Card.Text>{session.notes}</Card.Text>
      <ListGroup variant="flush">
        {session.participants}
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
    notes: PropTypes.string,
    picture: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Session;
