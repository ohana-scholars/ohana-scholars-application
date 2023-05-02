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

  /** Checks that a session can be added. */
  async addSession(testController, name, subject, location, image, month, day, year, time, notes) {
    await this.isDisplayed(testController);
    await testController.typeText('#add-session-field-name', name);
    await testController.typeText('#add-session-field-subject', subject);
    await testController.typeText('#add-session-field-location', location);
    await testController.typeText('#add-session-field-image', image);
    await testController.typeText('#add-session-field-month', month);
    await testController.typeText('#add-session-field-day', day);
    await testController.typeText('#add-session-field-year', year);
    await testController.typeText('#add-session-field-time', time);
    await testController.typeText('#add-session-field-notes', notes);
    await testController.click('#add-session-submit');
  }
}

export const addSessionPage = new AddSessionPage();
