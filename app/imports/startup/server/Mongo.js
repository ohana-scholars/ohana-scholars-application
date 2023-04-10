import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Emails } from '../../api/email/Email';

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
