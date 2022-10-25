import { assert } from 'chai';
import { action } from '../support/user.command';

const user = '[id="okta-signin-username"]';
const pass = '[id="okta-signin-password"]';
const submit = '[id="okta-signin-submit"]';
const logo='[class="logo"]'
const invoicesMenuIdVerify = '#InvoicesMenuId';


class LoginPage {

    openURL() {
          if (!this.userLoggedIn()) {
            browser.url('https://netjets.oktapreview.com/login/default');
            console.log('Entered OKTA preview URL= >https://netjets.oktapreview.com/login/default')
            if (testEnvironmentURL === 'undefined') {
                console.log('inside BeforeSuite')
                assert.fail("Test URL is not supplied.Please set TEST_URL environment variable.")
            }

        }else{
            browser.url(testEnvironmentURL);
            console.log('Opened CARMA URL again')
        }
    }


    login() {
        if (!this.userLoggedIn()) {
            action.waitTillPageLoaded();
            action.waitTillVisible(user,30000)
             if (APPLICATION_USERNAME === 'undefined') {
                assert.fail("UserID for OCTA login is not supplied.Please set APPLICATION_USERNAME environment variable.")
            }
            action.setValue(user, APPLICATION_USERNAME);
            console.log('Entered username')
            if (APPLICATION_PASSWORD === 'undefined') {
                assert.fail("Password for OCTA login is not supplied.Please set APPLICATION_PASSWORD environment variable.")
            }
            action.setValue(pass, APPLICATION_PASSWORD);
            console.log('Entered password')
            action.smallWait()
            action.click(submit);
            console.log('Clicked submit button')
            action.waitTillPageLoaded();
            action.waitTillVisible(logo,30000)
            browser.url(testEnvironmentURL);

        }
    }

    
    verifylogin() {
        action.mediumWait()
        if (!action.isPresent(invoicesMenuIdVerify)) {
            assert.fail('User could not login successfully');
        } else
            return true
    }
    userLoggedIn() {
        action.mediumWait()
        if (!action.isPresent(invoicesMenuIdVerify)) {
            console.log('User is not logged in yet')
            return false
        } else{
        console.log('User is already logged in')
            return true
        }
    }

}
export const loginPage = new LoginPage();