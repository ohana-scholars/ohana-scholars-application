import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { Filter } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import { Courses } from '../../api/courses/Courses';
import Course from '../components/Course';
import CoursesFilter from '../components/CoursesFilter';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListCourses = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ subject: '', title: '', name: '' });
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, courses } = useTracker(() => {
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

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const subjects = _.uniq(_.pluck(courses, 'subject'));
  const titles = _.pluck(courses, 'title');
  const names = _.pluck(courses, 'name');

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Courses</h2>
            <div>
              <Button onClick={handleFilterClick} className="filterButton">
                <Filter size="24px" />
              </Button>
              {showFilter && (
                <CoursesFilter
                  filter={filter}
                  setFilter={setFilter}
                  subjects={subjects}
                  titles={titles}
                  names={names}
                />
              )}
            </div>

          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {/* {filteredItems.map((course) => <Course key={course._id} course={course} />)} */}
              <div>
                {courses.filter((course) => {
                  if (filter.subject && !course.subjects.includes(filter.subject)) {
                    return false;
                  }
                  if (filter.title && !course.titles.includes(filter.title)) {
                    return false;
                  }
                  return !(filter.name && course.names !== filter.name);

                })
                  .map((course) => (
                    <div key={course._id}>
                      <Course course={course} />
                    </div>
                  ))}
              </div>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListCourses;
// https://codesandbox.io/s/github/tanstack/table/tree/main/examples/react/filters?from-embed=&file=/src/main.tsx reference for later
