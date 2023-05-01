import React from 'react';
import { ListGroup } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Participant = (participant) => (
  <ListGroup.Item>
    <p>{participant}</p>
  </ListGroup.Item>
);

export default Participant;
