import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Participants } from '../../api/participant/Participants';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  notes: String,
  contactId: String,
  createdAt: Date,
  sessionDate: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddParticipant page for adding a document. */
const AddParticipant = ({ sessionName, sessionLocation, notes, contactId, sessionDate, sessionTime }) => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { createdAt } = data;
    const owner = Meteor.user().username;
    const SendEmail = () => {
      Meteor.call('initialEmail', owner, sessionName, sessionLocation, sessionDate, sessionTime, notes);
    };
    Participants.collection.insert(
      { notes, contactId, owner, createdAt, sessionDate, sessionTime },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          SendEmail();
          swal('Success', 'Joined Session', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <SubmitField value="Join Session" />
            <ErrorsField />
            <HiddenField name="notes" value={notes} />
            <HiddenField name="contactId" value={contactId} />
            <HiddenField name="createdAt" value={new Date()} />
            <HiddenField name="sessionDate" value={sessionDate} />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddParticipant.propTypes = {
  sessionName: PropTypes.string.isRequired,
  sessionLocation: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  contactId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  sessionDate: PropTypes.instanceOf(Date),
  sessionTime: PropTypes.string.isRequired,
};

export default AddParticipant;
