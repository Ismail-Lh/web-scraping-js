import fs from "fs";

import { launch } from "puppeteer";

// https://byltbasics.com/

const URL_1 = "https://www.traversymedia.com/";
const URL_2 = "https://byltbasics.com/";

(async () => {
  const browser = await launch();
  const page = await browser.newPage();

  await page.goto(URL_1);

  // !: Get a screenshot to the website page
  // await page.screenshot({ path: "screenshot.png", fullPage: true });

  // !: Get PDF screenshot to the website page
  // await page.pdf({ path: "screenshot.pdf", format: "A4" });

  // !: Get the HTML content
  // const htmlContent = await page.content();

  // fs.writeFile("index.html", htmlContent, (err) => {
  //   if (err) throw new Error(err);

  //   console.log("SUCCESS!!!");
  // });

  // !: Get the title of the website
  // const title = await page.evaluate(() => document.title);
  // console.log("🚀 ~ file: index.js:32 ~ title:", title);

  // !: Get the TEXT content of the website
  // const textContent = await page.evaluate(() => document.body.innerText);

  // fs.writeFile("textContent.txt", textContent, (err) => {
  //   if (err) throw new Error(err);

  //   console.log("SUCCESS!!!");
  // });

  // const links = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll("a"), (el) => el.href)
  // );

  // const courses = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll("#cscourses .card"), (el) => ({
  //     title: el.querySelector(".card-body h3").innerText,
  //     level: el.querySelector(".card-body .level").innerText,
  //     link: el.querySelector(".card-footer a").href,
  //   }))
  // );

  const courses = await page.$$eval("#cscourses .card", (elements) =>
    elements.map((el) => ({
      title: el.querySelector(".card-body h3").innerText,
      level: el.querySelector(".card-body .level").innerText,
      link: el.querySelector(".card-footer a").href,
    }))
  );

  fs.writeFile("data.json", JSON.stringify(courses), (err) => {
    if (err) throw new Error(err);

    console.log("SUCCESS!!!!");
  });

  await browser.close();
})();
