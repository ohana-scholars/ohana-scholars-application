import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SubmitField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Reputation } from '../../api/reputation/Reputation';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  rating: Number,
  reason: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const RateStudent = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { rating, reason } = data;
    const owner = Meteor.user().username;
    Reputation.collection.insert(
      { rating, reason, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Rating received successfully. Thank you for your feedback!', 'success');
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
          <Col className="text-center"><h2>Rate Student</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <NumField name="rating" placeholder="Please enter a rating from 1 to 10." />
                <LongTextField name="reason" placeholder="Please give a short reason for your rating." />
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

export default RateStudent;
