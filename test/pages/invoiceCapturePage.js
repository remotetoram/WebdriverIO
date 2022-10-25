import { action } from '../support/user.command';
var chai = require('chai');
var assert = chai.assert;
import { getUninqueNumber } from '../../util/commonUtilities';
/*-----------------Service Invoice locators------------------------*/
const invoiceType = '[name="value(invoiceType)"]';
const invoiceNumber = '[name="value(invoiceNumber)"]';
const invoicePrimaryNumber = '[name="value(primaryNumber)"]';
const invoiceDate = '[name="invoiceDate"]';
const repairingVendorNameInput = '[name="input1"]';
const remitToVendor = '[name="remitToVendor"]';
const invoiceTotal = '[name="value(invoiceTotal)"]';
const salesOrderNumber = '[name="value(salesOrderNumber)"]';
const workorderNumber = '[name="value(primaryNumber)"]';
const fleetAssignmentSelect = '[name="fleetAssignment"]';
const companyNameSelect = '[name="companyName"]';
const receivedDate = '[name="receivedDate"]';
const vendor = '[name="vendor"]';
const submitInvoice = '[type="submit"]';
const resetInvoice = '[type="reset"]';
const deleteButton ='=Delete'
const deleteConfirmationMessage='/html/body/div[6]/li'
/*--------------------error messages-------------------------------------*/
const validInvoiceNumberRequiredErr = "//font/b/ul/li[1]";
const invoiceDateRequiredErr = "//font/b/ul/li[2]";
const totalInvoiceAmountRequiredErr = "//font/b/ul/li[3]";
const dateInvoiceWasReceivedIsrequiredErr = "//font/b/ul/li[4]";
const vendorNameIsRequiredErr = "//font/b/ul/li[5]";
const remitToVendorIsRequiredErr = "//font/b/ul/li[6]";
const selectInvoiceTypeErr = "//font/b/ul/li[7]";
const selectFleetAssignmentErr = "//font/b/ul/li[8]";

const memoInvoiceDateRequiredErr = "//font/b/ul/li[1]";
const memoTotalInvoiceAmountRequiredErr = "//font/b/ul/li[2]";
const mamoDateInvoiceWasReceivedIsrequiredErr = "//font/b/ul/li[3]";
const memoVendorNameIsRequiredErr = "//font/b/ul/li[4]";
const memoRemitToVendorIsRequiredErr = "//font/b/ul/li[5]";
const memoSelectFleetAssignmentErr = "//font/b/ul/li[6]";
const memoNumber='//font/b/ul/li[7]'
/*--------------------Purchase Order/workorder/ Search page-------------*/

const purchaseOrderNo = '[name="purchaseOrderNo"]';
const linkingMemoLabel = '//tbody/tr/td[1]/table/tbody/tr[1]/td/div/strong';
const workorderSearchInput = "/html/body/table[4]/tbody/tr/td[1]/form/table/tbody/tr[1]/th/div"

/*---------------------Error messages----------------*/


class InvoicePage {

  deleteInvoice(){
    action.click(deleteButton)
  }
  VerifyConfirmationMessageAfterDeletion(){
    assert($(deleteConfirmationMessage).getText().includes('has been successfully deleted'))
    console.log('Confirmation message has been verified')
  }

  readServiceInvoiceCaptureTestData() {
    // import the fs module
    const fs = require('fs');
    // read the file into raw data
    let rawdata = fs.readFileSync('./test-data/serviceInvoiceCapture.json');
    // parse the raw data into meaningful JSON format
    let TestData = JSON.parse(rawdata);
    console.log(TestData["Invoice Number"]);
    return TestData;

  }

  readPartsInvoiceCaptureTestData() {
    // import the fs module
    const fs = require('fs');
    // read the file into raw data
    let rawdata = fs.readFileSync('./test-data/partsInvoiceCapture.json');
    // parse the raw data into meaningful JSON format
    let TestData = JSON.parse(rawdata);
    console.log(TestData["Invoice Number"]);
    return TestData;

  }
  readCreditMemoCaptureTestData() {
    // import the fs module
    const fs = require('fs');
    // read the file into raw data
    let rawdata = fs.readFileSync('./test-data/creditMemoCapture.json');
    // parse the raw data into meaningful JSON format
    let TestData = JSON.parse(rawdata);
    console.log(TestData["Memo Number"]);
    return TestData;

  }
  readDebitMemoCaptureTestData() {
    // import the fs module
    const fs = require('fs');
    // read the file into raw data
    let rawdata = fs.readFileSync('./test-data/debitMemoCapture.json');
    // parse the raw data into meaningful JSON format
    let TestData = JSON.parse(rawdata);
    console.log(TestData["Memo Number"]);
    return TestData;

  }
  enterPartsInvoiceDetailsWithoutOrderNumber() {
    browser.pause(1000); //just to make difference invoice number
    var today = new Date();
    let invoiceNumberAuto = getUninqueNumber();
    let TestData = this.readPartsInvoiceCaptureTestData();
    action.selectByVisibleText(invoiceType, TestData["Invoice Type"]);
    action.setValue(invoiceNumber, invoiceNumberAuto);
    action.setValue(invoiceDate, TestData["Invoice Date"]);
    action.selectByVisibleText(vendor, TestData["Vendor Name"]);
    action.setValue(remitToVendor, TestData["Remit To Vendor"]);
    action.setValue(invoiceTotal, TestData["Invoice Total"]);
    action.setValue(workorderNumber, '');
    action.selectByVisibleText(fleetAssignmentSelect, TestData["Fleet Assignment"]);
    action.setValue(receivedDate, TestData["Received Date"]);
    return invoiceNumberAuto;
  }
  enterCreditMemoDetails() {
    browser.pause(1000); //just to make difference invoice number
    var today = new Date();
    let memoNumberAuto = getUninqueNumber();
    let TestData = this.readCreditMemoCaptureTestData();
    action.selectByVisibleText(invoiceType, TestData["Invoice Type"]);
    action.setValue(invoiceDate, TestData["Memo Date"]);
    action.selectByVisibleText(vendor, TestData["Vendor Name"]);
    action.setValue(remitToVendor, TestData["Remit To Vendor"]);
    action.setValue(invoiceTotal, TestData["Memo Total"])
    action.setValue(invoicePrimaryNumber, memoNumberAuto);
    action.selectByVisibleText(fleetAssignmentSelect, TestData["Fleet Assignment"]);
    action.setValue(receivedDate, TestData["Received Date"]);
    browser.pause(5000);
    return memoNumberAuto
  }
  enterDebitMemoDetails() {
    browser.pause(1000); //just to make difference invoice number
    var today = new Date();
    let memoNumberAuto = getUninqueNumber()
    let TestData = this.readDebitMemoCaptureTestData();
    action.selectByVisibleText(invoiceType, TestData["Invoice Type"]);
    action.setValue(invoiceDate, TestData["Memo Date"]);
    action.selectByVisibleText(vendor, TestData["Vendor Name"]);
    action.setValue(remitToVendor, TestData["Remit To Vendor"]);
    action.setValue(invoiceTotal, TestData["Memo Total"])
    action.setValue(invoicePrimaryNumber, memoNumberAuto);
    action.selectByVisibleText(fleetAssignmentSelect, TestData["Fleet Assignment"]);
    action.setValue(receivedDate, TestData["Received Date"]);
    browser.pause(5000);
    return memoNumberAuto
  }


  verifyErrorMessages() {
    assert($(validInvoiceNumberRequiredErr).getText() === "A valid invoice number is required.", 'A valid invoice number is required :error message not coming');
    assert($(invoiceDateRequiredErr).getText() === "An invoice date is required.", 'An invoice date is required. :error message not coming');
    assert($(totalInvoiceAmountRequiredErr).getText() === "The total invoice amount is required.", 'The total invoice amount is required. :error message not coming');
    assert($(dateInvoiceWasReceivedIsrequiredErr).getText() === "The date the invoice was received is required.", 'The date the invoice was received is required. :error message not coming');
    assert($(vendorNameIsRequiredErr).getText() === "A valid vendor name is required.", 'A valid vendor name is required.. :error message not coming');
    assert($(remitToVendorIsRequiredErr).getText() === "A remit to vendor is required.", 'A remit to vendor is required. :error message not coming');
    assert($(selectInvoiceTypeErr).getText() === "Select an invoice type.", 'Select an invoice type. :error message not coming');
    assert($(selectFleetAssignmentErr).getText() === "Select a Fleet Assignment.", 'Select a Fleet Assignment. :error message not coming');
  }
  verifyCreditMemoErrorMessages() {
    assert($(memoInvoiceDateRequiredErr).getText() === "An invoice date is required.", 'An invoice date is required. :error message not coming');
    assert($(memoTotalInvoiceAmountRequiredErr).getText() === "The total invoice amount is required.", 'The total invoice amount is required. :error message not coming');
    assert($(mamoDateInvoiceWasReceivedIsrequiredErr ).getText() === "The date the invoice was received is required.", 'The date the invoice was received is required. :error message not coming');
    assert($(memoVendorNameIsRequiredErr).getText() === "A valid vendor name is required.", 'A valid vendor name is required.. :error message not coming');
    assert($(memoRemitToVendorIsRequiredErr).getText() === "A remit to vendor is required.", 'A remit to vendor is required. :error message not coming');
    assert($(memoSelectFleetAssignmentErr).getText() === "Select a Fleet Assignment.", 'Select a Fleet Assignment. :error message not coming');
    assert($(memoNumber).getText() === "When entering a memo type of invoice you must provide a memo number. If you don't see a memo number field choose a different type of invoice from the drop down and then reselect Debit Memo or Credit Memo.", 'When entering a memo type of invoice you must provide a memo number. If you dont see a memo number field choose a different type of invoice from the drop down and then reselect Debit Memo or Credit Memo. :error message not coming');
   
     }



  verifyResetFields() {
    var noResetFields = "";
    if (!($(invoiceNumber).getText() === "")) {
      noResetFields += "Invoice Number field is not resetting";
    }
    if (!($(invoiceType).getValue() === "SelectOne")) {
      noResetFields += "/Invoice Type field is not resetting"
    }
    if (!($(invoiceDate).getText() === "")) {
      noResetFields += "/Invoice Date field is not resetting"
    }
    if (!($(vendor).getValue() === "SelectOne")) {
      this.noResetFields += "/Repairing Vendor field is not resetting"
    }
    if (!($(invoiceTotal).getValue() === "")) {
      noResetFields += "/Invoice Total field is not resetting"
    }
    if (!($(receivedDate).getValue() === "")) {
      noResetFields += "/Receive Date field is not resetting"
    }
    console.log('noResetFields final =>' + noResetFields)
    assert(noResetFields === "", noResetFields);

  }
  verifyCreditMemoResetFields() {
    var noResetFields = "";
    if (!($(invoiceType).getValue() === "SelectOne")) {
      noResetFields += "Invoice Type field is not resetting"
    }
    if (!($(invoiceDate).getText() === "")) {
      noResetFields += "/Memo Date field is not resetting"
    }
    if (!($(vendor).getValue() === "SelectOne")) {
      this.noResetFields += "/Repairing Vendor field is not resetting"
    }
    if (!($(invoiceTotal).getValue() === "")) {
      noResetFields += "Memo Total field is not resetting"
    }
    if (!($(invoicePrimaryNumber, ).getText() === "")) {
      noResetFields += "Memo Number field is not resetting";
    }
    if (!($(receivedDate).getValue() === "")) {
      noResetFields += "/Receive Date field is not resetting"
    }
    console.log('noResetFields on  creadit memo page =>' + noResetFields)
    assert(noResetFields === "", noResetFields);

  }


  verifyInvoiceCapturePage() {
    if (action.isPresent(invoiceType)) {
      return true;
    } else {
      return false;
    }
  }

 

  enterServiceInvoiceDetailsWithoutWorkOrder() {
    let invoiceNumberAuto=getUninqueNumber();
    let TestData = this.readServiceInvoiceCaptureTestData();
    action.selectByVisibleText(invoiceType, TestData["Invoice Type"]);
    action.setValue(invoiceNumber, invoiceNumberAuto);
    action.setValue(invoiceDate, TestData["Invoice Date"]);
    action.selectByVisibleText(vendor, TestData["Vendor Name"]);
    action.setValue(remitToVendor, TestData["Remit To Vendor"]);
    action.setValue(invoiceTotal, TestData["Invoice Total"]);
    action.setValue(workorderNumber, '');
    action.selectByVisibleText(fleetAssignmentSelect, TestData["Fleet Assignment"]);
    action.setValue(receivedDate, TestData["Received Date"]);

  }
  enterWrongReceiveDate() {
    var invoiceDateValue = new Date($(invoiceDate).getValue());
    console.log('invoiceDate Value =>' + invoiceDateValue);
    var receiveDateValue = ('0' + (invoiceDateValue.getMonth() + 1)).slice(-2) + "/" + ('0' + (invoiceDateValue.getDate() - 1)).slice(-2) + "/" + invoiceDateValue.getFullYear();
    console.log('receiveDateValue =>' + receiveDateValue);
    action.setValue(receivedDate, receiveDateValue)
    browser.pause(1000);

  }
  verifyReceiveDateEarlierThanInvoiceDateErrorMessage() {

    assert($(validInvoiceNumberRequiredErr).getText() === "The invoice date must be before the received date.", 'The invoice date must be before the received date.:error message not coming');
  }

  clickInvoiceCaptureSubmit() {
    action.click(submitInvoice)
    browser.pause(1000)
  }

  clickInvoiceCaptureReset() {
    action.click(resetInvoice)
    browser.pause(1000)
  }
  
  verifyPurchaseOrderSearchPage() {
    if (action.isPresent(purchaseOrderNo)) {
      return true;
    } else {
      return false;
    }
  }
  verifyMemoPage() {
    if ($(linkingMemoLabel).getText().includes('Currently Linking Memo')) {
      return true;
    } else {
      return false;
    }
  }
 
  verifyWorkOrderSearchPage() {
    if (action.isPresent(workorderSearchInput)) {
      return true;
    } else {
      return false;
    }
  }
  selectCreditMemo() {
    action.selectByVisibleText(invoiceType,"Credit Memo")
  }
  resetRemitToVendor() {
    action.setValue(remitToVendor,'');
    action.selectByVisibleText(fleetAssignmentSelect,'SelectOne');
  }
}
export const invoicePage = new InvoicePage();