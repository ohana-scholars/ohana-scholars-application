import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CoursesFilter = ({
  filter,
  setFilter,
  subjects,
  // names,
}) => {
  const setSubject = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control as="select" name="subject" value={filter.subjects} onChange={setSubject}>
            <option value="">Any</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* <div className="d-flex justify-content-center"> */}
        {/*  <Button onClick={clearFilters}>Clear</Button> */}
        {/* </div> */}
      </Form>
    </div>
  );
};

CoursesFilter.propTypes = {
  filter: PropTypes.shape({
    subjects: PropTypes.string,
    names: PropTypes.string,
  }),
  setFilter: PropTypes.func,
  subjects: PropTypes.arrayOf(PropTypes.string),
  // names: PropTypes.arrayOf(PropTypes.string),
};

CoursesFilter.defaultProps = {
  filter: {
    subject: '',
    // name: '',
  },
  setFilter: () => {},
  subjects: [],
  // names: [],
};

export default CoursesFilter;
