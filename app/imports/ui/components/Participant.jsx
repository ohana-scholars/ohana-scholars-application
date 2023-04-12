import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Participant = ({ participant }) => (
  <ListGroup.Item>
    <p>{participant.owner}</p>
  </ListGroup.Item>
);

// Require a document to be passed to this component.
Participant.propTypes = {
  participant: PropTypes.shape({
    note: PropTypes.string,
    contactId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
};

export default Participant;
