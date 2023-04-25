import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Sessions } from '../../api/sessions/Sessions';

const bridge = new SimpleSchema2Bridge(Sessions.schema);

/* Renders the EditStuff page for editing a single document. */
const DeleteSession = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Sessions.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const navigate = useNavigate();

  // console.log('EditStuff', doc, ready);
  // On successful submit, delete the data.
  const submit = () => {
    Sessions.collection.remove(_id);
    navigate('/listadmin');
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Delete this session?</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                  <Col><TextField name="course" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="location" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="month" /></Col>
                  <Col><TextField name="day" /></Col>
                  <Col><TextField name="time" /></Col>
                </Row>
                <LongTextField name="notes" />
                <TextField name="owner" />
                <SubmitField value="Delete" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default DeleteSession;
