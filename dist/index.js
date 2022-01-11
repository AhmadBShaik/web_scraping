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
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: false, executablePath: "/usr/lib64/chromium-browser/chromium-browser.sh" });
    const page = yield browser.newPage();
    yield page.goto('https://ahmadbshaik.github.io', {
        waitUntil: 'networkidle0',
    });
    // networkidle0 is used for Single Page Applications that load resources with fetch requests.
    // networkidle1 is used to do long-polling or any other side activity.
    // screenshots the webpage
    // await page.screenshot({ path: 'my_portfolio.png' });
    // convert webpage into pdf
    // await page.pdf({ path: 'ahmad.pdf', format: 'a4'})
    const dimensions = yield page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });
    console.log({ dimensions });
    // await browser.close();
}))();
