import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Sessions } from '../../api/sessions/Sessions';

const bridge = new SimpleSchema2Bridge(Sessions.schema);

/* Renders the EditStuff page for editing a single document. */
const EditSession = () => {
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
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, subject, title, location, month, day, time, notes, participants, image } = data;
    Sessions.collection.update(_id, { $set: { name, subject, title, location, month, day, time, notes, participants, image } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Session updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3" id="edit-session-page">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="pb-2 text-center"><h2>Edit Session</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                  <Col><SelectField name="subject" /></Col>
                  <Col><HiddenField name="title" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="location" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <Row>
                  <Col><SelectField name="month" /></Col>
                  <Col><SelectField name="day" /></Col>
                  <Col><TextField name="time" /></Col>
                </Row>
                <LongTextField name="notes" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditSession;
