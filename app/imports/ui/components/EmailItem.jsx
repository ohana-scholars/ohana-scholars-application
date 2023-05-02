import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row for email table. */
const EmailItem = ({ email }) => (
  <tr>
    <td>{email.title}</td>
    <td>{email.sender}</td>
    <td>
      <Link to={`/edit/${email._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
EmailItem.propTypes = {
  email: PropTypes.shape({
    sender: PropTypes.string,
    receiver: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    timePlace: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default EmailItem;
