import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import { Courses } from '../../api/courses/Courses';
import SubjectFilter from '../components/SubjectsFilter';
import CourseAdmin from '../components/CourseAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListCoursesAdmin = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ subject: '' });
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, courses } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Courses.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
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
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center" id="list-courses-admin-page">
        <Col md={7}>
          <Col className="pb-2 text-center">
            <h2>List Courses (Admin)</h2>
            {/* Filter */}
            <Row>
              <div id="filter-stuff">
                <Row>
                  <Col md={{ offset: 10 }}>
                    <Button onClick={handleFilterClick} id="filter-courses-btn" className="filterButton pink-btn">Filter</Button>
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
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {courses.filter((course) => {
                if (filter.subject === '') {
                  return true;
                }
                return course.subject === filter.subject;
              })
                .map((course) => <CourseAdmin key={course._id} course={course} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListCoursesAdmin;
