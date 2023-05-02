import { Selector } from 'testcafe';

class ListCoursesPage {
  constructor() {
    this.pageId = '#list-courses-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that this page has a table. */
  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(7);
  }

  /** Checks that the filter courses works */
  async filterCourses(testController) {
    const rowCountTot = Selector('tr').count;
    await testController.expect(rowCountTot).gte(7);
    await testController.click('#filter-courses-btn');
    await testController.click('#filter-dropdown');
    await testController.click('#ICS');
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).lte(3);
  }

  /** Checks that the View Sessions button works. */
  async gotoListSessionsPage(testController) {
    await this.isDisplayed(testController);
    await testController.click('#goto-list-sessions-page');
  }
}

export const listCoursesPage = new ListCoursesPage();
