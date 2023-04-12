import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const SessionAdmin = ({ session }) => (
  <Card className="h-110">
    <Card.Header>
      <Image src={session.image} width={75} />
      <Card.Title>{session.name}</Card.Title>
      <Card.Subtitle>{session.location}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{session.notes}</Card.Text>
      <footer className="blockquote-footer">{session.owner}</footer>
    </Card.Body>
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
    // _id: PropTypes.string,
  }).isRequired,
};

export default SessionAdmin;
