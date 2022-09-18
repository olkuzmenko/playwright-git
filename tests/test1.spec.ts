
   const { test, expect } = require('@playwright/test');
   let strEmail = "";
   function randomEmail() {
     let strValues = "qwervflabcdefg12345";
     let strTmp;
     for (var i = 0; i < 10; i++) {
       strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
       strEmail = strEmail + strTmp;
     }
     strTmp = "";
     strEmail = strEmail + "@";
     for (var j = 0; j < 8; j++) {
       strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
       strEmail = strEmail + strTmp;
     }
     strEmail = strEmail + ".com";
     return strEmail;
   };
   randomEmail();
   var string = '';
    function randomeStr() {
  var chars = 'aABCDEFGnopqrstuvwxyz1234567890';
  ;
  for (var ii = 0; ii < 10; ii++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string;
}
randomeStr();

   test.describe('redmine testcases', () =>{
    test.beforeEach(async ({ page }) => {
      // Go to the starting url before each test.
      await page.goto("https://www.redmine.org/");
    });
    test('use search at the main page', async ({ page }) => {
      const search = page.locator('#q');
      const searchButton = page.locator('a[href*="search"]');
      const dropDown = page.locator('#scope');
      const scopeOption =  page.locator('#scope option[value="all"]');
      const titleOnly = page.locator('#titles_only');
      const sendButton = page.locator('input[name="commit"]');
      const searchResults = page.locator('#search-results dt');
      await search.focus();
      await search.fill('framework');
      await searchButton.press('Enter');
      await expect(page).toHaveURL(new RegExp('.*framework.*'));
      await dropDown.selectOption(scopeOption);
      await titleOnly.check();
      expect(await titleOnly.isChecked()).toBeTruthy();
      await page.locator('#wiki_pages').uncheck();
      expect (await page.locator('#wiki_pages').isChecked()).toBeFalsy();
      await sendButton.click();
      await expect(searchResults).toBeVisible();
    });
    test('Search version page at repository', async ({ page }) => {
      const repository = page.locator('a[href*="repository"]');
      const changesButton = page.locator('#content input[type="submit"]');
      const tableVersion = page.locator('.filecontent')
      const exportButton = page.locator('.diff');
      await repository.click();
      await changesButton.click();
      await expect(page.locator('#content h2')).toBeVisible();
      await expect(tableVersion).toHaveCount(5);
      await exportButton.focus();
      await expect(exportButton).toBeVisible();
    });
    test('Open page with users of Redmine from Wiki', async ({ page }) =>{
      const wikiPage = page.locator('.wiki[href*="wiki"]');
      const whoUses = page.locator('li a[href="#Who-uses-Redmine"]');
      const pageListUsers = page.locator('a[href*="WeAreUsingRedmine"]');
      await wikiPage.click();
      await expect(page).toHaveURL(new RegExp('.*redmine/wiki.*'));
      await whoUses.click();
      await expect(pageListUsers).toBeVisible();
      await pageListUsers.click();
      await expect(page).toHaveURL(new RegExp('.*wiki/WeAreUsingRedmine.*'));
      
    });
    test('Create new user', async ({ page }) =>{
      const registrationButton = page.locator('.register');
      const inputLogin = page.locator('#user_login');
      const password = page.locator('#user_password');
      const confirmPassword = page.locator('#user_password_confirmation');
      const firstname = page.locator('#user_firstname');
      const lastname = page.locator('#user_lastname');
      const email = page.locator('#user_mail');
      const submitButton = page.locator('input[name="commit"]');

      registrationButton.click();
      await expect(page).toHaveURL(new RegExp('.*account/register.*'));
      await inputLogin.fill(string);
      await password.fill('1234');
      await confirmPassword.fill('1234');
      await firstname.fill('Kddfs');
      await lastname.fill('Dolasdda');
      await email.fill(strEmail);
      await submitButton.click();
      await expect(page).toHaveURL('https://www.redmine.org/login');
      await expect(page.locator('#flash_notice')).toBeVisible();

    });
    test('take a look to quastion page', async ({ page }) =>{
      const questionButton = page.locator('.issues');
      const filter = page.locator('#add_filter_select');
      const filterItem = page.locator('option[value="author_id"]');
      const checkedFilter = page.locator('#cb_author_id');
      const selectButton = page.locator('.icon-checked');
      const paginationView = page.locator('//a[text()="50"]');
      const countItem = page.locator('td.id');
      await questionButton.click();
      await expect(page).toHaveURL(new RegExp('.*redmine/issues.*'));
      await filter.click();
      await filter.selectOption(filterItem)
      await selectButton.click();
      await paginationView.click();
      await expect(countItem).toHaveCount(50);
    })
   });
