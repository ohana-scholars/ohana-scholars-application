import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/EmailStartup';
import '/imports/startup/server/Mongo';
import { Email } from 'meteor/email';

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  'initialEmail'(owner, sessionName, sessionLocation, sessionDate, sessionTime, notes) {
    Email.send({
      to: `${owner}`,
      from: 'OhanaScholar@email.com',
      subject: `Joined Session: ${sessionName}`,
      // eslint-disable-next-line max-len
      text: `You have registered for the session ${sessionName} in ${sessionLocation} at ${sessionDate.getMonth() + 1}/${sessionDate.getDate()}/${sessionDate.getFullYear()} ${sessionTime}. Please mark your calendar. Please remember: ${notes}`,
    });
  },

  // eslint-disable-next-line meteor/audit-argument-checks
  'RemindEmail'(owner, sessionName, sessionLocation, sessionDate, sessionTime, notes) {
    Email.send({
      to: `${owner}`,
      from: 'OhanaScholar@email.com',
      subject: `Joined Session: ${sessionName}`,
      // eslint-disable-next-line max-len
      text: `You have registered for the session ${sessionName} in ${sessionLocation} at ${sessionDate.getMonth() + 1}/${sessionDate.getDate()}/${sessionDate.getFullYear()} ${sessionTime}. Please mark your calendar. Please remember: ${notes}`,
    });
  },

  'setUserRole'(userID) {
    check(userID, Object);
    Roles.createRole('banned', { unlessExists: true });
    if (Roles.userIsInRole(userID, 'banned')) {
      Roles.removeUsersFromRoles(userID, 'banned');
    } else {
      Roles.addUsersToRoles(userID._id, 'banned');
    }
  },

  // 'checkBan'(userID) {
  //   check(userID, Object);
  //   console.log('CHEKING STATUS');
  //   if (Roles.userIsInRole(userID, 'banned') === true) {
  //     console.log('RETURNING True');
  //     return true;
  //   }
  //   console.log('RETURNING False');
  //   return false;
  // },

});
