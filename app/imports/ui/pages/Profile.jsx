import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'underscore';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Student } from '../../api/student/Student';
import { Reputation } from '../../api/reputation/Reputation';

/* Profile Page based on default data (Will implement renderer later) */
const Profile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  // const { youAreThatStudent } = useTracker(() => ({
  // youAreThatStudent: Meteor.user() ? Meteor.user().username : '',
  // }}), []);
  const { ready, student, reputation } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription1 = Meteor.subscribe(Student.userPublicationName);
    const subscription2 = Meteor.subscribe(Reputation.userPublicationName);
    // Determine if the subscriptions are ready
    const rdy = subscription1.ready() && subscription2.ready();
    // Get the Student and Reputation documents
    const studentItems = Student.collection.find({}).fetch();
    const repItems = Reputation.collection.find({}).fetch();
    console.log(studentItems);
    return {
      student: studentItems,
      reputation: repItems,
      ready: rdy,
    };
  }, []);

  if (student.length === 0 && ready === true) {
    return <Navigate to="/addProfile" />;
  }

  // use underscore functions to get average rating
  const userId = Meteor.userId(); // Get the _id of the currently logged in user
  const grabStudent = _.filter(reputation, function (key) { return key.user_id === userId; });
  const grabRatings = _.pluck(grabStudent, 'rating');
  const avgRating = (_.reduce(grabRatings, function (index, key) { return index + key; }, 0) / grabRatings.length).toFixed(2);

  return (ready ? (
    <div className="vh-100">
      <Container id="profile-page">
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="5" className="mt-5">
            <Card style={{ borderRadius: '10px' }}>
              <Card className="p-4">
                <div className="flex-shrink-0 text-center">
                  <Card.Img
                    style={{ width: '200px', borderRadius: '10px' }}
                    src={student[0].profilePictureLink}
                    alt="Student Image"
                  />
                </div>
                <div className="d-flex text-black">
                  <div className="flex-grow-1">
                    <div className="text-center">
                      <Card.Title>{student[0].firstName} {student[0].lastName}</Card.Title>
                      <Card.Text>{student[0].username}</Card.Text>
                      { grabStudent.length === 0 ? (
                        <Card.Subtitle>
                          Rating: None yet
                        </Card.Subtitle>
                      ) : (
                        <Card.Subtitle>
                          Rating: {avgRating}/10 | <Link to={`/reviews/${userId}`} id="list-reviews-btn">See reviews</Link>
                        </Card.Subtitle>
                      )}
                      { /* youAreThatStudent ? '' : (
                      <Link to="/rateStudent"><Button className="pink-btn">Rate Student</Button></Link>) */ }
                      <Link to={`/rateStudent/${userId}`}><Button className="pink-btn home-page-btn" id="rate-student-btn">Rate Student</Button></Link>
                    </div>
                    {/* <Row> */}
                    {/*  <Col className="px-2 ps-5"> */}
                    {/*    <div>Interests: </div> */}
                    {/*    <ul style={{ listStyle: 'none' }}> */}
                    {/*      {student.interests.map((interest, index) => <li key={index}>{interest}</li>)} */}
                    {/*    </ul> */}
                    {/*  </Col> */}
                    {/*  <Col> */}
                    {/*    <div>Classes: </div> */}
                    {/*    <ul style={{ listStyle: 'none' }}> */}
                    {/*      {student.classes.map((clas, index) => <li key={index}>{clas}</li>)} */}
                    {/*    </ul> */}
                    {/*  </Col> */}
                    {/* </Row> */}
                    <Card.Body>{student[0].description}</Card.Body>
                    <Card.Footer>
                      <Link to={`/editProfile/${student[0]._id}`}>Edit Profile</Link>
                    </Card.Footer>
                  </div>
                </div>
              </Card>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />);
};

export default Profile;
