import { Selector } from 'testcafe';

class ListSessionsPage {
  constructor() {
    this.pageId = '#list-sessions-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that the create session button works. */
  async createSessionBtn(testController) {
    await testController.click('#goto-add-session-page');
    await testController.expect(Selector('#add-session-page').exists).ok();
  }
}

export const listSessionsPage = new ListSessionsPage();
