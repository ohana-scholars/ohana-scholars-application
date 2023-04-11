import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Sessions } from '../../api/sessions/Sessions';
import Session from '../components/Session';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListSessions = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, sessions } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const sessionsItems = Sessions.collection.find({}).fetch();
    return {
      sessions: sessionsItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Sessions</h2>
          </Col>
          <Row sm={1} md={2} lg={3} className="g-4">
            {sessions.map((session, index) => (<Col key={index}><Session session={session} /></Col>))}
          </Row>
        </Col>
      </Row>
      <Button href="../add-sessions">Add Session</Button>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListSessions;