import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Col, Image, ListGroup, Row, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Participant from './Participant';
import { Sessions } from '../../api/sessions/Sessions';

// When the 'remove' button is clicked on a chat message, delete that message.
const deletesCardMaybe = (session) => {
  Sessions.remove(session._id);
};

const DeleteButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this session?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deletesCardMaybe}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const SessionAdmin = ({ session, participants }) => (
  <Card className="h-110">
    <Card.Header>
      <Row>
        <Col><Image src={session.image} width={75} /></Col>
        <Col />
        <Col><Link to={`/edit/${session._id}`}>Edit</Link></Col>
        <Col>
          <DeleteButton />
        </Col>
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
