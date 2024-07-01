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

describe("Task 1", () => {
  it("<sup> elements used in the correct place", async () => {
    const ordinals = await page.$$("sup");

    // Iterate through each sup element and validate its text content
    let isValid = true;
    for (const ordinal of ordinals) {
      const textContent = await page.evaluate(
        (element) => element.textContent,
        ordinal
      );
      if (textContent.toString() !== "st" && textContent.toString() !== "th") {
        isValid = false;
      }
    }

    expect(ordinals.length).toBe(5);
    expect(isValid).toBe(true);
  });
});
