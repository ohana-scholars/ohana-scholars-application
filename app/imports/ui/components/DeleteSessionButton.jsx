import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { Sessions } from '../../api/sessions/Sessions';

// When the 'remove' button is clicked on a chat message, delete that message.
const deletesCardMaybe = (session) => {
  Sessions.collection.remove(session._id);
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

// Require a document to be passed to this component.
deletesCardMaybe.propTypes = {
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
};

export default DeleteButton;
