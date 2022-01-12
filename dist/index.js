"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
/*
Getting data from internet

(async () => {
    // `executable path` is path to browser in our local machine
    const browser = await puppeteer.launch({
        headless: true,
        // executablePath: "/usr/lib64/chromium-browser/chromium-browser.sh",
        defaultViewport: null
    });
    
    const page = await browser.newPage();

    await page.goto('https://ahmadbshaik.github.io', {
        waitUntil: 'domcontentloaded',
    });
    
    // networkidle0 is used for Single Page Applications that load resources with fetch requests.
    // networkidle1 is used to do long-polling or any other side activity.
    
    
    // screenshots the webpage
    // await page.screenshot({ path: 'my_portfolio.png' });
    
    // convert webpage into pdf
    // await page.pdf({ path: 'ahmad.pdf', format: 'a4'})

    const dimensions = await page.evaluate(() => {
       return {
           width: document.documentElement.clientWidth,
           height: document.documentElement.clientHeight,
           deviceScaleFactor: window.devicePixelRatio
       };
    });

    // console.log({ dimensions })
    
    const myNameElement = await page.$('#name');
    if(myNameElement){
        const myName = await page.evaluate(element => element.textContent, myNameElement);
        console.log(`My name is ${myName} Shaik`);
    }

    const containerElement = await page.$('.container');
    if(containerElement){
        const content = await page.evaluate(element => element.textContent, containerElement);
        console.log(content);
    }

    const containerElements = await page.$('.container > a');
    if(containerElements){
        const content = await page.evaluate(element => element.textContent, containerElements);
        console.log(content);
    }

    await browser.close();
})();

*/
/*
// Access local web page
(async () => {

    const browser = await puppeteer.launch({
        // headless: false
    });

    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/index.html',{
        waitUntil:'domcontentloaded'
    });

    const a = await page.$$eval('header > nav > a', (links) => {
        return links.map((e) => e.getAttribute("href"))
    })

    console.log(a);

    browser.close();
})();

*/
// basic data scraping from my portfolio
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.goto('https://ahmadbshaik.github.io', {
        waitUntil: 'domcontentloaded'
    });
    // titles of projects from my portfolio
    const titles = yield page.$$eval('div.border-card.inner-flex-item > h3', (headings) => {
        return headings.map((e) => e.textContent);
    });
    // github source code links to github repositories
    const projectLinks = yield page.$$eval('div.border-card.inner-flex-item > a', (links) => {
        return links.map((e) => e.getAttribute("href")).filter(e => !(e === null || e === void 0 ? void 0 : e.includes("github.io")) && e !== "");
    });
    console.log(titles);
    console.log(projectLinks);
    for (let i = 0; i < titles.length; i++) {
        console.log(titles[i]);
    }
    for (let i = 0; i < projectLinks.length; i++) {
        console.log(projectLinks[i]);
    }
    browser.close();
}))();
