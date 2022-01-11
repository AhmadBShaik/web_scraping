import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://ahmadbshaik.github.io');
    
    await page.screenshot({ path: 'my_portfolio.png' })

    await browser.close();
})();