import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BoxArrowLeft, PersonFill } from 'react-bootstrap-icons';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Container fluid className="py-3">
      <Row className="align-items-center justify-content-center" id="sign-out">
        <Col id="signout-page" className="text-center py-3">
          <h2>You are now signed out. Thank you for using Ohana Scholars!</h2>
          <Link to="/">
            <Button className="pink-btn home-page-btn">
              <BoxArrowLeft size={40} className="px-2" /> Return to the landing page
            </Button>
          </Link>
          <Link to="/signin">
            <Button className="pink-btn home-page-btn">
              <PersonFill size={40} className="px-1" /> Log in
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SignOut;
