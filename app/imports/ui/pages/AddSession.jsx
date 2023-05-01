import React from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Sessions } from '../../api/sessions/Sessions';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  subject: String,
  title: String,
  location: String,
  month: {
    type: String,
    allowedValues: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    defaultValue: 'Apr',
  },
  day: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    defaultValue: 11,
  },
  time: String,
  notes: String,
  image: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddSession = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, subject, title, location, month, day, time, notes, image } = data;
    const owner = Meteor.user().username;
    const participants = Meteor.user().username;
    Sessions.collection.insert(
      { name, subject, title, location, month, day, time, notes, image, participants, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Session added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3 formCSS" id="add-session-page">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Create New Session</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                  <Col><TextField name="subject" /></Col>
                  <Col><TextField name="title" /></Col>
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
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
      <Button href="../list">Go to List Sessions Page</Button>
    </Container>
  );
};

export default AddSession;
