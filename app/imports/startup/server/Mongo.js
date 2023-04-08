import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Student } from '../../api/student/Student';

// Initialize the database with a default data document.
const addStudent = (student) => {
  console.log(`  Adding student: ${student.name} `);
  Student.collection.insert(student);
};

// Initialize the StudentCollection if empty.
if (Student.collection.find().count() === 0) {
  if (Meteor.settings.defaultStudent) {
    console.log('Creating student data.');
    Meteor.settings.defaultStudent.forEach(student => addStudent(student));
  }
}

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
