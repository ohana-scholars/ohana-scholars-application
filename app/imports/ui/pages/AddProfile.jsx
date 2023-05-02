import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Navigate } from 'react-router-dom';
import { Student } from '../../api/student/Student';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  username: String,
  description: String,
  profilePictureLink: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddProfile page for adding a document. */
const AddProfile = () => {
  const [redirectToReferer, setRedirectToRef] = useState(false);
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, username, description, /* courses, interests, */ profilePictureLink } = data;
    const owner = Meteor.user().username;
    Student.collection.insert(
      { firstName, lastName, username, description, profilePictureLink, /* courses, interests, */ owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile added successfully', 'success');
          formRef.reset();
          setRedirectToRef(true);
        }
      },
    );
  };
  if (redirectToReferer) {
    return (<Navigate to="/home" />);
  }
  let fRef = null;
  return (
    <Container className="py-3 formCSS" id="add-profile-page">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="pb-2 text-center"><h2>Create a Profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card className="">
              <Card.Body>
                <Row>
                  <Col><TextField name="firstName" label="First Name" id="addprofile-form-firstname" /> </Col>
                  <Col><TextField name="lastName" label="Last Name" id="addprofile-form-lastname" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="username" id="addprofile-form-username" /></Col>
                  <Col><TextField name="profilePictureLink" label="Profile Picture" id="addprofile-form-picturelink" /></Col>
                </Row>
                <Row>
                  <Col><LongTextField name="description" label="Your Bio" id="addprofile-form-description" /></Col>
                </Row>
                <SubmitField value="Submit" id="addprofile-form-submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProfile;
