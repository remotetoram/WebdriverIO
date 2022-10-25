import { action } from '../support/user.command';
var chai = require('chai');
var assert = chai.assert;
import { getUninqueNumber } from '../../util/commonUtilities';
import { Console } from 'console';
/*-----------------Service Invoice locators------------------------*/
const claimType = '[name="claimType"]';
const ClaimNumber = '[name="claimNbr"]';
const dateFiled = '[name="fileOnDate"]';
const claimVendor = '[name="input1"]';
const claimNOtes = '[name="comments"]';
const submitClaim = '[type="submit"]';
const costApprovalStatus = '[name="value(statusType)"]'
const reviewStatus = '//select[@name="value(reviewType)"]'
const fromDate = '[name="fromDate"]';
const toDate = '[name="toDate"]';
const netJetWorkOrder = '[name="value(netjetswonumber)"]'
const resetButton = '[value="Reset"]';
const errorOnSearch = '//span/font/b/ul/li'
const aircraftTypeSelect = '[name="aircrafts"]';
const resultList = '//table/tbody/tr/td/table/tbody/tr/td[2]/div'
const workOrdernumberFromResult = '//table[2]/tbody/tr/td/table/tbody/tr[2]/td[3]/div'
const firstLinkWorkOrder = '//table[2]/tbody/tr/td/table/tbody/tr[2]/td[2]/div/a'

const workOrderNumberOnPopup = '//table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/strong'
const resetClaim = '[type="reset"]';
const claimNumberRequiredErr = "//font/b/ul/li[1]";
const ClaimTypeRequiredErr = "//font/b/ul/li[2]";
const claimVendorRequiredErr = "//font/b/ul/li[3]";
const errorForNoMatchWO = "//span/font/b/ul/li"
const deleteButton = '=Delete'
const deleteConfirmationMessage = '/html/body/div[6]/li'

const reviewStatusFirstRow = '//radio[@name="lineItems[0].laborTasks[0].reviewStatus"]'
//const setAllApprovedLink = '=Set all line items status to Reviewed'
const setAllApprovedLink = '/html/body/form/table/tbody/tr[1]/td[3]/table/tbody/tr[3]/td[2]/a'
//const setAllClaimsToBeFiled = '=Set all line item status to Claim to be Filed'
const setAllClaimsToBeFiled ='/html/body/form/table/tbody/tr[1]/td[3]/table/tbody/tr[4]/td[2]/a'
const saveButton = '//input[@title="Submit this form. Shortcut key : Alt + S"]'
const statusOfFirstRowStatus = '//table[2]/tbody/tr/td/table/tbody/tr[2]/td[15]/div'
const invoiceStatus = '//select [@name="invStatusTypes"]'

const firstLinkToClaim=  '//tbody/tr/td/table/tbody/tr[2]/td[1]/div/input'
const secondLinkToClaim = '//*[@id="t1l2c0"]/input'
const firstInvoiceNumberFromSearch='//tbody/tr/td/table/tbody/tr[2]/td[3]/div'
const secondInvoiceNumberFromSearch='//tbody/tr/td/table/tbody/tr[3]/td[3]/div'
//table[2]/tbody/tr/td/table
const secondLinkToPartiallyLinkedClaim='//table[2]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[3]/td[1]/div/input'
const claimStatus = '//table/tbody/tr/td[2]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[4]'

const userOptionsLabel = '//table[3]/tbody/tr/td[3]/form/table/tbody/tr[1]/td/div'
const claimHeaderlabel = '//table[3]/tbody/tr/td[1]/table/tbody/tr[1]/td'
const secondClaimHeaderLabel = '//table[3]/tbody/tr/td[2]/table/tbody/tr[3]/td[2]/table/tbody/tr[1]/td[1]/strong'
const woNumberLabel = '//table[3]/tbody/tr/td[2]/table/tbody/tr[1]/td[2]/table/tbody/tr[1]/td[1]/strong'
const workOrderMatchRadio = '//input[@value="matches"]'
const workOrderMatchLinkAnotherRadio = '//input[@value="matchesLinkAgain"]'
const workOrderDoesNotMatchSearchRadio = '//input[@value="doesNotMatch"]'
const workOrderDoesNotMatchButContinueRadio = '//input[@value="doesNotMatchContinue"]'
const claimStatusAfterLinking = '//table[4]/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[4]'
const claimStatusPartiallyLinked = '//table[2]/tbody/tr/td[2]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[4]'
const invoiceClaimStatusPartiallyLinked='//table/tbody/tr/td[2]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[4]'
  
const invoiceNumberLabel='//table[3]/tbody/tr/td[2]/table/tbody/tr[1]/td[2]/table/tbody/tr[3]/td[1]/strong'



const addEditLines = '=Add/Edit Claim Lines'
const hideDetailsLink = '=Hide Details'
const workOrderStateError = '//span/font/b/ul/li'
/*************************************Variable Used************************/
var WOnumberToVerify;

class NewClaimPage {

  verifyFirstInvoiceIsLinked(firstInvoicenumber,secondInvoicenumber){
    var firstInvoicenumberLocator='='+firstInvoicenumber
    var secondInvoicenumberLocator='='+secondInvoicenumber
    console.log("firstInvoicenumberLocator =>"+firstInvoicenumberLocator)
    console.log("secondInvoicenumberLocator =>"+secondInvoicenumberLocator)

    assert(action.isPresent(firstInvoicenumberLocator),'First invoice link is not present so its not linked')
    console.log('First invoice link is present so it looks like linked')

    assert(!action.isPresent(secondInvoicenumberLocator),'Second invoice link is present so its linked')
    console.log('Second invoice link is not present so its not linked')
  }

  verifyWorkOrderStateError() {
    assert($(workOrderStateError).getText().includes("A work order provided to associate with a claim is not in a 'Claim To Be Filed' State"), "Error message:A work order provided to associate with a claim is not in a 'Claim To Be Filed' State")
    console.log("Error Came:A work order provided to associate with a claim is not in a 'Claim To Be Filed' State")
  }

  verifyHideLinkIsEnabled() {
    if (!action.isPresent(hideDetailsLink)) {
      assert.fail('Hide detail link is not visible')
    }
    console.log('Hide detail link is visible')

  }

  clickOnAddEditLines() {
    action.click(addEditLines)
    console.log('clicked on Addd/Edit line link')
  }

  verifyClaimStatusAsLinking() {
    assert($(claimStatusAfterLinking).getText().includes('Linked'), 'Work Order/Invoice Claim status is not coming as Linked')
    console.log('Work Order/Invoice Claim status is coming as Linked')
  }
  verifyClaimStatusAsPartiallyLinked() {
    assert($(claimStatusPartiallyLinked).getText().includes('Partially Linked'), 'Work Order Claim status is not coming as Partially Linked')
    console.log('Work Order Claim status is coming as Partially Linked')
  }
  verifyInvoiceClaimStatusAsPartiallyLinked() {
    assert($(invoiceClaimStatusPartiallyLinked).getText().includes('Partially Linked'), 'Invoice Claim status is not coming as Partially Linked')
    console.log('Invoice Claim status is coming as Partially Linked')
  }
  verifyInvoiceClaimStatusAsCaptured() {
    assert($(invoiceClaimStatusPartiallyLinked).getText().includes('Captured'), 'Invoice Claim status is not coming as Partially Linked')
    console.log('Invoice Claim status is coming as Captured')
  }
  selectWorkOrderMatchRadioButton() {
    action.click(workOrderMatchRadio)
    console.log('Selected radio button Work order matches the Claim')
  }
  selectWorkOrderMatchRadioLinkAnotherButton() {
    action.click(workOrderMatchLinkAnotherRadio)
    console.log('Selected radio button Work order matches the Claim and link another')
  }
  selectWorkOrderDoesNotMatchSearchAgainRadioButton() {
    action.click(workOrderDoesNotMatchSearchRadio)
    console.log('Selected radio button Work order does not matches search again')
  }
  selectWorkOrderDoesNotMatchButContinueRadioButton() {
    action.click(workOrderDoesNotMatchButContinueRadio)
    console.log('Selected radio button Work order does not matches but continue')
  }

  verifyCanNotContinueError() {
    assert($(errorForNoMatchWO).getText().includes('You must have one linked item to continue to balance'), 'Error: You must have one linked item to continue to balance not coming')
    console.log('Error came: You must have one linked item to continue to balance')
  }

  verifyClaimIWOuserOptions() {
    assert($(claimHeaderlabel).getText().includes('Claim Header'), 'Claim table is not shown up')
    console.log('Claim table is shown up')

    assert($(woNumberLabel).getText().includes('Work Order Number'), 'Work Order table is not shown up')
    console.log('Work Order table is shown up')

    assert($(userOptionsLabel).getText().includes('User Options'), 'User Options table is not shown up')
    console.log('User Options table is shown up')
  }

  verifyClaimICuserOptions() {
    assert($(claimHeaderlabel).getText().includes('Claim Header'), 'Claim table is not shown up')
    console.log('Claim table is shown up')
    assert($(userOptionsLabel).getText().includes('User Options'), 'User Options table is not shown up')
    console.log('User Options table is shown up')
    assert($(invoiceNumberLabel).getText().includes('Invoice Number'), 'Work Order table is not shown up')
    console.log('Work Order table is shown up')
   
   }

  verifyClaim2IWOuserOptions() {
    assert($(claimHeaderlabel).getText().includes('Claim Header'), 'Claim table is not shown up')
    console.log('Claim table is shown up')

    assert($(woNumberLabel).getText().includes('Work Order Number'), 'First Work Order table is not shown up')
    console.log('First Work Order table is shown up')

    assert($(secondClaimHeaderLabel).getText().includes('Work Order Number'), 'Second Work Order table is not shown up')
    console.log('Second Work Order table is shown up')

    assert($(userOptionsLabel).getText().includes('User Options'), 'User Options table is not shown up')
    console.log('User Options table is shown up')

  }
  selectfirstLinkToClaim() {
     var firstInvoicenumber=$(firstInvoiceNumberFromSearch).getText()
   
    action.click(firstLinkToClaim)

    console.log('First Link to claim check box checked')
    return firstInvoicenumber
  }

  selectSecondLinkToClaimWhichIsPartiallyLined() {
    var secondInvoicenumber=$(secondInvoiceNumberFromSearch).getText()
    action.click(secondLinkToPartiallyLinkedClaim)
    console.log('Second Link to claim check box checked')
    return secondInvoicenumber
  }
  selectfirstTwoLinkToClaim() {
    action.click(firstLinkToClaim)
    console.log('First Link to claim check box checked')
    console.log("action.isPresent(secondLinkToClaim)=>" + action.isPresent(secondLinkToClaim))
    if (action.isPresent(secondLinkToClaim)) {
      action.click(secondLinkToClaim)
      console.log('Second Link to claim check box checked')
    }
  }

  deleteClaim() {
    action.click(deleteButton)
  }
  VerifyConfirmationMessageAfterDeletion() {
    if(action.isPresent(deleteConfirmationMessage)){
    assert($(deleteConfirmationMessage).getText().includes('has been successfully deleted'),'Delete confirmation messageis not correct')
    }else{
          assert(false,'Delete confirmation message did not show up')
    }
  }

  verifyErrorMessages() {
    var errorMessages = "";
    if (!($(claimNumberRequiredErr).getText() === "Claim Number is required.")) {
      errorMessages += "Claim Number is required. :error message not coming"
    }
    if (!($(ClaimTypeRequiredErr).getText() === "Claim Type is required.")) {
      errorMessages += "/Claim Type is required. :error message not coming"
    }

    if (!($(claimVendorRequiredErr).getText() === "Claim Vendor is required.")) {
      errorMessages += "/Claim Vendor is required. :error message not coming"
    }

    console.log('errorMessages final =>' + errorMessages)
    assert(errorMessages === "", errorMessages);
  }

  clickClaimCaptureReset() {
    action.click(resetClaim)
  }

  verifyResetFields() {
    var noResetFields = "";
    if (!($(claimType).getValue() === "SelectOne")) {
      noResetFields += "Claim Type field is not resetting"
    }
    if (!($(ClaimNumber).getValue() === "")) {
      noResetFields += "/Claim number field is not resetting"
    }

    if (($(dateFiled).getValue() === "")) {
      noResetFields += "/Date Filed field is getting blank"
    }

    if (!($(claimVendor).getValue() === "Select One")) {
      this.noResetFields += "/Claim Vendor field is not resetting"
    }
    if (!($(claimNOtes).getValue() === "")) {
      noResetFields += "/Claim notes field is not resetting"
    }

    console.log('noResetFields final =>' + noResetFields)
    assert(noResetFields === "", noResetFields);

  }


  verifyWordkOrderPopupOpensUp() {
    browser.switchWindow('WOReview.do')
    assert($(workOrderNumberOnPopup).getText().includes(WOnumberToVerify), 'Work Order number on popup window is not matching')
    console.log('Work Order number popup has been verified')
    browser.closeWindow();
    browser.switchWindow('IWOSearch')
  }

  setAllApproved() {
    browser.switchWindow('WOReview.do')
    assert(action.isPresent(setAllApprovedLink), 'Set all line items status to Reviewed link is not present')
    assert($(workOrderNumberOnPopup).getText().includes(WOnumberToVerify), 'Work Order number on popup window is not matching')
    console.log('Work Order number popup has been verified')
    action.click(setAllApprovedLink);
    
    action.mediumWait()
    action.waitTillPageLoaded()
  
    console.log('Set Approved All link has been clicked')
    action.click(saveButton);
    action.mediumWait()
    
    if (action.isPresent(saveButton)){
      action.click(saveButton);
    }
    if (action.isPresent(saveButton)){
      action.click(saveButton);
    }
  
    console.log('Save button has been clicked')
    // assert($(reviewStatusFirstRow).getText().includes('Reviewed'), 'Review status for line item has not been updated to Reviewed')
    browser.switchWindow('IWOSearch')
    action.smallWait()
    action.refresh()
    
  }

  setAllClaimsToBeFiled() {
    browser.switchWindow('WOReview.do')
    assert(action.isPresent(setAllClaimsToBeFiled), 'Set all line item status to Claim to be Filed link is not present')
    assert($(workOrderNumberOnPopup).getText().includes(WOnumberToVerify), 'Work Order number on popup window is not matching')
    console.log('Work Order number on popup has been verified')
    action.click(setAllClaimsToBeFiled);
     action.waitTillPageLoaded()
    console.log('Set All Claims To Be Filed link has been clicked')
    action.click(saveButton);
    action.mediumWait()

    if (action.isPresent(saveButton)){
      action.click(saveButton);
    }
    if (action.isPresent(saveButton)){
      action.click(saveButton);
    }
    
    console.log('Save button has been clicked')
    browser.switchWindow('IWOSearch')
    action.smallWait()
    action.refresh()
  }
  clickOnFirstWOLinkFromSearchResult() {
    WOnumberToVerify = $(workOrdernumberFromResult).getText();
    console.log('Work order number =>' + WOnumberToVerify)
    action.click(firstLinkWorkOrder);
  }
  verifyWorkOrderNotPresentInList() {
    action.wait()
    action.waitTillPageLoaded()
    var newWorkOrder = $(workOrdernumberFromResult).getText();
    console.log("oldWorkOrdernumberBeforeChange=>"+WOnumberToVerify)
    console.log("newWorkOrder=>"+newWorkOrder)
    assert(newWorkOrder != WOnumberToVerify, 'Workorder status has not been updated')
    console.log('Workorder status has been updated')
  }
  // clickOnFirstWOLinkHavingStatusBlankFromSearchResult() {
  //   WOnumberToVerify = $(workOrdernumberFromResult).getText();
  //   console.log('Work order number =>' + WOnumberToVerify)
  //   action.click(firstLinkWorkOrder);
  // }

  selectReviewStatus(status) {
    action.selectByVisibleText(reviewStatus, status)
  }

  verifyErrorMessage() {
    var resultListElement = $$(resultList)
    var resultCount = resultListElement.length
    console.log("resultCount=>" + resultCount)
    assert(resultCount > 1,'Result list does not appear')
    

  }
  verifyResultList() {
    var resultListElement = $$(resultList)
    var resultCount = resultListElement.length
    console.log("resultCount=>" + resultCount)
    assert(resultCount > 1,'Result list does not appear')
    

  }

  selectCostApprovalStatus(status) {
    action.selectByVisibleText(costApprovalStatus, status)
  }
  selectReviewtatus(status) {
    action.selectByVisibleText(reviewStatus, status)
  }

  verifyReviewIWAclaimPage() {
    assert($(reviewIWAclaimLabel).getText().includes('Review Internal Work Orders'), 'Label Review Internal Work Orders is not displayed')
    console.log('Review Internal Work Orders label on search page is present')
  }
  enterIWASearchText() {
    action.setValue(fromDate, '03/01/2019')
    action.setValue(toDate, '03/01/2019')
    action.selectByVisibleText(aircraftTypeSelect, 'CE-560')
    console.log('aircraf value =>' + $(aircraftTypeSelect).getValue())
  }
  clickOnSubmit() {
    action.click(submitClaim)
    browser.pause(1000)
  }
  readClaimCaptureTestData() {
    const fs = require('fs');
    let rawdata = fs.readFileSync('./test-data/workorderClaimCapture.json');
    let TestData = JSON.parse(rawdata);
    return TestData;

  }
  readInvoiceClaimCaptureTestData() {
    const fs = require('fs');
    let rawdata = fs.readFileSync('./test-data/invoiceClaimCapture.json');
    let TestData = JSON.parse(rawdata);
    return TestData;

  }
  enterNewClaimValues() {
    browser.pause(1000); //just to make difference invoice number
    let claimNumberAuto = getUninqueNumber();
    let TestData = this.readClaimCaptureTestData();
    action.selectByVisibleText(claimType, TestData["Claim Type"]);
    action.smallWait()
    action.setValue(ClaimNumber, claimNumberAuto);
    //action.setValue(dateFiled, TestData["Date Filed"]);
    action.setValue(claimVendor, TestData["Claim Vendor"]);
    action.setValue(claimNOtes, TestData["Claim Notes"]);

  }
  enterNewInvoiceClaimValues() {
    browser.pause(1000); //just to make difference invoice number
    let claimNumberAuto = getUninqueNumber();
    let TestData = this.readInvoiceClaimCaptureTestData();
    action.selectByVisibleText(claimType, TestData["Claim Type"]);
    action.setValue(ClaimNumber, claimNumberAuto);
    //action.setValue(dateFiled, TestData["Date Filed"]);
    action.setValue(claimVendor, TestData["Claim Vendor"]);
    action.setValue(claimNOtes, TestData["Claim Notes"]);

  }
  clickOnResetButton() {
    action.click(resetButton);
  }
  enterFromAndToDate(fromDatevalue, toDatevalue) {
    this.clickOnResetButton();
    action.setValue(fromDate, fromDatevalue);
    action.setValue(toDate, toDatevalue);

  }
  clickInvoiceSearch() {
    action.click(search)
  }
  verifyInvoicesearchPage() {
     if (action.isPresent(invoiceStatus)) {
      return true;
    } else {
      return false;
    }
  }

  selectInvoiceStatusOnSearch(status){
      action.selectByVisibleText(invoiceStatus,status)
   }
  verifyClaimStatusOnInvoiceSearch() {

    assert($(claimStatus).getText().includes('Captured'), 'Claim status is not shown as Captured')
    console.log('Claim status is shown as Captured')
  }

   verifyIWAsearchPage() {
    if (action.isPresent(costApprovalStatus)) {
      return true;
    } else {
      return false;
    }
  }
  verifyNewClaimCapturePage() {
    if (action.isPresent(claimType)) {
      return true;
    } else {
      return false;
    }
  }




}
export const newClaimPage = new NewClaimPage();