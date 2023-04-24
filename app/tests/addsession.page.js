import { Selector } from 'testcafe';

class AddSessionPage {
  constructor() {
    this.pageId = '#add-session-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }
}

export const addSessionPage = new AddSessionPage();
