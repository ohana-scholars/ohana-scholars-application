import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Courses table. See pages/ListCourses.jsx. */
const Course = ({ course }) => (
  <tr>
    <td>{course.subject} {course.title}</td>
    <td>{course.name}</td>
    <td>
      <Link to={`/edit/${course._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
Course.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    subject: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Course;
