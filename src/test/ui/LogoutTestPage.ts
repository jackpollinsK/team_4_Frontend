import { ChromeDriver } from './ChromeDriver';
import { WebDriver } from 'selenium-webdriver';

export class LogoutTestPage extends ChromeDriver {

    constructor(driver: WebDriver) {
        super(driver);
    }

    
    async open(): Promise<void> {
        const BASE_URL = process.env.BASE_URL;
        const LOGOUT_URL = `${BASE_URL}/logoutForm`;
        await this.go_to_url(LOGOUT_URL);
    }

    async clickLogout(): Promise<void> {
        const element = 'submit';
        await this.clickById(element);
    }

}
