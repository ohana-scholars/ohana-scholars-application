import { Selector } from 'testcafe';

class ListReviewsPage {
  constructor() {
    this.pageId = '#list-reviews-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that the return to profile works. */
  async returnToProfilePage(testController) {
    await this.isDisplayed(testController);
    await testController.click('#return-to-profile-btn');
  }
}

export const listReviewsPage = new ListReviewsPage();
