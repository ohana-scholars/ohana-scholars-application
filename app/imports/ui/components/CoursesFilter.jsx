import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CoursesFilter = ({
  filter,
  setFilter,
  subjects,
  titles,
  names,
}) => {
  const handleInputChange = (event) => {
    const { type, value } = event.target;
    setFilter({ ...filter, [type]: value });
  };

  const clearFilters = () => {
    setFilter({ subject: '', title: '', name: '' });
  };

  return (
    <div className="filterForm">
      <Form>
        <Form.Group controlId="filterInstrument">
          <Form.Label className="filterLabel">Subject</Form.Label>
          <Form.Control as="select" name="instrument" value={filter.subjects} onChange={handleInputChange}>
            <option value="">Any</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="filterGenre">
          <Form.Label className="filterLabel">Title</Form.Label>
          <Form.Control as="select" name="genre" value={filter.titles} onChange={handleInputChange}>
            <option value="">Any</option>
            {titles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="filterSkillLevel">
          <Form.Label className="filterLabel">Name</Form.Label>
          <Form.Control as="select" name="skillLevel" value={filter.names} onChange={handleInputChange}>
            <option value="">Any</option>
            {names.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button onClick={clearFilters} className="filterClearButton">Clear</Button>
        </div>
      </Form>
    </div>
  );
};

CoursesFilter.propTypes = {
  filter: PropTypes.shape({
    subjects: PropTypes.string,
    titles: PropTypes.string,
    names: PropTypes.string,
  }),
  setFilter: PropTypes.func,
  subjects: PropTypes.arrayOf(PropTypes.string),
  titles: PropTypes.arrayOf(PropTypes.string),
  names: PropTypes.arrayOf(PropTypes.string),
};

CoursesFilter.defaultProps = {
  filter: {
    subject: '',
    title: '',
    name: '',
  },
  setFilter: () => {},
  subjects: [],
  titles: [],
  names: [],
};

export default CoursesFilter;
