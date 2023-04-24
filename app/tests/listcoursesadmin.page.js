import { Selector } from 'testcafe';

class ListCoursesAdminPage {
  constructor() {
    this.pageId = '#list-courses-admin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that the page contains a table */
  async hasTable(testController) {
    await this.isDisplayed(testController);
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(7);
  }

  async gotoEditCoursePage(testController) {
    await this.isDisplayed(testController);
    await testController.click('#editcourse-link');
  }
  // /** Checks that the filter courses works */
  // async filterCourses(testController) {
  //   const rowCountTot = Selector('tr').count;
  //   await testController.expect(rowCountTot).gte(7);
  //   await testController.click('#filter-courses-btn');
  //   await testController.click('#filter-dropdown');
  //   await testController.click('#ICS');
  //   const rowCount = Selector('tr').count;
  //   await testController.expect(rowCount).lte(3);
  // }
}

export const listCoursesAdminPage = new ListCoursesAdminPage();
