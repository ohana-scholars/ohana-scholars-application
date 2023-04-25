import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Courses table. See pages/ListCoursesAdmin.jsx. */
const CourseAdmin = ({ course }) => (
  <tr>
    <td>{course.subject} {course.title}</td>
    <td>{course.name}</td>
    <td>
      <Link to={`/editcourse/${course._id}`} id="editcourse-link">Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
CourseAdmin.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    subject: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default CourseAdmin;
