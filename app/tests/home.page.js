import { Selector } from 'testcafe';

class HomePage {
  constructor() {
    this.pageId = '#home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  async testButtons(testController) {
    await testController.click('#view-profile-btn');
    await testController.wait(500).expect(Selector('#profile-page').exists).ok();
    await testController.click('#goto-home');
    await testController.wait(500).expect(Selector('#home-page').exists).ok();
    await testController.click('#create-session-btn');
    await testController.wait(500).expect(Selector('#add-session-page').exists).ok();
    await testController.click('#goto-home');
    await testController.wait(500).expect(Selector('#home-page').exists).ok();
    await testController.click('#view-sessions-btn');
    await testController.wait(500).expect(Selector('#list-sessions-page').exists).ok();
    await testController.click('#goto-home');
    await testController.wait(500).expect(Selector('#home-page').exists).ok();
    await testController.click('#view-courses-btn');
    await testController.wait(500).expect(Selector('#list-courses-page').exists).ok();
  }
}

export const homePage = new HomePage();
