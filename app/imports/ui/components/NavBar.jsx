import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {currentUser === '' ? (
          <Navbar.Brand as={NavLink} to="/">
            <Image src="/images/ohana-scholars-logo.png" width="60px" alt="Ohana Scholars Logo" />
            Ohana Scholars
          </Navbar.Brand>
        ) : (
          <Navbar.Brand as={NavLink} to="/home" id="goto-home">
            <Image src="/images/ohana-scholars-logo.png" width="60px" alt="Ohana Scholars Logo" />
            Ohana Scholars
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser && (Roles.userIsInRole(Meteor.userId(), 'banned') === false) ? ([
              <Nav.Link id="add-session-nav" as={NavLink} to="/add" key="add">Add Session</Nav.Link>,
              <Nav.Link id="list-sessions-nav" as={NavLink} to="/list" key="list">List Sessions</Nav.Link>,
            ]) : ''}
            {currentUser && (Roles.userIsInRole(Meteor.userId(), 'banned') === false) ? ([
              <Nav.Link id="list-courses-nav" as={NavLink} to="/courses" key="list">Courses</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="add-course-nav" as={NavLink} to="/addcourse" key="add">Add Courses</Nav.Link>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-sessions-admin-nav" as={NavLink} to="/listadmin" key="listadmin">List Sessions (Admin)</Nav.Link>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-users-admin-nav" as={NavLink} to="/listusersadmin" key="listusersadmin">List Users (Admin)</Nav.Link>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-courses-admin-nav" as={NavLink} to="/coursesAdmin" key="listAdmin">Courses (Admin)</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-view-profile" as={NavLink} to="/profile">
                  <PersonFill />
                  {' '}
                  View
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
