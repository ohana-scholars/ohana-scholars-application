import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Student } from '../../api/student/Student';
import LoadingSpinner from '../components/LoadingSpinner';

/* Try to figure out how to incorporate user's first name in home page. */
const Home = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, student } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Student documents.
    const subscription = Meteor.subscribe(Student.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Student documents
    const studentItems = Student.collection.find({}).fetch();
    return {
      student: studentItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="home-page" fluid className="py-3">
      <Row id="landing" className="align-items-center justify-content-center">
        <Col xs={8} className="text-center">
          <h1>Welcome, {student[0].firstName}!</h1>
          <Link to="/profile">
            <PersonFill size={110} className="py-2" />
            <h3>View your profile</h3>
          </Link>
          <Link>
            
          </Link>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Home;
