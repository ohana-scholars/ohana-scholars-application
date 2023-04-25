import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SubjectFilter = ({ filter, setFilter, subjects }) => {

  const setSubject = (event) => {
    const { value } = event.target;
    setFilter({ ...filter, subject: value });
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control as="select" value={filter.subjects} onChange={setSubject} id="filter-dropdown">
            <option value="">Any</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject} id={subject}>{subject}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

SubjectFilter.propTypes = {
  filter: PropTypes.shape({
    subjects: PropTypes.string,
    titles: PropTypes.string,
  }),
  setFilter: PropTypes.func,
  subjects: PropTypes.arrayOf(PropTypes.string),
};

SubjectFilter.defaultProps = {
  filter: {
    subject: '',
  },
  setFilter: () => {},
  subjects: [],
};

export default SubjectFilter;
