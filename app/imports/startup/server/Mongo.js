import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Sessions } from '../../api/session/Sessions';

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
