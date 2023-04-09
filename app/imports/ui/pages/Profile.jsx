import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Container, Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { Student } from '../../api/student/Student';

/* Profile Page based on default data (Will implement renderer later) */
const Profile = () => {
  // const student =
  //   { name: 'John Doe',
  //     username: 'johndoggo',
  //     // eslint-disable-next-line max-len
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
  //     + ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  //     +quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  //     + Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  //     + Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     profilepic: 'https://preview.redd.it/help-me-find-the-origin-of-this-damn-dog-ive-looked-up-like-v0-zj7m5n0a2xx91.jpg?auto=webp&s=5f8f63acf583cf94e8e558f07e0d89ef6bf3d0f6',
  //     owner: 'john@foo.com',
  //     interests: ['Computer Science', 'Engineering', 'Meeting People', 'Dog Food'],
  //     classes: ['ICS314', 'ICS311', 'MATH373', 'CHEM162'],
  //   };
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, student } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Student.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Student document
    const studentItems = Student.collection.find({}).fetch();
    return {
      student: studentItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <div className="vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="5" className="mt-5">
            <Card style={{ borderRadius: '10px' }}>
              <Card className="p-4">
                <div className="flex-shrink-0 text-center">
                  <Card.Img
                    style={{ width: '200px', borderRadius: '10px' }}
                    src={student[0].profilepic}
                    alt="Student Image"
                    fluid
                  />
                </div>
                <div className="d-flex text-black">
                  <div className="flex-grow-1 ms-3">
                    <Card.Title className="text-center">{student[0].name}</Card.Title>
                    <Card.Text className="text-center">{student[0].username}</Card.Text>
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
