import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Reputation } from '../../api/reputation/Reputation';
import { Student } from '../../api/student/Student';
import LoadingSpinner from '../components/LoadingSpinner';
import Review from '../components/Review';

/* Renders the AddStuff page for adding a document. */
const ListReviews = () => {
  const { ready, student, reviews } = useTracker(() => {
    const subscription1 = Meteor.subscribe(Student.userPublicationName);
    const subscription2 = Meteor.subscribe(Reputation.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2;
    // Get the Courses documents
    const studentItems = Student.collection.find({}).fetch();
    const repItems = Reputation.collection.find({}).fetch();
    return {
      student: studentItems,
      reviews: repItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3" id="rate-student-page">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>{student[0].firstName}&apos;s Reviews</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Owner</th>
                <th>Rating</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => <Review review={review} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListReviews;
