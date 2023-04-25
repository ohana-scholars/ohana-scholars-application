import { Selector } from 'testcafe';

class EditSessionsPage {
  constructor() {
    this.pageId = '#edit-session-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  async editSession(testController) {
    await this.isDisplayed(testController);
    // edit sessions form here
  }
}

export const editSessionsPage = new EditSessionsPage();
