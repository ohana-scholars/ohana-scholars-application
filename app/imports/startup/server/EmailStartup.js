import { Meteor } from 'meteor/meteor';

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://postmaster@sandboxc6970605c59146f78b4e7d8b78c0de5f.mailgun.org:42f544ab4cb3d5ae6a9d58e70793431a-102c75d8-e1b78157@smtp.mailgun.org:587';
});
