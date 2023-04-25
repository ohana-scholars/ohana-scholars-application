import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class AddProfilePage {
  constructor() {
    this.pageId = '#add-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that inputs of add profile page works */
  async addProfile(testController, username, firstname, lastname, description, picturelink) {
    await this.isDisplayed(testController);
    await testController.typeText('#addprofile-form-username', username);
    await testController.typeText('#addprofile-form-firstname', firstname);
    await testController.typeText('#addprofile-form-lastname', lastname);
    await testController.typeText('#addprofile-form-description', description);
    await testController.typeText('#addprofile-form-picturelink', picturelink);
    await testController.click('#addprofile-form-submit');
    await navBar.isLoggedIn(testController, username);
  }
}

export const addProfilePage = new AddProfilePage();
