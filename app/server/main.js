import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
import { Email } from 'meteor/email';

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://postmaster@sandbox5a1be1b52d854d7086df557ce2585ea8.mailgun.org:7a1602d0396318c627cb6d08adc34ed2-102c75d8-a8fb2a03@smtp.mailgun.org:587';
});

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

  'setUserRole'(userID) {
    check(userID, Object);
    Roles.createRole('banned', { unlessExists: true });
    if (Roles.userIsInRole(userID, 'banned')) {
      Roles.removeUsersFromRoles(userID, 'banned');
    } else {
      Roles.addUsersToRoles(userID._id, 'banned');
    }
  },

});
