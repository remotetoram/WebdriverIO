import { action } from '../support/user.command';
import { executeSQLquery, getSQLdata, convertToUIdate, recordCount, verifyDBcredential } from '../../util/sqlExecute';

var chai = require('chai');
var assert = chai.assert;
const deleteClaim='=Delete'
const claimSearchInput = '[name="claimNbr"]';
const fromDate = '[name="fromFiledDate"]';
const toDate = '[name="toFiledDate"]';
const repairingVendor = '[name="input1"]';
const workorderNumber = '[name="workOrderNo"]';
const invoiceNo = '[name="invoiceNo"]';
const claimType = '[name="claimTypeId"]';
const claimStatus = '[name="claimStatusId"]';

const search = '[type="submit"]';
const resetButton = '[value="Reset"]';
const errorOnSearch = '//span/font/b'
const openClaimNumberLabel='//table[4]/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr[1]/td[2]'
const invoicesTotalRows = "//table//table/tbody/tr/td[1]/div";
const errorMessage = "/html/body/span/font/b/ul/li"
const claimNumberToOpen = '//table[4]/tbody/tr/td/table/tbody/tr[2]/td[2]/div'

const firstLink = '//table[4]/tbody/tr/td/table/tbody/tr[2]/td[1]/div/a'
const searchResultsTitle = '//table[3]/tbody/tr/td'
const viewWorkOrderNumberLink = '//table[4]/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr[7]/td/table/tbody/tr[3]/td[2]/a'
const workOrderNumberOnPopup = '//table[3]/tbody/tr[1]/td[1]/table/tbody/tr[1]/td[2]/strong'
const claimTotalRows = '//table[4]/tbody/tr/td/table/tbody/tr/td[2]'
const claimStatusLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[4]'
const claimStatusInvoice='//table/tbody/tr/td[2]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[4]'
const claimStatusCaptured='//table[2]/tbody/tr/td[2]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[4]'
const claimStatusPartiallyLinked='//table[2]/tbody/tr/td[2]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[4]'
const claimNumberLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[3]/td/table/tbody/tr[1]/td[2]'
const claimHeader = '//html/body/form/table/tbody/tr/td[2]/table/tbody/tr[1]/td'
const claimHeaderAnother='//table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td'
const deleteConfirmationMessage = '/html/body/div[6]/li'
/******************Variables*********************/

var claimNumberToVerify
var workOrderNumberToVerifyOnPopup


class claimSearchClass {
  deleteClaim() {
    action.click(deleteClaim)
  }
  VerifyConfirmationMessageAfterDeletion() {
    assert($(deleteConfirmationMessage).getText().includes('has been successfully deleted'))
  }
  verifyClaimNumber(claimNumber) {
    assert($(claimNumberLabel).getText().includes(claimNumber), 'Search claim number is not matching with opened claim')
    console.log("Search claim number is atching with opened claim =>" + claimNumber)
  }

  clickOnlinkedWorkOrderNumberLink() {
    workOrderNumberToVerifyOnPopup = $(viewWorkOrderNumberLink).getText();
    console.log("Work Ordernumber to verify on Popup=>" + workOrderNumberToVerifyOnPopup)
    action.click(viewWorkOrderNumberLink)
    console.log('Clicked to open linked work order')
  }
  verifyWordkOrderPopupOpensUp() {
    browser.switchWindow('/Display.do')
    assert($(workOrderNumberOnPopup).getText().includes(workOrderNumberToVerifyOnPopup), 'Work Order number on popup window is not matching')
    console.log('Work Order number popup has been verified')
    browser.pause(1000);
    browser.closeWindow();
    browser.switchWindow('/View.do')
  }
  verifyIfSingleResultComes() {
    if (action.isPresent(claimHeader)) {
      if ($(claimHeader).getText().includes('Claim Header')) {
        return true
      }
    }
     
    if (action.isPresent(claimHeaderAnother)) {
      if ($(claimHeaderAnother).getText().includes('Claim Header')) {
        return true
      }
    }
    return false


  }
  verifySearchingResultsAppear() {
    this.verifyClaimResultAppeared();
    assert($(searchResultsTitle).getText().includes('Claim Search Results'), 'Claim search does not show any Results,Please check criteria')
    console.log('Claim search results appeared')
  }
  VerifyCorrectStatusInSearchResult(status) {
    const elements = $$(claimTotalRows);
    var columnData = new Array(elements.length)
    console.log("Number of results =>")
    console.log(elements.length)
    /* Starting from 2nd row as first row is table header*/
    for (var i = 2; i <= elements.length + 1; i++) {
      var element = $("//table[4]/tbody/tr/td/table/tbody/tr[" + i + "]/td[3]/div");
      var statusInColumn = element.getText();
      assert(statusInColumn.includes(status), "In results there are items which are not having correct status")
    }
    console.log("In result,status are coming correct")
  }
  clickOnFirstLinkFromClaimsSearchResult() {
    if (!action.isPresent(claimNumberToOpen)) {
      assert(false,'Search results are not having any result row')
    }
    claimNumberToVerify = $(claimNumberToOpen).getText();
    console.log("Claim number to verify =>" + claimNumberToVerify)
    action.click(firstLink);
    action.mediumWait()
  }
  verifyStatusOfClaim(status) {
    console.log("Verifying Claim status on page as =>" + status)
    assert($(claimStatusLabel).getText().includes(status), 'Claim status on page is not matching')
    console.log("Claim status on page has been verified as =>" + status)

  }
  getClaimNumber(){
    var claimNumber = $(openClaimNumberLabel).getText()
     return claimNumber
  }
  verifyclaimStatusPartiallyLinked() {
    console.log("Verifying Claim status on page as => Partially Linked")
     assert($(claimStatusPartiallyLinked).getText().includes('Partially Linked'), 'Claim status on page is not matching')
    console.log("Validated Claim status on page as => Partially Linked")
  }

  verifyInvoiceClaimStatusPartiallyLinked() {
    console.log("Verifying Claim status on page as => Partially Linked")
    const invoiceClaimStatusPartiallyLinked='//table/tbody/tr/td[2]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[4]'
    assert($(invoiceClaimStatusPartiallyLinked).getText().includes('Partially Linked'), 'Claim status on page is not matching')
    console.log("Validated Claim status on page as => Partially Linked")

  }
  
  verifyclaimStatusCaptured() {
    console.log("Verifying Claim status on page as => Captured")
    assert($(claimStatusCaptured).getText().includes('Captured'), 'Claim status on page is not matching')
    console.log("Validated Claim status on page as => Captured")

  }
  verifyclaimStatusCapturedForInvoice() {
    console.log("Verifying Claim status on page as => Captured")
    assert($(claimStatusInvoice).getText().includes('Captured'), 'Claim status on page is not matching')
    console.log("Validated Claim status on page as => Captured")

  }
  
  selectClaimTypeAndStatus(claim, status) {
    action.selectByVisibleText(claimType, claim)
    action.selectByVisibleText(claimStatus, status)
  }

  verifyClaimsSearchPage() {
    if (action.isPresent(claimSearchInput)) {
      return true;
    } else {
      return false;
    }
  }
  clickOnResetButton() {
    action.click(resetButton);
  }
  enterFromAndToDate(fromDatevalue, toDatevalue) {
    this.clickOnResetButton();
    action.setValue(fromDate, fromDatevalue);
    action.setValue(toDate, toDatevalue);

  }
  clickClaimsSearch() {
    action.click(search)
  }

  enterSearchDataforReset() {
    action.setValue(claimSearchInput, 232323)
    action.setValue(fromDate, '03/01/2019')
    action.setValue(toDate, '03/01/2019')
    action.setValue(repairingVendor, 'xyz')
    action.setValue(workorderNumber, 2000)
    action.setValue(invoiceNo, 2000)
    action.selectByIndex(claimType, 1)
    action.selectByIndex(claimStatus, 1)

  }
  verifyReset() {
    var noResetFields = "";
    if (!($(claimSearchInput).getText() === "")) {
      noResetFields += "Claim Number field is not resetting";
    }
    if (!($(fromDate).getValue() === "")) {
      noResetFields += "/From Date field is not resetting"
    }
    if (!($(toDate).getText() === "")) {
      noResetFields += "/To Date field is not resetting"
    }
    if (!($(repairingVendor).getValue() === "")) {
      this.noResetFields += "/Repairing Vendor field is not resetting"
    }
    if (!($(workorderNumber).getValue() === "")) {
      noResetFields += "/Work order number field is not resetting"
    }
    if (!($(invoiceNo).getValue() === "")) {
      noResetFields += "/Invoice number field is not resetting"
    }
    if (!($(claimType).getValue() === "SelectOne")) {
      this.noResetFields += "/Claim Type field is not resetting"
    }
    if (!($(claimStatus).getValue() === "SelectOne")) {
      this.noResetFields += "/Claim Status field is not resetting"
    }

    console.log('noResetFields final =>' + noResetFields)
    assert(noResetFields === "", noResetFields);
  }
  verifyClaimResultAppeared() {
    if (action.isPresent(errorOnSearch)) {
      console.log('For the selected dates no results appeared, please change date range')
      assert.fail($(errorOnSearch).getText());

    }
  }
  verifyErrorWhileSearchingWithoutFields() {
    var errorElement = $(errorMessage)
    var errorMessageUI = "" + errorElement.getText();
    var errorCheck = "At least one criteria must be chosen";
    assert(errorMessageUI.includes(errorCheck), "Error message:At least one criteria must be chosen for an invoice search not displayed")

  }
  getClaimNumberFromDB() {
    verifyDBcredential();
    const fs = require('fs');
    let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
    let TestData = JSON.parse(rawdata);
    const query = TestData["claimNumber"];
    console.log('Query=>' + query);
    console.log('---------------Starting SQL execution--------');
    browser.call(() => executeSQLquery(query));
    console.log('---------------SQL execution attempted--------');
    var data = getSQLdata();
    var totalRecord = recordCount(data);
    console.log('Record count => ' + totalRecord)
    console.log('Claim Number => ' + data[0][0])
    return data[0][0]
  }
  enterClaimNumber(claimNumber) {
    action.setValue(claimSearchInput, claimNumber)
  }

}

export const claimSearchPage = new claimSearchClass();