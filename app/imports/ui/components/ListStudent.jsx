import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Student table. See pages/ListStudent.jsx. */
const StudentItem = ({ student }) => (
  <tr>
    <td>{student.name}</td>
    <td>{student.username}</td>
    <td>{student.description}</td>
    <td>{student.profilepic}</td>
    <td>
      <Link to={`/edit/${student._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
StudentItem.propTypes = {
  student: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    description: PropTypes.string,
    profilepic: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default StudentItem;
