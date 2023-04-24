import React from 'react';
// import { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SubjectFilter = ({
  filter,
  setFilter,
  subjects,
  // titles,
  // names,
}) => {
  // const [showFilter, setShowFilter] = useState(false);
  //
  // const handleFilterClick = () => {
  //   setShowFilter(!showFilter);
  // };

  const setSubject = (event) => {
    const { value } = event.target;
    setFilter({ ...filter, subject: value });
    // handleFilterClick();
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
        {/* { showFilter && ( */}
        {/*  <Form.Group> */}
        {/*    <Form.Label>Class</Form.Label> */}
        {/*    <Form.Control as="select" value={filter.titles} onChange={setSubject}> */}
        {/*      <option value="">Any</option> */}
        {/*      {titles.map((title, index) => ( */}
        {/*        <option key={index} value={title}>{`${title}: ${names[index]}`} </option> */}
        {/*      ))} */}
        {/*    </Form.Control> */}
        {/*  </Form.Group> */}
        {/* )} */}
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
  // titles: PropTypes.arrayOf(PropTypes.string),
  // names: PropTypes.arrayOf(PropTypes.string),
};

SubjectFilter.defaultProps = {
  filter: {
    subject: '',
    // title: '',
  },
  setFilter: () => {},
  subjects: [],
  // titles: [],
  // names: [],
};

export default SubjectFilter;
