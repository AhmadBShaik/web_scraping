import puppeteer from "puppeteer";

(async () => {
    // `executable path` is path to browser in our local machine
    const browser = await puppeteer.launch({ headless:false, executablePath:"/usr/lib64/chromium-browser/chromium-browser.sh" });
    const page = await browser.newPage();

    await page.goto('https://ahmadbshaik.github.io', {
        waitUntil: 'networkidle0',
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

    console.log({ dimensions })
    // await browser.close();
})();