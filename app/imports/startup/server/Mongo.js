import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Student } from '../../api/student/Student';

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
