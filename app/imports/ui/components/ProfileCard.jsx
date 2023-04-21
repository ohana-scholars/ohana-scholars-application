import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
// import { Student } from '../../api/student/Student';
// import { Link } from 'react-router-dom';

// const banUser = (user) => {
//   Meteor.subscribe('users');
//   // Roles.addUsersToRoles(Meteor.users.find({ email: user })._id, 'banned');
// };

/** Renders a single row in the Student Profile card. */
const ProfileCard = ({ student }) => (
  <Col>
    <Card style={{ borderRadius: '10px' }} className="text-center">
      <Card className="p-4">
        <div className="flex-shrink-0 text-center">
          <Card.Img
            style={{ width: '200px', borderRadius: '10px' }}
            src={student.profilePictureLink}
            alt="Student Image"
          />
        </div>
        <div className="d-flex text-black">
          <div className="flex-grow-1 ms-3">
            <Card.Title className="text-center">{student.firstName} {student.lastName}</Card.Title>
            <Card.Text className="text-center">{student.username}</Card.Text>
            {(Roles.userIsInRole(Meteor.userId(), 'admin') === true) && (
              // <Link to={`/banuser/${student.owner}`}><Button variant="danger">Ban User</Button></Link>
              // <Button variant="danger" onClick={banUser(student.owner)}>Ban User</Button>
              <Button variant="danger">Ban User</Button>
            )}
          </div>
        </div>
      </Card>
    </Card>
  </Col>
);

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
};

export default ProfileCard;
// alternate idea to add variable banned to users
