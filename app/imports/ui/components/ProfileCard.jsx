import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button, Card, Col, Image, ListGroup } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the Student Profile card. */
const ProfileCard = ({ student, userID }) => {

  const [banStatus, changeStatus] = useState(false);
  if (Roles.userIsInRole(userID, 'banned') && banStatus === false) {
    changeStatus(!banStatus);
  }

  const banUser = () => {
    // console.log(userID);
    changeStatus(!banStatus);
    Meteor.call('setUserRole', userID);
  };

  return (
    <Col>
      <Card style={{ borderRadius: '10px' }} className="text-center h-100 pb-3">
        <Card.Header className="text-center">
          <ListGroup.Item className="p-4">
            <Image
              style={{
                maxWidth: '100%',
                width: 'auto',
                maxHeight: '100px',
                height: 'auto',
                borderRadius: '10px' }}
              src={student.profilePictureLink}
              alt="Student Image"
            />
            <Card.Title className="text-center">{student.firstName} {student.lastName}</Card.Title>
            <Card.Text className="text-center">{student.username}</Card.Text>
          </ListGroup.Item>
        </Card.Header>
        <Card.Body>
          {/* eslint-disable-next-line react/prop-types */}
          <Card.Text>{student.description}</Card.Text>
        </Card.Body>
        <div className="d-flex text-black">
          <div className="flex-grow-1 ms-3">
            <Card.Title className="text-center">{student.firstName} {student.lastName}</Card.Title>
            <Card.Text className="text-center">{student.username}</Card.Text>
            {(Roles.userIsInRole(Meteor.userId(), 'admin') === true) && (
              banStatus ? (
                <Button variant="danger" onClick={banUser}>Unban User</Button>
              ) : <Button variant="danger" onClick={banUser}>Ban User</Button>
            )}
          </div>
        </div>
      </Card>
    </Col>
  );
};

// Require a document to be passed to this component.
ProfileCard.propTypes = {
  student: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    profilePictureLink: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  userID: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

export default ProfileCard;
