import { Selector } from 'testcafe';

class ProfilePage {
  constructor() {
    this.pageId = '#profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that the rate students button works. */
  async gotoRateStudent(testController) {
    await this.isDisplayed(testController);
    await testController.click('#rate-student-btn');
  }

  /** Checks that edit profile button works. */
  async gotoEditProfile(testController) {
    await this.isDisplayed(testController);
    await testController.click('#edit-profile-btn');
  }
}

export const profilePage = new ProfilePage();
