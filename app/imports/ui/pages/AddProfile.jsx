import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Student } from '../../api/student/Student';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  username: String,
  description: String,
  profilePictureLink: String,
  // courses: String,
  // interests: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddProfile = () => {

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
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3" id="add-profile-page">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create a Profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="username" id="addprofile-form-username" />
                <TextField name="firstName" id="addprofile-form-firstname" />
                <TextField name="lastName" id="addprofile-form-lastname" />
                <TextField name="description" id="addprofile-form-description" />
                <TextField name="profilePictureLink" id="addprofile-form-picturelink" />
                {/* <TextField name="courses" /> */}
                {/* <TextField name="interests" /> */}
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
