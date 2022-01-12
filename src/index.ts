import puppeteer from "puppeteer";
import fs from 'fs';

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
(async () => {

    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('https://ahmadbshaik.github.io',{
        waitUntil:'domcontentloaded'
    });


    // titles of projects from my portfolio
    const titles = await page.$$eval('div.border-card.inner-flex-item > h3', (headings) => {
        return headings.map((e) => e.textContent).filter(e => e !== null);
    });
    
    // github source code links to github repositories
    const projectLinks = await page.$$eval('div.border-card.inner-flex-item > a', (links) => {
        return links
            .map((e) => e.getAttribute("href"))
            .filter(e => e !== null)
            .filter(e => !e?.includes("github.io") && e !== "");
    });
    
    console.log(titles);
    
    
    console.log(projectLinks);
    
    for(let i = 0; i < titles.length; i++){
        console.log(titles[i]);
    }
    for(let i = 0; i < projectLinks.length; i++){
        console.log(projectLinks[i]);
    }

    // output object
    let output: {[key: string]: string} = {}
    for(let i = 0; i < titles.length; i++){
        if(titles[i] !== null){
            output[titles[i]] = projectLinks[i] // Type 'null' cannot be used as an index type.
        }
    }

    // console.log(typeof projectLinks)
    

    browser.close();
})();