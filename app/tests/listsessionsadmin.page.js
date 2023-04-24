import { Selector } from 'testcafe';

class ListSessionsAdminPage {
  constructor() {
    this.pageId = '#list-sessions-admin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  async hasSession(testController) {
    await this.isDisplayed(testController);
    const cardCount = Selector('SessionAdmin').count;
    await testController.expect(cardCount).gte(1);
  }

  async gotoEditSessionPage(testController) {
    await this.isDisplayed(testController);
    await testController.click('#editsession-link');
  }
}

export const listSessionsAdminPage = new ListSessionsAdminPage();
