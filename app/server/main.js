import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';

Meteor.methods({

  'setUserRole'(userID) {
    check(userID, Object);
    Roles.createRole('banned', { unlessExists: true });
    Roles.addUsersToRoles(userID._id, 'banned');
  },

});
