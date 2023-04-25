import { Selector } from 'testcafe';

class AddCoursePage {
  constructor() {
    this.pageId = '#add-course-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  async addCourse(testController, subject, title, name) {
    await this.isDisplayed(testController);
    await testController.typeText('#addcourse-form-subject', subject);
    await testController.typeText('#addcourse-form-title', title);
    await testController.typeText('#addcourse-form-name', name);
    await testController.click('#addcourse-form-submit');
  }
}

export const addCoursePage = new AddCoursePage();
