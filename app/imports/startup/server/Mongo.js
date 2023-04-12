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

const addContact = (contact) => {
  console.log(`  Adding: ${contact.lastName} (${contact.owner})`);
  Sessions.collection.insert(contact);
};

// Initialize the StuffsCollection if empty.
if (Sessions.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default sessions.');
    Meteor.settings.defaultContacts.forEach(contact => addContact(contact));
  }
}
