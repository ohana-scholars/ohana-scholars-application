// import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { useTracker } from 'meteor/react-meteor-data';
// import { Card, Container, Row, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { Student } from '../../api/student/Student';
//
// /* Profile Page based on default data (Will implement renderer later) */
// const BanButton = () => {
//   // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
//   const { ready, student } = useTracker(() => {
//
//     const banStatus = Meteor.call('checkBan', userID, function (error, result) { console.log(error); console.log(result); });
//
//     return {
//       student: studentItems,
//       ready: rdy,
//     };
//   }, []);
//   return (ready ? (
//
//   ) : <LoadingSpinner />);
// };
//
// export default BanButton;
