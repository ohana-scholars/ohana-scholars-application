import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Courses } from '../../api/courses/Courses';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  subject: String,
  title: String,
  name: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddCourse = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { subject, title, name } = data;
    Courses.collection.insert(
      { subject, title, name },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Course added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3 formCSS" id="add-course-page">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="pb-2 text-center"><h2>Add Course</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="subject" id="addcourse-form-subject" /></Col>
                  <Col><TextField name="title" id="addcourse-form-title" /></Col>
                </Row>
                <TextField name="name" id="addcourse-form-name" />
                <SubmitField value="Submit" id="addcourse-form-submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCourse;
