import React from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Reputation } from '../../api/reputation/Reputation';
import { Student } from '../../api/student/Student';
import LoadingSpinner from '../components/LoadingSpinner';
import Review from '../components/Review';

/* Renders the List Review page. */
const ListReviews = () => {
  const { ready, student, reviews } = useTracker(() => {
    const subscription1 = Meteor.subscribe(Student.userPublicationName);
    const subscription2 = Meteor.subscribe(Reputation.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2;
    // Get the student and reputation documents
    const studentItems = Student.collection.find({}).fetch();
    const repItems = Reputation.collection.find({ user_id: Meteor.userId() }).fetch();
    return {
      student: studentItems,
      reviews: repItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3" id="list-reviews-page">
      <Row className="justify-content-center align-items-center">
        <Col xs={8}>
          <Col className="text-center">
            <h2>{student[0].firstName}&apos;s Reviews</h2>
            <Link to="/profile"><Button className="pink-btn home-page-btn" id="return-to-profile-btn">Return to your profile</Button></Link>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User</th>
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
