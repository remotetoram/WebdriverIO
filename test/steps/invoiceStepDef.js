import { Given, When, Then } from 'cucumber';
import { action } from '../support/user.command'
import { loginPage } from '../pages/loginPage';
import { homePage } from '../pages/homePage';
import { invoicePage } from '../pages/invoiceCapturePage';
import { invoiceLinkPage } from '../pages/invoiceLinkPage';
import { invoiceBalancePage } from '../pages/invoiceBalancePage';
import { invoiceReconcilePage } from '../pages/invoiceReconcilePage';
import { invoiceDistributePage } from '../pages/invoiceDistributePage';
var chai = require('chai');
var assert = chai.assert;

/*-------------Variable used-----------------------------*/
var workOrderWithNotes;


Given(/^I am in the Carma home landing$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
});

When(/^Clicking on capture$/, () => {
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
});

Then(/^Capture landing page shows$/, () => {
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
});

Given(/^I am in the capture landing page$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
});

When(/^enter all necessary information for part invoice without purchase order number$/, () => {
    action.waitTillPageLoaded()
    invoicePage.enterPartsInvoiceDetailsWithoutOrderNumber();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
});

Then(/^part invoice created$/, () => {
    action.waitTillPageLoaded()
    if (!invoicePage.verifyPurchaseOrderSearchPage()) {
        assert.fail('Purchase Order Search Page is not displayed');
    }
});

Then(/^Search purchase order page shows up$/, () => {
    action.waitTillPageLoaded()
    if (!invoicePage.verifyPurchaseOrderSearchPage()) {
        assert.fail('Purchase Order Search Page is not displayed');
    }
});

When(/^enter all necessary information for service invoice without work order number$/, () => {
    action.waitTillPageLoaded()
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
});

Then(/^Service invoice created$/, () => {
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
});

Then(/^Search workorder order page shows up$/, () => {
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
});

When(/^I reset all necessary information for part invoice$/, () => {
    action.waitTillPageLoaded()
    invoicePage.enterPartsInvoiceDetailsWithoutOrderNumber();
    invoicePage.clickInvoiceCaptureReset();
});

Then(/^all entered data is clear$/, () => {
    action.waitTillPageLoaded()
    invoicePage.verifyResetFields();
});

When(/^submit without any data enter$/, () => {
    action.waitTillPageLoaded()
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
});

Then(/^list of require fields shown$/, () => {
    action.waitTillPageLoaded()
    invoicePage.verifyErrorMessages();
});

Given(/^I am creating a service invoice$/, () => {
    loginPage.openURL();
    loginPage.login();
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }

});

When(/^I have entered Received Date to be BEFORE the Invoice Date$/, () => {
    action.waitTillPageLoaded()
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.enterWrongReceiveDate();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
});

Then(/^an error message pops up$/, () => {
    action.waitTillPageLoaded()
    invoicePage.verifyReceiveDateEarlierThanInvoiceDateErrorMessage();
});
When(/^enter all necessary information for Credit Memo$/, () => {
    action.waitTillPageLoaded()
    invoicePage.enterCreditMemoDetails();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
});

Then(/^Display Credit Memo Page shows up$/, () => {
    action.waitTillPageLoaded()
    if (!invoicePage.verifyMemoPage()) {
        assert.fail('Credit Memo Page is not displayed');
    }
});

When(/^I reset all necessary information Credit Memo capture$/, () => {
    action.waitTillPageLoaded()
    invoicePage.enterCreditMemoDetails();
    invoicePage.clickInvoiceCaptureReset();
});

Then(/^all entered data is clear for Credit Memo capture screen$/, () => {
    action.waitTillPageLoaded()
    invoicePage.verifyCreditMemoResetFields();
});

When(/^select Credit memo and submit without any other data$/, () => {
    action.waitTillPageLoaded()
    invoicePage.clickInvoiceCaptureReset();
    invoicePage.selectCreditMemo();
    invoicePage.resetRemitToVendor();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
});

Then(/^list of require fields shown on Credit Memo capture page$/, () => {
    action.waitTillPageLoaded()
    invoicePage.verifyCreditMemoErrorMessages();
});
When(/^enter all necessary information for Debit Memo$/, () => {
    action.waitTillPageLoaded()
    invoicePage.enterDebitMemoDetails();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
});

Then(/^Display Debit Memo Page shows up$/, () => {
    action.waitTillPageLoaded()
    if (!invoicePage.verifyMemoPage()) {
        assert.fail('Debit Memo Page is not displayed');
    }
});

When(/^I have created Service Invoice and on Link invoice page$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
});
When(/^entering From date and To date and search$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.clickOnResetButton();
    let TestData = action.getSearchDates();
    invoiceLinkPage.enterFromAndToDate(TestData['workorderFromDate'], TestData['workorderToDate'])
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()

});
Then(/^list of work orders shown$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifylinkedWorkOrderlabel();
});

Given(/^I am on matching Work Orders List$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    let TestData = action.getSearchDates();
    invoiceLinkPage.enterFromAndToDate(TestData['workorderFromDate'], TestData['workorderToDate'])
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    invoiceLinkPage.verifylinkedWorkOrderlabel();

});
When(/^I select View link from result list$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.clickOnFirstWOLinkFromSearchResult();
    browser.pause(4000)
    action.waitTillPageLoaded()


});
Then(/^I am able to see the work order detail on linking page$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyWOnumberOnDetailPage();
    invoiceLinkPage.verifyWOdetailFromDatabase();


});

Given(/^I am on work order detail page while linking$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    let TestData = action.getSearchDates();
    invoiceLinkPage.enterFromAndToDate(TestData['workorderFromDate'], TestData['workorderToDate'])
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    invoiceLinkPage.verifylinkedWorkOrderlabel();
    invoiceLinkPage.clickOnFirstWOLinkFromSearchResult();
    browser.pause(3000)
    invoiceLinkPage.verifyWOnumberOnDetailPage();
});

Given(/^I am on work order detail page having notes$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    workOrderWithNotes = invoiceLinkPage.fetchWorkOrderNumberHavingNotes();
    console.log('workorder number with notes =>', workOrderWithNotes)
    invoiceLinkPage.enterWorkOrderNumber(workOrderWithNotes);
    invoiceLinkPage.clickWorkOrderSubmit();
    browser.pause(3000)
    action.waitTillPageLoaded()
});
When(/^Choose View Link Next to the Notes$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.clickOnViewNotesLink();
    browser.pause(4000)
    action.waitTillPageLoaded()

});
Then(/^Notes portion of the page is displayed$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyNotesSection()

});
When(/^Select Search button without entering any search criteria$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.clickOnResetButton();
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
});

Then(/^an error message shows up$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyErrorWhileSearchingWithoutWorkOrdercriteria();
});


Given(/^I have created Service Invoice and on Work Order Details page for selected item$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    let TestData = action.getSearchDates();
    invoiceLinkPage.enterFromAndToDate(TestData['workorderFromDate'], TestData['workorderToDate'])
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    invoiceLinkPage.verifylinkedWorkOrderlabel();
    invoiceLinkPage.clickOnFirstWOLinkFromSearchResult();
    browser.pause(3000)
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyWOnumberOnDetailPage();
});
When(/^Choose Radio button next to Work order matches invoice and click continue$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.selectWorkOrderMatchesInvoiceRadio();
    invoiceLinkPage.clickOnSubmitButton();
    browser.pause(2000)
    action.waitTillPageLoaded()
    invoiceLinkPage.clickToOverRideFleet();
    browser.pause(3000)
    action.waitTillPageLoaded()

});
Then(/^Balance Page gets displayed with unbalanced amount$/, () => {
    action.waitTillPageLoaded()
    if (!invoiceBalancePage.getInvoiceBalanceMessage()) {
        assert.fail("Balance message in bottom of page is not getting displayed");
    }
});

Given(/^I am on balacing page where Linked Invoice and Work Order do not Balance$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    let TestData = action.getSearchDates();
    invoiceLinkPage.enterFromAndToDate(TestData['workorderFromDate'], TestData['workorderToDate'])
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    invoiceLinkPage.verifylinkedWorkOrderlabel();
    invoiceLinkPage.clickOnFirstWOLinkFromSearchResult();
    action.smallWait()
    invoiceLinkPage.verifyWOnumberOnDetailPage();
    invoiceLinkPage.selectWorkOrderMatchesInvoiceRadio();
    invoiceLinkPage.clickOnSubmitButton();
    action.smallWait()
    action.waitTillPageLoaded()
    invoiceLinkPage.clickToOverRideFleet();
    action.smallWait()
    action.waitTillPageLoaded()
    if (!invoiceBalancePage.getInvoiceBalanceMessage()) {
        assert.fail("Balance message in bottom of page is not getting displayed");
    }
    console.log('-----------Before Balancing---------------------')
    invoiceBalancePage.getInvoiceBalanceDetails();
});
When(/^change Invoice Total to bring the Invoice into Balance and continue$/, () => {
    action.waitTillPageLoaded()
    invoiceBalancePage.clickOnEditAndSetInvoiceTotalToZero()
    console.log('-----------After Balancing---------------------')
    action.waitTillPageLoaded()
    invoiceBalancePage.getInvoiceBalanceMessage();
    var balanceDifference = invoiceBalancePage.getInvoiceBalanceDetails();
    if (balanceDifference > 0) {
        console.log('Invoice is not balanced')

    }
    invoiceBalancePage.clickOnContinueButton()

});
Then(/^Reconcile Page appears$/, () => {
    action.waitTillPageLoaded()
    invoiceReconcilePage.verifyReconcilePage()
});
Then(/^Reconcile Page appears having status as Balanced does not have Unbalance radio button$/, () => {
    action.waitTillPageLoaded()
    invoiceReconcilePage.verifyInvoiceStatusOnReconcilePage()
    invoiceReconcilePage.verifyReconcilePage()
});
Then(/^I can approve invoice$/, () => {
    action.waitTillPageLoaded()
    invoiceReconcilePage.selectApproveRadio()
    invoiceReconcilePage.clickOnSubmitButton()
    action.mediumWait()
    invoiceDistributePage.verifyInvoiceStatusApprovedOnDistributedPage()

});

When(/^I have created Service Invoice and on Link invoice page with list of work orders$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    let TestData = action.getSearchDates();
    invoiceLinkPage.enterFromAndToDate(TestData['workorderFromDate'], TestData['workorderToDate'])
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    invoiceLinkPage.verifylinkedWorkOrderlabel();
});
When(/^Select to delete and confirm$/, () => {
    action.waitTillPageLoaded()
    invoicePage.deleteInvoice()
    console.log('browser.isAlertOpen()=> ' + browser.isAlertOpen())
    console.log('browser.getAlertText() => ' + browser.getAlertText())
    browser.acceptAlert()

});
Then(/^Confirmation of Captured Service Invoice Type deletion shows up$/, () => {
    action.waitTillPageLoaded()
    invoicePage.VerifyConfirmationMessageAfterDeletion()
});

When(/^I have created Service Invoice and on Link invoice page with work orders detail$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    let TestData = action.getSearchDates();
    invoiceLinkPage.enterFromAndToDate(TestData['workorderFromDate'], TestData['workorderToDate'])
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    invoiceLinkPage.verifylinkedWorkOrderlabel();
    invoiceLinkPage.clickOnFirstWOLinkFromSearchResult();
    browser.pause(2000)
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyWOnumberOnDetailPage();


});
When(/^click on Show Parts and Labor Details Link$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.clickOnShowLaborandPartDetailsLink()


});
Then(/^displays page with Parts and Labor section and Hide Detail link gets available$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyHideDetailLink()

});
When(/^Add Notes and choose Save-Then hit Submit Button$/, () => {
    action.waitTillPageLoaded()

    invoiceLinkPage.addNewNote()

});
Then(/^new note is added$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyAddedNote()
});

When(/^Choose Work order matches invoice Link another work order and select continue$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.selectWorkOrderMatchAddAnotherRadio()
    invoiceLinkPage.clickOnContinueButton()
    action.waitTillPageLoaded()
    invoiceLinkPage.clickToOverRideFleet();
    action.waitTillPageLoaded()
});
Then(/^Page with Captured Invoice as Partially Linked and Work Order Search displayed$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyInvoiceStatusPartialLinking()
    invoicePage.verifyWorkOrderSearchPage()
});
When(/^choose a WO that has a different Fleet than the Captured Invoice$/, () => {
    action.waitTillPageLoaded()
    var workorderNumber = invoiceLinkPage.getWorkOrderNumberHavingDifferentFleet()
    invoiceLinkPage.enterWorkOrderNumber(workorderNumber)
    invoiceLinkPage.clickOnSubmitButton()
    action.waitTillPageLoaded()
    invoiceLinkPage.clickOnContinueButton()
    action.waitTillPageLoaded()
});
Then(/^Fleet Override page is displayed$/, () => {
    action.waitTillPageLoaded()

    invoiceLinkPage.verifyOverRideFleetMessage()
});

When(/^Choose Work order does not match invoice Search again Radio Button select continue$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.selectWorkOrderDoesntMatchSearchAgainRadio()
    invoiceLinkPage.clickOnContinueButton()
    action.waitTillPageLoaded()
    invoiceLinkPage.clickToOverRideFleet();
    action.waitTillPageLoaded()
});
When(/^Choose Purchase order does not match Place on Hold Radio Button select continue$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.selectWorkOrderDoesntHoldRadio()
    invoiceLinkPage.selectHoldReasonOnLinking(1)
    invoiceLinkPage.verifyHoldReasonOnLinking()
    action.mediumWait()
    invoiceLinkPage.clickOnContinueButton()
    action.waitTillPageLoaded()

});
Then(/^Invoice status become as On Hold$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyInvoiceStatusOnLinkPage('On Hold')

});
Then(/^I can remove hold as well$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyRemoveHoldRadioOnLinking()
    invoiceLinkPage.selectRemoveHoldRadioOnLinking()
    invoiceLinkPage.clickOnContinueButton()
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyInvoiceStatusOnLinkPage('Partially Linked')


});
Then(/^Work Order Search displayed with invoice status captured$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyInvoiceStatusCaptured()
    invoicePage.verifyWorkOrderSearchPage()
});

When(/^Choose Work order does not match but continue to the invoice Radio Button select continue$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.selectWorkOrderDoesntMatchSearchAgainRadio()
    // invoiceLinkPage.clickOnContinueButton()
    // invoiceLinkPage.clickToOverRideFleet();
});
Then(/^Page with all Details gets displayed$/, () => {

});
When(/^change captured Invoice information with edit button$/, () => {
    action.waitTillPageLoaded()
    invoiceBalancePage.clickOnEditAndEditInvoiceInformation()

});
Then(/^Link page with changes shown$/, () => {
});
Given(/^I am on work order popup window having notes$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    workOrderWithNotes = invoiceLinkPage.fetchWorkOrderNumberHavingNotes();
    console.log('workorder number with notes =>', workOrderWithNotes)
    invoiceLinkPage.enterWorkOrderNumber(workOrderWithNotes);
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    invoiceLinkPage.clickOnViewWorkOrderLink();
    action.waitTillPageLoaded()

});

When(/^Choose View Link Next to the Notes on popup$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyNotesOnWorkOrderPopup(workOrderWithNotes);
});
Then(/^Notes portion of the page is displayed on popup$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyNotesSectionOnWorkOrderPopup()
    browser.closeWindow();
    browser.switchWindow('Submit.do')

});
Given(/^I am on work order popup window while invoice linking$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    let TestData = action.getSearchDates();
    invoiceLinkPage.enterFromAndToDate(TestData['workorderFromDate'], TestData['workorderToDate'])
    console.log("URL before WO search=> " + browser.getUrl())
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    console.log("URL after WO search=> " + browser.getUrl())
    invoiceLinkPage.verifylinkedWorkOrderlabel();
    invoiceLinkPage.clickOnFirstWOLinkFromSearchResult();
    browser.pause(2000)
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyWOnumberOnDetailPage();
    invoiceLinkPage.clickOnViewWorkOrderLink();
    action.waitTillPageLoaded()

});
When(/^click on Show Parts and Labor Details Link on WO popup$/, () => {

    browser.switchWindow('/Display.do')
    console.log('Switch focus to popup window')
    invoiceLinkPage.clickOnShowLaborandPartDetailsLink()
    action.waitTillPageLoaded()


});
Then(/^displays page with Parts and Labor section and Hide Detail link gets available on WO popup$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyHideDetailLinkonPopup()
    browser.closeWindow()
    browser.switchWindow('Link.do')
    console.log('Switched back to main screen')

});

When(/^I sort workorder column on WO number$/, () => {
    action.mediumWait()
    action.waitTillPageLoaded()
    invoiceLinkPage.clickOWorkOrderSort();
    action.mediumWait()
    action.waitTillPageLoaded()
});
Then(/^results are getting sorted by WO number column$/, () => {
    action.waitTillPageLoaded()
    var sorted = invoiceLinkPage.verifyColumnSortingAscending(2);
    assert(sorted === true, "Work order Number column is not sorted ascending")
});
Then(/^I can put hold with reason and remove hold as well$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.selectWorkOrderDoesntHoldRadio()
    invoiceLinkPage.selectHoldReason(1)
    invoiceLinkPage.verifyHoldReason()
    action.mediumWait()
    invoiceLinkPage.clickOnContinueButton()
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyRemoveHoldRadio()
    invoiceLinkPage.selectRemoveHoldRadio()
    invoiceLinkPage.clickOnContinueButton()
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyHoldRemoved()


});
Then(/^I am able to delete invoice$/, () => {
    invoicePage.deleteInvoice()
    console.log('browser.isAlertOpen()=> ' + browser.isAlertOpen())
    console.log('browser.getAlertText() => ' + browser.getAlertText())
    browser.acceptAlert()
    action.waitTillPageLoaded()
    invoicePage.VerifyConfirmationMessageAfterDeletion()

});
When(/^Choose View Link Next to the Work Order Number to view WO$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.clickOnViewWorkOrderLink();
    action.waitTillPageLoaded()

});
When(/^Choose View Link Next to the Work Order Number to view WO on balance page$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.clickOnViewWorkOrderLink();
    action.waitTillPageLoaded()

});
Given(/^I am on balance page with work order having notes$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    workOrderWithNotes = invoiceLinkPage.fetchWorkOrderNumberHavingNotes();
    console.log('workorder number with notes =>', workOrderWithNotes)
    invoiceLinkPage.enterWorkOrderNumber(workOrderWithNotes);
    invoiceLinkPage.clickWorkOrderSubmit();
    browser.pause(2000)
    action.waitTillPageLoaded()
    invoiceLinkPage.selectWorkOrderMatchesInvoiceRadio();
    invoiceLinkPage.clickOnSubmitButton();
    browser.pause(2000)
    action.waitTillPageLoaded()
    invoiceLinkPage.clickToOverRideFleet();
    browser.pause(2000)
    action.waitTillPageLoaded()
    if (!invoiceBalancePage.getInvoiceBalanceMessage()) {
        assert.fail("Balance message in bottom of page is not getting displayed");
    }

});
When(/^Choose View Link Next to the Work Order Number with notes to view WO on balance page$/, () => {
    action.waitTillPageLoaded()
    invoiceBalancePage.clickOnViewWorkOrderWithNotesLink();

});
Then(/^Work Order in pop up window is displayed$/, () => {
    action.waitTillPageLoaded()
    console.log('workOrderWithNotes=>' + workOrderWithNotes)
    invoiceBalancePage.verifyWordkOrderPopupOpensUp(workOrderWithNotes);
});
Then(/^Work Order in pop up window displayed$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyWordkOrderPopupOpensUp();
});


Then(/^I can access notes as well$/, () => {
    action.waitTillPageLoaded()
    invoiceBalancePage.clickOnViewNotes();
    action.waitTillPageLoaded()
    invoiceBalancePage.verifyNotesSection()

});


Then(/^I can access Show Parts and Labor Details Link on workorder popup$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.clickOnShowLaborandPartDetailsLink()
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyHideDetailLinkonPopup()
    action.closePopUpAndSwitchToMainWindow()

});
Then(/^I can put hold with reason on balance page$/, () => {
    action.waitTillPageLoaded()
    invoiceBalancePage.selectHoldRadio()
    invoiceBalancePage.selectHoldReason(1)
    invoiceBalancePage.clickOnContinueButton()
    action.waitTillPageLoaded()
    invoiceBalancePage.verifyHoldReason()

});

Given(/^I am on Balance Page with unbalanced amount$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    let TestData = action.getSearchDates();
    invoiceLinkPage.enterFromAndToDate(TestData['workorderFromDate'], TestData['workorderToDate'])
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    invoiceLinkPage.verifylinkedWorkOrderlabel();
    invoiceLinkPage.clickOnFirstWOLinkFromSearchResult();
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyWOnumberOnDetailPage();
    invoiceLinkPage.selectWorkOrderMatchesInvoiceRadio();
    invoiceLinkPage.clickOnSubmitButton();
    action.waitTillPageLoaded()
    invoiceLinkPage.clickToOverRideFleet();
    browser.pause(3000)
    action.waitTillPageLoaded()
    if (!invoiceBalancePage.getInvoiceBalanceMessage()) {
        assert.fail("Balance message in bottom of page is not getting displayed");
    }
});
Then(/^I can Add "([^"]*)?" invoice line item$/, (invoiceType) => {
    action.waitTillPageLoaded()
    invoiceBalancePage.clickOnfirstZbutton()
    //browser.debug()
    browser.switchWindow('/OrderLineBalanceDisplay.do')
    action.mediumWait()
    action.waitTillPageLoaded()
    invoiceBalancePage.verifyEditLineUpItemPopupOpen()
    var existingLineItems = invoiceBalancePage.getCountOfExistingLineItems()
    invoiceBalancePage.clickOnAddLineItemButton()
    action.waitTillPageLoaded()
    invoiceBalancePage.addLineItemForTaxes(existingLineItems)
    invoiceBalancePage.clickOnsaveAndCloseButton(invoiceType)

});
When(/^choose to edit "([^"]*)?" invoice line item$/, (invoiceType) => {
    action.waitTillPageLoaded()
    invoiceBalancePage.clickOnfirstMiscZbutton()
    browser.switchWindow('/OrderLineBalanceDisplay.do')
    action.mediumWait()
    action.waitTillPageLoaded()
    invoiceBalancePage.verifyEditLineUpItemPopupOpen()
    var existingLineItems = invoiceBalancePage.getCountOfExistingLineItems()
    invoiceBalancePage.clickOnAddLineItemButton()
    action.waitTillPageLoaded()
    invoiceBalancePage.addLineItemForTaxes(existingLineItems)
    invoiceBalancePage.clickOnsaveAndCloseButton(invoiceType)

});

Then(/^Balance Page with saved changes to invoice Line Item shown$/, () => {
    browser.switchWindow('/BalanceDisplay.do')
    action.waitTillPageLoaded()
    invoiceBalancePage.verifyAddedLineItem()

});
Then(/^I can add status comment$/, () => {
    action.waitTillPageLoaded()
    invoiceBalancePage.addNewNote()
    action.waitTillPageLoaded()
    invoiceBalancePage.verifyAddedNote()
});
When(/^I am on Reconcile Page$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    let TestData = action.getSearchDates();
    invoiceLinkPage.enterFromAndToDate(TestData['workorderFromDate'], TestData['workorderToDate'])
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    //invoiceLinkPage.verifylinkedWorkOrderlabel(); Observation
    invoiceLinkPage.clickOnFirstWOLinkFromSearchResult();
    action.smallWait()
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyWOnumberOnDetailPage();
    invoiceLinkPage.selectWorkOrderMatchesInvoiceRadio();
    invoiceLinkPage.clickOnSubmitButton();
    action.smallWait()
    action.waitTillPageLoaded()
    invoiceLinkPage.clickToOverRideFleet();
    action.smallWait()
    action.waitTillPageLoaded()
    if (!invoiceBalancePage.getInvoiceBalanceMessage()) {
        assert.fail("Balance message in bottom of page is not getting displayed");
    }
    console.log('-----------Before Balancing---------------------')
    invoiceBalancePage.getInvoiceBalanceDetails();
    invoiceBalancePage.clickOnEditAndSetInvoiceTotalToZero()
    console.log('-----------After Balancing---------------------')
    action.waitTillPageLoaded()
    invoiceBalancePage.getInvoiceBalanceMessage();
    var balanceDifference = invoiceBalancePage.getInvoiceBalanceDetails();
    if (balanceDifference > 0) {
        console.log('Invoice is not balanced')

    } else {
        console.log('Invoice is balanced')
    }
    invoiceBalancePage.clickOnContinueButton()
    action.waitTillPageLoaded()
    invoiceReconcilePage.verifyReconcilePage()

});
When(/^Select Approve Invoice in User Options and click on submit$/, () => {
    action.waitTillPageLoaded()
    invoiceReconcilePage.selectApproveRadio()
    invoiceReconcilePage.clickOnSubmitButton()
    action.waitTillPageLoaded()
});
Then(/^Distribute page appears$/, () => {
    action.waitTillPageLoaded()
    invoiceDistributePage.verifyDistributePage()

});
Then(/^I can change Balanced Invoice information with edit button$/, () => {
    action.waitTillPageLoaded()
    invoiceReconcilePage.clickOnEditAndEditInvoiceInformation()

});
Then(/^delete invoice on reconcile page$/, () => {
    action.waitTillPageLoaded()
    invoicePage.deleteInvoice()
    console.log('browser.isAlertOpen()=> ' + browser.isAlertOpen())
    console.log('browser.getAlertText() => ' + browser.getAlertText())
    browser.acceptAlert()
    invoicePage.VerifyConfirmationMessageAfterDeletion()

});

When(/^I am on Reconcile Page with Open workorder$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    workOrderWithNotes = invoiceLinkPage.fetchWorkOrderNumberHavingNotes();
    console.log('workorder number with notes =>', workOrderWithNotes)
    invoiceLinkPage.enterWorkOrderNumber(workOrderWithNotes);
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    invoiceLinkPage.selectWorkOrderMatchesInvoiceRadio();
    invoiceLinkPage.clickOnSubmitButton();
    action.smallWait()
    action.waitTillPageLoaded()
    invoiceLinkPage.clickToOverRideFleet();
    action.smallWait()
    action.waitTillPageLoaded()
    if (!invoiceBalancePage.getInvoiceBalanceMessage()) {
        assert.fail("Balance message in bottom of page is not getting displayed");
    }
    console.log('-----------Before Balancing---------------------')
    invoiceBalancePage.getInvoiceBalanceDetails();
    invoiceBalancePage.clickOnEditAndSetInvoiceTotalToZero()
    console.log('-----------After Balancing---------------------')
    action.waitTillPageLoaded()
    invoiceBalancePage.getInvoiceBalanceMessage();
    var balanceDifference = invoiceBalancePage.getInvoiceBalanceDetails();
    if (balanceDifference > 0) {
        console.log('Invoice is not balanced')

    } else {
        console.log('Invoice is balanced')
    }
    invoiceBalancePage.clickOnContinueButton()
    action.waitTillPageLoaded()
    invoiceReconcilePage.verifyReconcilePage()

});

When(/^I am on Reconcile Page with notes$/, () => {
    loginPage.openURL();
    loginPage.login()
    loginPage.verifylogin();
    homePage.openInvoiceCapture();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyInvoiceCapturePage()) {
        assert.fail('Invoice Capture page is not displayed');
    }
    invoicePage.enterServiceInvoiceDetailsWithoutWorkOrder();
    invoicePage.clickInvoiceCaptureSubmit();
    action.waitTillPageLoaded()
    if (!invoicePage.verifyWorkOrderSearchPage()) {
        assert.fail('Workorder Search Page is not displayed');
    }
    invoiceLinkPage.clickOnResetButton();
    workOrderWithNotes = invoiceLinkPage.fetchWorkOrderNumberHavingNotes();
    console.log('workorder number with notes =>', workOrderWithNotes)
    invoiceLinkPage.enterWorkOrderNumber(workOrderWithNotes);
    invoiceLinkPage.clickWorkOrderSubmit();
    action.waitTillPageLoaded()
    invoiceLinkPage.selectWorkOrderMatchesInvoiceRadio();
    invoiceLinkPage.clickOnSubmitButton();
    action.smallWait()
    action.waitTillPageLoaded()
    invoiceLinkPage.clickToOverRideFleet();
    action.smallWait()
    action.waitTillPageLoaded()
    if (!invoiceBalancePage.getInvoiceBalanceMessage()) {
        assert.fail("Balance message in bottom of page is not getting displayed");
    }
    console.log('-----------Before Balancing---------------------')
    invoiceBalancePage.getInvoiceBalanceDetails();
    invoiceBalancePage.clickOnEditAndSetInvoiceTotalToZero()
    console.log('-----------After Balancing---------------------')
    action.waitTillPageLoaded()
    invoiceBalancePage.getInvoiceBalanceMessage();
    var balanceDifference = invoiceBalancePage.getInvoiceBalanceDetails();
    if (balanceDifference > 0) {
        console.log('Invoice is not balanced')

    } else {
        console.log('Invoice is balanced')
    }
    invoiceBalancePage.clickOnContinueButton()
    action.waitTillPageLoaded()
    invoiceReconcilePage.verifyReconcilePage()

});
Then(/^I can access view link to see Work Order in pop up window$/, () => {
    action.waitTillPageLoaded()
    invoiceReconcilePage.clickOnViewWorkOrderLink();
    browser.pause(2000)
    action.waitTillPageLoaded()
    invoiceReconcilePage.verifyWordkOrderWithNotesPopupOpensUp(workOrderWithNotes);
});
Then(/^I can access notes on work order popup window$/, () => {
    action.waitTillPageLoaded()
    invoiceLinkPage.verifyNotesSectionOnWorkOrderPopup()
    browser.closeWindow();
    browser.switchWindow('ReconcileDisplay.do')
});
Then(/^I can access Labor and Part Detail link on work order popup window$/, () => {
    action.waitTillPageLoaded()
    invoiceReconcilePage.clickOnViewWorkOrderLink();
    browser.switchWindow('/Display.do')
    invoiceLinkPage.clickOnShowLaborandPartDetailsLink()
    invoiceLinkPage.verifyHideDetailLinkonPopup()
    browser.closeWindow()
    browser.switchWindow('ReconcileDisplay.do')

});
Then(/^Reconcile Page with saved changes to invoice Line Item shown$/, () => {
    browser.switchWindow('ReconcileDisplay')
    action.waitTillPageLoaded()
    invoiceBalancePage.verifyAddedLineItem()

});
When(/^On Reconcile page,choose to edit "([^"]*)?" invoice line item$/, (invoiceType) => {
    action.waitTillPageLoaded()
    invoiceBalancePage.clickOnfirstMiscZbutton()
    browser.switchWindow('OrderLineReconcileDisplay')
    invoiceBalancePage.verifyEditLineUpItemPopupOpen()
    action.waitTillPageLoaded()
    var existingLineItems = invoiceBalancePage.getCountOfExistingLineItems()
    invoiceBalancePage.clickOnAddLineItemButton()
    action.waitTillPageLoaded()
    invoiceBalancePage.addLineItemForTaxes(existingLineItems)
    invoiceBalancePage.clickOnsaveAndCloseButton(invoiceType)

});

Then(/^I can put hold with reason on reconcile page$/, () => {
    action.waitTillPageLoaded()
    invoiceReconcilePage.selectHoldRadio()
    invoiceReconcilePage.selectHoldReason(1)
    invoiceReconcilePage.clickOnSubmitButton()
    action.waitTillPageLoaded()
    invoiceReconcilePage.verifyHoldReason()

});

Then(/^I can add status comment on reconcile page$/, () => {
    action.waitTillPageLoaded()
    invoiceReconcilePage.addNewNote()
    action.waitTillPageLoaded()
    invoiceReconcilePage.verifyAddedNote()
});
Then(/^I can put Work Order in on Hold State by using Unbalance Invoice Radio Button$/, () => {
    action.waitTillPageLoaded()
    invoiceReconcilePage.selectUnbalanceInvoiceRadio()
    action.waitTillPageLoaded()
    invoiceReconcilePage.clickOnSubmitButton()
    action.waitTillPageLoaded()
    invoiceReconcilePage.verifyBalancePage()

});




