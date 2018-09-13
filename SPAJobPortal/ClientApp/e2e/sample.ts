import { browser, by, element, ExpectedConditions } from 'protractor';



describe("Test Cases", () => {
    let page: e2eTest;
    beforeEach(() => {
        page = new e2eTest();
        page.navigateToUrl();
    });
    
    it('Sample test case', () => {
        //some test code here
        page.addNewRecord();
        browser.waitForAngular();
        browser.sleep(35000).then(
            function () {
                console.log("Waiting");
            }
        )
    });
});

export class e2eTest {
    navigateToUrl() {
        //for dev testing        
        browser.get("http://localhost:65352/home");
        browser.waitForAngular();
       
        browser.driver.manage().window().maximize();
    }

    addNewRecord() {
        browser.sleep(6000);
        console.log("Waiting");
        browser.sleep(6000);
        console.log(browser.params.login.email);
    }
}

