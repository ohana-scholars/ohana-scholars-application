import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

/* Profile Page based on default data (Will implement renderer later) */
const Profile = () => {
  const defaultStudent =
    { name: 'John Doe',
      username: 'johndoggo',
      // eslint-disable-next-line max-len
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      profilepic: 'https://preview.redd.it/help-me-find-the-origin-of-this-damn-dog-ive-looked-up-like-v0-zj7m5n0a2xx91.jpg?auto=webp&s=5f8f63acf583cf94e8e558f07e0d89ef6bf3d0f6',
      owner: 'john@foo.com',
      interests: ['Computer Science', 'Engineering', 'Meeting People', 'Dog Food'],
      classes: ['ICS314', 'ICS311', 'MATH373', 'CHEM162'],
    };

  return (
    <div className="vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="5" className="mt-5">
            <Card style={{ borderRadius: '10px' }}>
              <Card className="p-4">
                <div className="flex-shrink-0 text-center">
                  <Card.Img
                    style={{ width: '200px', borderRadius: '10px' }}
                    src={defaultStudent.profilepic}
                    alt="Student Image"
                    fluid
                  />
                </div>
                <div className="d-flex text-black">
                  <div className="flex-grow-1 ms-3">
                    <Card.Title className="text-center">{defaultStudent.name}</Card.Title>
                    <Card.Text className="text-center">{defaultStudent.username}</Card.Text>
                    <Row>
                      <Col className="px-2 ps-5">
                        <div>Interests: </div>
                        <ul style={{ listStyle: 'none' }}>
                          {defaultStudent.interests.map((interest, index) => <li key={index}>{interest}</li>)}
                        </ul>
                      </Col>
                      <Col>
                        <div>Classes: </div>
                        <ul style={{ listStyle: 'none' }}>
                          {defaultStudent.classes.map((clas, index) => <li key={index}>{clas}</li>)}
                        </ul>
                      </Col>
                    </Row>
                    <Card.Body>{defaultStudent.description}</Card.Body>
                  </div>
                </div>
              </Card>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
