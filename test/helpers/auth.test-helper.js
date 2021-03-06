// Import Selenium web driver
const webdriver = require('selenium-webdriver');
const {Builder, By, until, promise} = webdriver;
const seconds = 1000;
const minutes = 60 * seconds;


// TODO: add comments
async function register(driver, username, password) {
  // Click on the register nav button to load the registraion form:
  const $registerLink = await driver.wait(until.elementLocated(By.name('register-nav-link')), 5 * minutes);
  await $registerLink.click();

  // Fill in the registration form:
  const $usernameInput = await driver.wait(until.elementLocated(By.name('username-input-field')), 5 * minutes);
  await $usernameInput.sendKeys(username);

  // Fill in password
  const $passwordInput = await driver.wait(until.elementLocated(By.name('password-input-field')), 5 * minutes);
  await $passwordInput.sendKeys(password);

  // Submit form;
  const $submitButton = await driver.wait(until.elementLocated(By.name('submit-button')), 5 * minutes);
  await $submitButton.click();
};

async function login(driver, username, password) {
  const $loginLink = await driver.wait(until.elementLocated(By.name('login-nav-link')), 5 * minutes);
  await $loginLink.click();
};

module.exports = {register, login};
