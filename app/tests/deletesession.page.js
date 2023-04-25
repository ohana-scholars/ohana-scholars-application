import { Selector } from 'testcafe';

class DeleteSessionPage {
  constructor() {
    this.pageId = '#delete-session-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  async deleteSession(testController) {
    await this.wait(1000).isDisplayed(testController);
    // delete sessions form here
  }
}

export const deletesessionPage = new DeleteSessionPage();
