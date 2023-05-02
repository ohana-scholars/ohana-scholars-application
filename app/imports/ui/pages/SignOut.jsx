import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowUpLeftSquareFill } from 'react-bootstrap-icons';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Container fluid className="py-3">
      <Row className="align-items-center justify-content-center">
        <Col id="signout-page" className="text-center py-3">
          <h2>You are signed out. Thank you for using Ohana Scholars!</h2>
          <Link to="/">
            <Button className="pink-btn btn-lg home-page-btn">
              <ArrowUpLeftSquareFill size={40} className="px-2" />
              Return to the landing page
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SignOut;
