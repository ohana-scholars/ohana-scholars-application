import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import { Courses } from '../../api/courses/Courses';
import Course from '../components/Course';

// function setToggle(toggle) {
//   return !toggle;
// }

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListCourses = () => {
  const [toggle, setToggle] = useState(false);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, courses } = useTracker(() => { // add back courses
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Courses.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const courseItems = Courses.collection.find({}).fetch();
    // const filterdItems = _.filter(courseItems, function (item) { return item[type].includes(searchInput); });
    return {
      courses: courseItems,
      ready: rdy,
    };
  }, []);

  let type = '';
  let searchInput = '';
  const filter = (collection) => {
    if (type === '' || searchInput === '') {
      return collection;
    }
    return _.filter(collection, function (item) { return item[type].includes(searchInput); });
  };

  let filteredItems = filter(courses);

  if (toggle === false) {
    type = '';
    searchInput = '';
  }

  const setSearch = (string) => {
    searchInput = string;
  };

  const handleChange = (event) => {
    filteredItems = filter(courses);
    setSearch(event.target.value);
    console.log(`Type:${type}`);
    console.log(`Search:${searchInput}`);
    console.log(filteredItems);
  };

  function setType(event) {
    const { value } = event.target;
    type = value;
  }

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Courses</h2>
          </Col>
          <Row className="justify-content-center">
            <Col>
              <Form>
                <Form.Check
                  type="switch"
                  id="filter-switch"
                  label="Filter"
                  onClick={() => setToggle(!toggle)}
                />
              </Form>
            </Col>
            <Col>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <input
                  type="radio"
                  name="type"
                  value="subject"
                  onChange={setType}
                  disabled={!toggle}
                />{' '}
                Subject
              </label>
            </Col>
            <Col>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <input
                  type="radio"
                  name="type"
                  value="title"
                  onChange={setType}
                  disabled={!toggle}
                />{' '}
                Title
              </label>
            </Col>
            <Col>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <input
                  type="radio"
                  name="type"
                  value="name"
                  onChange={setType}
                  disabled={!toggle}
                />{' '}
                Name
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Control type="text" placeholder="Search" disabled={!toggle} onChange={handleChange} />
              </Form>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((course) => <Course key={course._id} course={course} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListCourses;
