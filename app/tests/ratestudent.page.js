import { Selector } from 'testcafe';

class RateStudentPage {
  constructor() {
    this.pageId = '#rate-student-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that the rate students works. */
  async rateStudent(testController, rating, reason) {
    await this.isDisplayed(testController);
    await testController.typeText('#ratestudent-form-rating', rating);
    await testController.typeText('#ratestudent-form-reason', reason);
    await testController.click('#ratestudent-form-submit');
  }
}

export const rateStudentPage = new RateStudentPage();
