import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Courses } from '../../api/courses/Courses';
import { Student } from '../../api/student/Student';
import { Sessions } from '../../api/sessions/Sessions';
import { Emails } from '../../api/email/Email';
import { Reputation } from '../../api/reputation/Reputation';

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
const addStudents = (student) => {
  console.log(`  Adding: ${student.firstName} ${student.lastName}`);
  Student.collection.insert(student);
};

// Initialize the StudentsCollection if empty
if (Student.collection.find().count() === 0) {
  if (Meteor.settings.students) {
    console.log('Adding Student.');
    Meteor.settings.students.forEach(student => addStudents(student));
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

const addEmail = (email) => {
  console.log(`  Adding: ${email.title} (${email.sender})`);
  Emails.collection.insert(email);
};

// Initialize the CoursesCollection if empty
if (Emails.collection.find().count() === 0) {
  if (Meteor.settings.emails) {
    console.log('Adding Emails.');
    Meteor.settings.emails.forEach(email => addEmail(email));
  }
}

const addSession = (session) => {
  console.log(`  Adding: ${session.note} (${session.owner})`);
  Sessions.collection.insert(session);
};

// Initialize the StuffsCollection if empty.
if (Sessions.collection.find().count() === 0) {
  if (Meteor.settings.defaultSessions) {
    console.log('Creating default sessions.');
    Meteor.settings.defaultSessions.forEach(session => addSession(session));
  }
}

// Find the user by email
const user = Meteor.users.findOne({ 'emails.address': 'john@foo.com' });

const addRep = (rep) => {
  console.log(`  Adding: ${rep.rating}/10 by ${rep.owner}`);
  Reputation.collection.insert({
    user_id: user._id,
    rating: 9,
    reason: 'They were a great help to me! They made sure I kept focused throughout the session, and even though it was a rigorous process, I came out of it feeling more confident about the upcoming final!',
    owner: 'admin@foo.com',
  });
};

if (Reputation.collection.find().count() === 0) {
  if (Meteor.settings.reputation) {
    console.log('Adding reputation.');
    Meteor.settings.reputation.forEach(rep => addRep(rep));
  }
}
