import React from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Sessions } from '../../api/sessions/Sessions';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  subject: {
    type: String,
    allowedValues: ['ART', 'BIOL', 'BUS', 'CHEM', 'ECON', 'ENG', 'HIST', 'ICS', 'MATH', 'NURS', 'PHYS'],
  },
  title: String,
  location: String,
  year: Number,
  month: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  day: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  },
  time: String,
  notes: String,
  image: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddSession page for adding a document. */
const AddSession = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, subject, title, location, month, day, year, time, notes, image } = data;
    const owner = Meteor.user().username;
    Sessions.collection.insert(
      { name, subject, title, location, month, day, year, time, notes, image, owner },

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
          <Col className="pb-2 text-center"><h2>Create New Session</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" id="add-session-field-name" /></Col>
                  <Col><SelectField name="subject" defaultValue="ART" placeholder="ART" id="add-session-field-subject" /></Col>
                  <HiddenField name="title" value="101" />
                </Row>
                <Row>
                  <Col><TextField name="location" id="add-session-field-location" /></Col>
                  <Col><TextField name="image" id="add-session-field-image" /></Col>
                </Row>
                <Row>
                  <Col><SelectField name="month" id="add-session-field-month" /></Col>
                  <Col><SelectField name="day" id="add-session-field-day" /></Col>
                  <Col><TextField name="year" id="add-session-field-year" /></Col>
                  <Col><TextField name="time" id="add-session-field-time" /></Col>
                </Row>
                <LongTextField name="notes" id="add-session-field-notes" />
                <SubmitField value="Submit" id="add-session-submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={6} className="pt-2 text-center">
          <Button href="../list" className="pink-btn btn-lg home-page-btn">Go to List Sessions Page</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddSession;
