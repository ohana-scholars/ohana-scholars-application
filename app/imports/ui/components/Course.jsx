import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Courses table. See pages/ListCoursesAdmin.jsx. */
const Course = ({ course }) => (
  <tr>
    <td>{course.subject} {course.title}</td>
    <td>{course.name}</td>
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
