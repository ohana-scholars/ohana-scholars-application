import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import Session from '../components/Session';
import { Sessions } from '../../api/sessions/Sessions';
import { Participants } from '../../api/participant/Participants';
import SubjectFilter from '../components/SubjectsFilter';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListSessions = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ subject: '' });
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

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const subjects = _.uniq(_.pluck(sessions, 'subject'));

  return (ready ? (
    <Container className="py-3" id="list-sessions-page">
      <Row className="justify-content-center formCSS">
        {/* Filter */}
        <Row>
          <div id="filter-stuff">
            <Row>
              <Col md={{ offset: 10 }}>
                <Button onClick={handleFilterClick} className="filterButton pink-btn">Filter</Button>
              </Col>
            </Row>
            <Col>
              {showFilter && (
                <SubjectFilter filter={filter} setFilter={setFilter} subjects={subjects} />
              )}
            </Col>
          </div>
        </Row>
        <Col>
          <Col className="pb-2 text-center">
            <h2>List Sessions</h2>
            <Button className="pink-btn btn-lg home-page-btn" href="../add" id="goto-add-session-page">Create New Session</Button>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {sessions.filter((session) => {
              if (filter.subject === '') {
                return true;
              }
              return session.subject === filter.subject;
            }).map((session) => (<Col key={session._id}><Session session={session} participants={participants.filter(participant => (participant.contactId === session._id))} /></Col>))}
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={6} className="pt-3 text-center">
          <Button className="pink-btn btn-lg home-page-btn" href="../add">Create New Session</Button>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListSessions;
