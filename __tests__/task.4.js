const puppeteer = require("puppeteer");
const path = require("path");

const browserOptions = {
  headless: "new",
  ignoreHTTPSErrors: true,
};

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto("file://" + path.resolve("./index.html"));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) {}
  done();
});

describe("Task 4", () => {
  it("<em> elements used in the correct place", async () => {
    const dates = await page.$$("cite");

    // Iterate through each sup element and validate its text content
    let isValid = true;
    for (const date of dates) {
      const textContent = await page.evaluate(
        (element) => element.textContent,
        date
      );
      console.log(textContent);
      if (textContent.toString() !== "Wikipedia") {
        isValid = false;
      }
    }

    expect(dates.length).toBe(1);
    expect(isValid).toBe(true);
  });
});
