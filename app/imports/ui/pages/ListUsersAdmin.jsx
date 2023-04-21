import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Student } from '../../api/student/Student';
import ProfileCard from '../components/ProfileCard';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListUsersAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, students } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Student.adminPublicationName);
    const subscription2 = Meteor.subscribe('users');
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Stuff documents
    const studentItems = Student.collection.find({}).fetch();
    const userItems = Meteor.users.find({});
    return {
      students: studentItems,
      users: userItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row>
        <Col className="text-center">
          <h2>All Users</h2>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={4} className="g-2">
        {students.map((student) => <ProfileCard key={student._id} student={student} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListUsersAdmin;
