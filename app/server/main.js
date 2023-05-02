import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
import { Email } from 'meteor/email';

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://postmaster@sandbox4dadc76ae99e4dd2a0434fdc12de2a17.mailgun.org:2a1f5438a0c9cc985c74a2dadc64b7a9-70c38fed-dd2ed98e@smtp.mailgun.org:587';
});

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  'initialEmail'(owner, sessionName, sessionLocation, sessionDate, sessionTime, notes) {
    Email.send({
      to: `${owner}`,
      from: 'OhanaScholar@email.com',
      subject: 'very important Ohana Scholar stuff',
      // eslint-disable-next-line max-len
      text: `You have registered for the session ${sessionName} in ${sessionLocation} at ${sessionDate.getMonth() + 1}/${sessionDate.getDate()}/${sessionDate.getFullYear()} ${sessionTime}. Please remember to ${notes}`,
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
