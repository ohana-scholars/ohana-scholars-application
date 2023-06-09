import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import ListCoursesAdmin from '../pages/ListCoursesAdmin';
import EditCourse from '../pages/EditCourse';
import ListCourses from '../pages/ListCourses';
import Home from '../pages/Home';
import AddCourse from '../pages/AddCourse';
import ListSessions from '../pages/ListSessions';
import AddSession from '../pages/AddSession';
import AddProfile from '../pages/AddProfile';
import ListSessionsAdmin from '../pages/ListSessionsAdmin';
import EditSession from '../pages/EditSession';
import Banned from '../pages/Banned';
import Appeal from '../pages/Appeal';
import RateStudent from '../pages/RateStudent';
import ListUsersAdmin from '../pages/ListUsersAdmin';
import EditProfile from '../pages/EditProfile';
import Profile from '../pages/Profile';
import DeleteSession from '../pages/DeleteSession';
import ListReviews from '../pages/ListReviews';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/appeal" element={<Appeal />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/banned" element={<Banned />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/list" element={<ProtectedRoute><ListSessions /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddSession /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/addProfile" element={<ProtectedRoute><AddProfile /></ProtectedRoute>} />
          <Route path="/rateStudent/:_id" element={<ProtectedRoute><RateStudent /></ProtectedRoute>} />
          <Route path="/editProfile/:_id" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/addcourse" element={<AdminProtectedRoute ready={ready}><AddCourse /></AdminProtectedRoute>} />
          <Route path="/listusersadmin" element={<AdminProtectedRoute ready={ready}><ListUsersAdmin /></AdminProtectedRoute>} />
          <Route path="/coursesAdmin" element={<AdminProtectedRoute ready={ready}><ListCoursesAdmin /></AdminProtectedRoute>} />
          <Route path="/listadmin" element={<AdminProtectedRoute ready={ready}><ListSessionsAdmin /></AdminProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><ListCourses /></ProtectedRoute>} />
          <Route path="/edit/:_id" element={<ProtectedRoute><EditSession /></ProtectedRoute>} />
          <Route path="/deletesession/:_id" element={<ProtectedRoute><DeleteSession /></ProtectedRoute>} />
          <Route path="/reviews/:_id" element={<ProtectedRoute><ListReviews /></ProtectedRoute>} />
          <Route path="/editcourse/:_id" element={<AdminProtectedRoute ready={ready}><EditCourse /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (Roles.userIsInRole(Meteor.userId(), 'banned') === true) {
    return <Navigate to="/banned" />;
  }
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (Roles.userIsInRole(Meteor.userId(), 'banned') === true) {
    return <Navigate to="/banned" />;
  }
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
