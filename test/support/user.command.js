let sPageStatus;
let sElementStatus;
var chai = require('chai');
var assert = chai.assert;
class UserCommand {
    getPageReadyStatus() {
        browser.pause(50);
        for (var iLoop = 0; iLoop < 1000; iLoop++) {
            sPageStatus = browser.execute("return document.readyState");
            if (sPageStatus === "complete") {
                break;
            }
            else browser.pause(50);
        }
        return sPageStatus;
    }

    acceptAlert() {
        browser.pause(50);
        for (var iLoop = 0; iLoop < 1200; iLoop++) {
            if (browser.isAlertOpen()) {
                browser.acceptAlert()
                console.log('Alert has been accepted')
                break;
            } else browser.pause(50);
        }
    }
    waitTillPageLoaded() {
        //browser.pause(500);
       // console.log("Web Page load status =>" + action.getPageReadyStatus())
        assert(action.getPageReadyStatus() === 'complete', 'Web Page is still not loaded properly')

    }



    getElementReady(selectors) {
        browser.pause(50);

        for (var iLoop = 0; iLoop < 12; iLoop++) {
            sElementStatus = browser.execute("return document.querySelectorAll('" + selectors + "')");
            if (sElementStatus.length >= 1) {
                break;
            }
            else browser.pause(500);

        }
    }

    click(ele) {
        const element = $(ele);
        let isEnabled = element.isEnabled();
        if (isEnabled == true) {
            element.click();
            browser.pause(1000);
        }
        // action.waitTillPageLoaded()
    }

    setValue(ele, data) {
        const element = $(ele);
        let isEnabled = element.isEnabled();
        if (isEnabled == true) {
            element.setValue(data);
            browser.pause(500);
        }
    }

    clickByIndex(ele, index) {
        const element = $$(ele);
        element[index].click();
        return this;
    }

    hover(ele) {
        const element = $(ele);
        element.moveTo();
        return this;
    }

    hoverByIndex(ele, index) {
        const element = $$(ele);
        element[index].moveTo();
        return this;
    }

    selectByVisibleText(ele, data) {
        const element = $(ele);
        element.selectByVisibleText(data);
       // browser.pause(500);
        return this;
    }

    selectByIndex(ele, indexValue) {
        const element = $(ele);
        element.selectByIndex(indexValue);
      //  browser.pause(500);
        return this;
    }
    smallWait() {
        browser.pause(1000);
    }
    mediumWait() {
        browser.pause(5000);
    }
    longWait() {
        browser.pause(20000);
    }
    VeryLongWait() {
        browser.pause(50000);
    }
    wait() {
        browser.pause(60000);
    }

    verifyTextByIndex(ele, index, data) {
        const element = $$(ele);
        assert(element[index].getText() === data);
        return this;
    }
    
    waitTillVisible(ele,timeToWait){
        const elem = $(ele)
        elem.waitForDisplayed({ timeout: timeToWait });
    }
    isPresent(ele) {
        browser.pause(2000);
        try {
            const element = $(ele);
            this.waitTillPageLoaded()
            if (element.isDisplayed() === true) {
               // console.log("Element Displayed=>" + ele)
                return true;
            } else {
                console.log("Element Not Displayed=>" + ele)
                return false;
            }
        } catch {
            console.log("Element is not present on page")
            return false
        }

    }



    refresh() {
        browser.refresh();
        
    }
    closePopUpAndSwitchToMainWindow() {
        var popupGUID = browser.getWindowHandle();
        var allGUID = browser.getWindowHandles();
        console.log("Total Windows : " + allGUID.length);
        browser.closeWindow()
        console.log('closed popup window')
        for (var i = 0; i < allGUID.length; i++) {
            if (allGUID[i] != popupGUID) {
                browser.switchToWindow(allGUID[i]);
                console.log('Swiched focus back to main window')
                browser.execute("window.focus()")
                break;
            }
        }
    }
    switchToPopUpWindow() {
        browser.pause(2000);
        var parentGUID = browser.getWindowHandle();
        var allGUID = browser.getWindowHandles();
        console.log("Total Windows : " + allGUID.length);
        for (var i = 0; i < allGUID.length; i++) {
            if (allGUID[i] != parentGUID) {
                browser.switchToWindow(allGUID[i]);
                browser.execute("window.focus()")
                break;
            }
        }
    }
    closeAllWindowAndInitiateNewWindow() {
        browser.reloadSession()
    }

    getSearchDates() {
        const fs = require('fs');
        let rawdata = fs.readFileSync('./test-data/dateRangeSearchUI.json');
        let TestData = JSON.parse(rawdata);
        return TestData;
    }
}

export const action = new UserCommand();