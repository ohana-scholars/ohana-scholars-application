import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import { Courses } from '../../api/courses/Courses';
import Course from '../components/Course';
import SubjectFilter from '../components/SubjectsFilter';

const ListCourses = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ subject: '' });
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, courses } = useTracker(() => {
    const subscription = Meteor.subscribe(Courses.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Courses documents
    const courseItems = Courses.collection.find({}).fetch();
    return {
      courses: courseItems,
      ready: rdy,
    };
  }, []);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const subjects = _.uniq(_.pluck(courses, 'subject'));
  // const titles = _.pluck(courses, 'title');
  // const names = _.pluck(courses, 'name');

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Courses</h2>
            {/* Filter */}
            <Row>
              <div id="filter-stuff">
                <Row>
                  <Col md={{ offset: 10 }}>
                    <Button onClick={handleFilterClick} className="filterButton pink-btn">Filter</Button>
                  </Col>
                </Row>
                <Col>
                  {showFilter && (
                    <SubjectFilter filter={filter} setFilter={setFilter} subjects={subjects} />
                  )}
                </Col>
              </div>
            </Row>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Name</th>
                <th>Sessions</th>
              </tr>
            </thead>
            <tbody>
              {courses.filter((course) => {
                if (filter.subject === '') {
                  return true;
                }
                return course.subject === filter.subject;
              })
                .map((course) => <Course key={course._id} course={course} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListCourses;
