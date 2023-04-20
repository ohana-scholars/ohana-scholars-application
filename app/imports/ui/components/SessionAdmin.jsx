import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Col, Image, ListGroup, Row, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useParams } from 'react-router';
import Participant from './Participant';
import { Sessions } from '../../api/sessions/Sessions';

const DeleteButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { _id } = useParams();
  const deleteTask = ({ session }) => Sessions.collection.remove({ name: Sessions.findOne(session).name });

  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const hideTask = (data) => {
    const { name, course, location, month, day, time, notes, participants, image } = data;
    Sessions.collection.remove({ name: Sessions.findOne().name });
    Sessions.collection.remove(_id, { $set: { name, course, location, month, day, time, notes, participants, image } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Session updated successfully', 'success')));
  };

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
          <Button variant="primary" onClick={deleteTask}>
            Delete
          </Button>
          <Button variant="primary" onClick={hideTask}>
            hide
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
