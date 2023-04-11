import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Sessions } from '../../api/sessions/Sessions';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  course: String,
  location: String,
  month: {
    type: String,
    allowedValues: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    defaultValue: 'Apr',
  },
  day: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    defaultValue: 10,
  },
  time: String,
  notes: String,
  picture: String,
  participants: Array, // emails
  'participants.$': String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddSession = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, course, location, month, day, time, notes, picture, participants } = data;
    const owner = Meteor.user().username;
    Sessions.collection.insert(
      { name, course, location, month, day, time, notes, picture, participants, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Session</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <TextField name="course" />
                <TextField name="location" />
                <Row>
                  <Col>
                    <SelectField name="month" />
                  </Col>
                  <Col>
                    <SelectField name="day" />
                  </Col>
                </Row>
                <TextField name="time" />
                <TextField name="notes" />
                <TextField name="picture" />
                <TextField name="participants" placeholder="type email" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddSession;
