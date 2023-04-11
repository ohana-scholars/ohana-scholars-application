import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Courses } from '../../api/courses/Courses';
import { Student } from '../../api/student/Student';
import { Sessions } from '../../api/sessions/Sessions';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

// Initialize the database with courses
const addCourses = (course) => {
  console.log(`  Adding: ${course.name}`);
  Courses.collection.insert(course);
};

// Initialize the CoursesCollection if empty
if (Courses.collection.find().count() === 0) {
  if (Meteor.settings.courses) {
    console.log('Adding Courses.');
    Meteor.settings.courses.forEach(course => addCourses(course));
  }
}

// Initialize the database with students
const addStudents = (course) => {
  console.log(`  Adding: ${course.name}`);
  Student.collection.insert(course);
};

// Initialize the StudentsCollection if empty
if (Student.collection.find().count() === 0) {
  if (Meteor.settings.students) {
    console.log('Adding Student.');
    Meteor.settings.students.forEach(course => addStudents(course));
  }
}

// Initialize the database with sessions
const addSessions = (session) => {
  console.log(`  Adding: ${session.name}`);
  Sessions.collection.insert(session);
};

// Initialize the SessionsCollection if empty
if (Sessions.collection.find().count() === 0) {
  if (Meteor.settings.sessions) {
    console.log('Adding Sessions.');
    Meteor.settings.sessions.forEach(session => addSessions(session));
  }
}
