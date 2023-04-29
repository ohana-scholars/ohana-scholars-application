import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { CalendarEvent, PersonFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Student } from '../../api/student/Student';
import LoadingSpinner from '../components/LoadingSpinner';
import DateTime from '../components/DateTime';

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
          <DateTime />
          <Link to="/profile">
            <Button className="pink-btn">
              <PersonFill size={40} className="px-1" /> View your profile
            </Button>
          </Link>
          <Button className="pink-btn">
            <CalendarEvent size={40} className="px-2" />
            View sessions you&apos;ve joined
          </Button>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Home;
