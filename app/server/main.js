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
    if (Roles.userIsInRole(userID, 'banned')) {
      Roles.removeUsersFromRoles(userID, 'banned');
    } else {
      Roles.addUsersToRoles(userID._id, 'banned');
    }
  },

  'checkBan'(userID) {
    check(userID, Object);
    console.log('CHEKING STATUS');
    if (Roles.userIsInRole(userID, 'banned') === true) {
      console.log('RETURNING True');
      return true;
    }
    console.log('RETURNING False');
    return false;
  },

});
