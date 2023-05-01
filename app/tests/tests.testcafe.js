import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { profilePage } from './profile.page';
import { addSessionPage } from './addsession.page';
import { listSessionsPage } from './listsessions.page';
import { listCoursesPage } from './listcourses.page';
import { homePage } from './home.page';
import { signupPage } from './signup.page';
import { addProfilePage } from './addprofile.page';
import { addCoursePage } from './addcourse.page';
import { listSessionsAdminPage } from './listsessionsadmin.page';
import { editSessionsPage } from './editsessions.page';
import { listCoursesAdminPage } from './listcoursesadmin.page';
import { editCoursePage } from './editcourse.page';
import { rateStudentPage } from './ratestudent.page';
import { deletesessionPage } from './deletesession.page';
import { listUsersAdminPage } from './listusersadmin.page';
import { listReviewsPage } from './listreviews.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const admin = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page works', async (testController) => {
  await landingPage.isDisplayed(testController);
  await landingPage.testButtons(testController);
});

test('Test that signup page works', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, 'username', 'password');
  await addProfilePage.isDisplayed(testController);
});

test('Test that add profile page works', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, 'username2', 'password');
  await addProfilePage.isDisplayed(testController);
  await addProfilePage.addProfile(testController, 'username2', 'Leeroy', 'Jenkins', 'LEEROY JENKINS', '.');
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that home page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await homePage.isDisplayed(testController);
  await homePage.testButtons(testController);
});

test('Test that view profile page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoViewProfilePage(testController);
  await profilePage.isDisplayed(testController);
});

test('Test that rate student works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoViewProfilePage(testController);
  await profilePage.gotoRateStudent(testController);
  await rateStudentPage.isDisplayed(testController);
  await rateStudentPage.rateStudent(testController, '10', 'gave good explanations');
});

test('Test that list reviews page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoViewProfilePage(testController);
  await profilePage.gotoListReviews(testController);
  await listReviewsPage.isDisplayed(testController);
  await listReviewsPage.returnToProfilePage(testController);
});

test('Test that add sessions page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAddSessionPage(testController);
  await addSessionPage.isDisplayed(testController);
});

test('Test that list sessions page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoListSessionPage(testController);
  await listSessionsPage.isDisplayed(testController);
  await listSessionsPage.createSessionBtn(testController);
});

test('Test that list courses page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoListCoursesPage(testController);
  await listCoursesPage.isDisplayed(testController);
//   await listCoursesPage.filterCourses(testController);
});

test('Test that admin sign in works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
});

test('Test that add course page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoAddCoursePage(testController);
  await addCoursePage.isDisplayed(testController);
  await addCoursePage.addCourse(testController, 'ICS', '111', 'Introduction to Computer Science I');
});

test('Test that list sessions (admin) page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoListSessionAdminPage(testController);
  await listSessionsAdminPage.isDisplayed(testController);
  // await listSessionsAdminPage.hasSession(testController);
});

test('Test that edit sessions page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoListSessionAdminPage(testController);
  await listSessionsAdminPage.isDisplayed(testController);
  await listSessionsAdminPage.gotoEditSessionPage(testController);
  await editSessionsPage.isDisplayed(testController);
  // await editSessionsPage.editSession(testController);
});

test('Test that delete sessions page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoListSessionAdminPage(testController);
  await listSessionsAdminPage.isDisplayed(testController);
  await listSessionsAdminPage.gotoDeleteSessionPage(testController);
  await deletesessionPage.isDisplayed(testController);
  // await deletesessionPage.deleteSession(testController);
});

test('Test that list courses (admin) page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoListCoursesAdminPage(testController);
  await listCoursesAdminPage.isDisplayed(testController);
  await listCoursesAdminPage.hasTable(testController);
  // await listCoursesAdminPage.filterCourses(testController);
});

test('Test that edit courses page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoListCoursesAdminPage(testController);
  await listCoursesAdminPage.isDisplayed(testController);
  await listCoursesAdminPage.gotoEditCoursePage(testController);
  await editCoursePage.isDisplayed(testController);
  // await editCoursePage.editCourse(testController);
});

test('Test that list users admin page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await navBar.gotoListUsersAdminPage(testController);
  await listUsersAdminPage.isDisplayed(testController);
});
