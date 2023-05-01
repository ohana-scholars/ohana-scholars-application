import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Sessions } from '../../api/sessions/Sessions';
import SessionAdmin from '../components/SessionAdmin';
import { Participants } from '../../api/participant/Participants';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListSessionsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, sessions, participants } = useTracker(() => {
    // Participant that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    const subscription2 = Meteor.subscribe(Participants.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Session documents
    const sessionItems = Sessions.collection.find({}).fetch();
    // Get the Participant documents
    const participantItems = Participants.collection.find({}).fetch();
    return {
      sessions: sessionItems,
      participants: participantItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3 formCSS" id="list-sessions-admin-page">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Sessions</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {sessions.map((session) => (<Col key={session._id}><SessionAdmin session={session} participants={participants.filter(participant => (participant.contactId === session._id))} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListSessionsAdmin;
