import { Selector } from 'testcafe';

class ListUsersAdminPage {
  constructor() {
    this.pageId = '#list-users-admin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that the ban user button works. */
  async banUser(testController) {
    await this.isDisplayed(testController);
    // test ban user here
  }
}

export const listUsersAdminPage = new ListUsersAdminPage();
