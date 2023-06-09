import { Selector } from 'testcafe';

class EditCoursePage {
  constructor() {
    this.pageId = '#edit-course-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that course can be edited. */
  async editCourse(testController) {
    await this.isDisplayed(testController);
    // Test edit course here.
  }
}

export const editCoursePage = new EditCoursePage();
