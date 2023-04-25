import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Courses } from '../../api/courses/Courses';
import { Sessions } from '../../api/sessions/Sessions';
import { Student } from '../../api/student/Student';
import { Participants } from '../../api/participant/Participants';
import { Reputation } from '../../api/reputation/Reputation';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Student.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Student.collection.find({ owner: username });
  }
  return this.ready();
});

// If logged in, then publish all courses.
Meteor.publish(Courses.userPublicationName, function () {
  if (this.userId) {
    return Courses.collection.find();
  }
  return this.ready();
});

Meteor.publish(Sessions.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return Sessions.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Participants.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return Participants.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Reputation.userPublicationName, function () {
  if (this.userId) {
    return Reputation.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Student.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Student.collection.find();
  }
  return this.ready();
});

Meteor.publish(Sessions.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Sessions.collection.find();
  }
  return this.ready();
});

Meteor.publish(Participants.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Participants.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reputation.adminPublicationName, function () {
  if (this.userId) {
    return Reputation.collection.find();
  }
  return this.ready();
});

// Publish all users in the database
Meteor.publish('userList', function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({});
  }
  return this.ready();

});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
