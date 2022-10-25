import { action } from '../support/user.command';

var chai = require('chai');
var assert = chai.assert;
const invoiceSearchInput = '[name="value(primaryNumber)"]';
const fromDate = '[name="fromDate"]';
const toDate = '[name="toDate"]';
const receiveFromDate = '[name="receiveFromDate"]';
const receiveToDate = '[name="receiveToDate"]';
const invoiceAmtFrom = '[name="fromInvAmtStr"]';
const invoiceAmtTo = '[name="toInvAmtStr"]';
const errorMessage = "/html/body/span/font/b/ul/li"

const search = '[type="submit"]';
const invoicesTotalRows = "//table//table/tbody/tr/td[1]/div";
const resetButton = '[value="Reset"]';
const errorOnSearch = '/html/body/span/font/b/ul/li';
const invoiceNumberSortLink = '//tbody/tr[1]/th[2]/table/tbody/tr/td[1]/a/img'
const invoiceTypeSortLink = '//tbody/tr[1]/th[3]/table/tbody/tr/td[1]/a/img'
const reparairingVendorSortLink = '//tbody/tr[1]/th[5]/table/tbody/tr/td[1]/a/img'
const fleetAssignmentSortLink = '//tbody/tr[1]/th[7]/table/tbody/tr/td[1]/a/img'
const statusSortLink = '//tbody/tr[1]/th[10]/table/tbody/tr/td[1]/a/img'
const invoiceTotaSortLink = '//tbody/tr[1]/th[11]/table/tbody/tr/td[1]/a/img'
const lastUpdateBySortLink = '//tbody/tr[1]/th[12]/table/tbody/tr/td[1]/a/img'
const receivedDateSortLink = '//tbody/tr[1]/th[13]/table/tbody/tr/td[1]/a/img'

const fistInvoiceLink='//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[1]/div/a'

/*-------------------------Memo---------------------------------------------*/
const invoiceTypeSelect= '//*[@id="invoiceType"]/td[1]/select'
const invoiceStatusType='[name="invStatusTypes"]'


class InvoiceSearchClass {

  cliclOnFirstInvoiceFromList(){
    action.waitTillPageLoaded()
    action.click(fistInvoiceLink)
  }
  verifyInvoiceSearchPage() {
    if (action.isPresent(invoiceSearchInput)) {
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
  clickInvoiceSearch() {
    action.click(search)
  }

  verifyInvoicesearchResultsOnDates(fromDate, toDate) {
    if (action.isPresent(errorOnSearch)) {
      assert.fail($(errorOnSearch).getText());

    }
    const elements = $$(invoicesTotalRows);
    console.log("-----number of row elements---------");
    console.log(elements.length);
    /* Starting from 2nd row as first row is table header*/
    for (var i = 2; i <= elements.length + 1; i++) {
      var element = $("//table//table/tbody/tr[" + i + "]/td[4]/div");
      var invoiceDateUI = new Date(element.getText());
      let checkDate = ('0' + (invoiceDateUI.getMonth() + 1)).slice(-2) + "/" + ('0' + invoiceDateUI.getDate()).slice(-2) + "/" + invoiceDateUI.getFullYear();

      if ((checkDate <= toDate) && (checkDate >= fromDate)) {
      } else {
        console.log('Check Date=>' + checkDate + '   FromDate=>' + fromDate + '   toDate=>' + toDate);
        assert.fail('In Results there are records in which Invoice Date=>' + checkDate + ' is not in between FromDate=>' + fromDate + '  and toDate=>' + toDate);
      }
    }
  }

  getColumnValuesFromInvoiceSearchResultTable(column) {
    column = parseInt(column);
    console.log('---inside second method-column ====>' + column)
    const elements = $$(invoicesTotalRows);
    var columnData = new Array(elements.length)
    console.log("-----number of row elements---------");
    console.log(elements.length);
    /* Starting from 2nd row as first row is table header*/
    for (var i = 2; i <= elements.length + 1; i++) {
      var element = $("//table//table/tbody/tr[" + i + "]/td[" + column + "]/div");
      columnData[i - 1] = element.getText();
     
    }
    return columnData;
  }

  verifyColumnSortingAscending(column) {
    column = parseInt(column);
    console.log('---inside first method-column ====>' + column)
    var columnData = this.getColumnValuesFromInvoiceSearchResultTable(column);
    // console.log('-------------------columnData---------------------');
    // console.log(columnData);
    browser.pause(1000);
    var sorted = true;

    for (var i = 0; i < columnData.length - 1; i++) {
      if (columnData[i] > columnData[i + 1]) {
        console.log('[i]  => ' + i);
        console.log('columnData[i]  => ' + columnData[i]);
        console.log('columnData[i + 1])  => ' + columnData[i + 1]);
        sorted = false;
        break;
      }
    }
    return sorted;
  }

  clickOnInvoiceNumberSort() {
    action.click(invoiceNumberSortLink)
  }

  clickOnInvoiceTypeSort() {
    action.click(invoiceTypeSortLink)
  }
  clickOnReparingVendorSort() {
    action.click(reparairingVendorSortLink)
  }


  clickOnFleetAssignmentSort() {
    action.click(fleetAssignmentSortLink)
  }
  clickOnStatusSort() {
    action.click(statusSortLink)
  }
  clickOnInvoiceTotalSort() {
    action.click(invoiceTotaSortLink)
  }
  clickOnLastUpdateBySort() {
    action.click(lastUpdateBySortLink)
  }
  clickOnReceivedDateSort() {
    action.click(receivedDateSortLink)
  }
  enterSearchDataforReset() {
    action.setValue(invoiceSearchInput, 232323)
    action.setValue(fromDate, '03/01/2019')
    action.setValue(toDate, '03/01/2019')
    action.setValue(receiveFromDate, '03/01/2019')
    action.setValue(receiveToDate, '03/01/2019')
    action.setValue(invoiceAmtFrom, 1000)
    action.setValue(invoiceAmtTo, 2000)

  }

  verifyReset() {
    var noResetFields = "";
    if (!($(invoiceSearchInput).getText() === "")) {
      noResetFields += "Invoice Number field is not resetting";
    }
    if (!($(fromDate).getValue() === "")) {
      noResetFields += "/From Date field is not resetting"
    }
    if (!($(toDate).getText() === "")) {
      noResetFields += "/To Date field is not resetting"
    }
    if (!($(receiveFromDate).getValue() === "")) {
      this.noResetFields += "/Received From Date field is not resetting"
    }
    if (!($(receiveToDate).getValue() === "")) {
      noResetFields += "/Received TO Date field is not resetting"
    }
    if (!($(invoiceAmtFrom).getValue() === "")) {
      noResetFields += "/Invoice Amount From field is not resetting"
    }
    if (!($(invoiceAmtTo).getValue() === "")) {
      noResetFields += "/Invoice Amt To field is not resetting"
      console.log('noResetFields =>' + noResetFields)
    }

    console.log('noResetFields final =>' + noResetFields)
    assert(noResetFields === "", noResetFields);
  }

  verifyErrorWhileSearchingWithoutFields() {
    var errorElement = $(errorMessage)
    var errorMessageUI = "" + errorElement.getText();
    var errorCheck = "At least one criteria must be chosen";
    assert(errorMessageUI.includes(errorCheck), "Error message:At least one criteria must be chosen for an invoice search not displayed")

  }
  selectCreditMemoAsInvoiceType(){
     action.selectByVisibleText(invoiceTypeSelect,'Credit Memo')
  
  }
  selectServiceInvoiceAsInvoiceType(){
    action.selectByVisibleText(invoiceTypeSelect,'Service Invoice')
 
 }


 selectInvoiceStatusOnHold(){
   action.selectByVisibleText(invoiceStatusType,'On Hold')
 }
  selectDebitMemoAsInvoiceType(){
    action.selectByVisibleText(invoiceTypeSelect,'Debit Memo')
 
 }
verifyIfErrorAppear(){
  if (action.isPresent(errorOnSearch)) {
    assert.fail($(errorOnSearch).getText());
  }
}

  verifyMemoSearchResultsOnDates(fromDate, toDate,memoType) {
    if (action.isPresent(errorOnSearch)) {
      assert.fail($(errorOnSearch).getText());
    }
    const elements = $$(invoicesTotalRows);
    console.log("-----number of row elements---------");
    console.log(elements.length);
    /* Starting from 2nd row as first row is table header*/
    for (var i = 2; i <= elements.length + 1; i++) {
      var memoTypeElement = $("//table//table/tbody/tr[" + i + "]/td[3]/div");
      assert(memoTypeElement.getText().includes(memoType),'There are results which are of type ' +memoType)


      var element = $("//table//table/tbody/tr[" + i + "]/td[4]/div");
      var invoiceDateUI = new Date(element.getText());
      let checkDate = ('0' + (invoiceDateUI.getMonth() + 1)).slice(-2) + "/" + ('0' + invoiceDateUI.getDate()).slice(-2) + "/" + invoiceDateUI.getFullYear();

      if ((checkDate <= toDate) && (checkDate >= fromDate)) {
      } else {
        console.log('Check Date=>' + checkDate + '   FromDate=>' + fromDate + '   toDate=>' + toDate);
        assert.fail('In Results there are records in which Invoice Date=>' + checkDate + ' is not in between FromDate=>' + fromDate + '  and toDate=>' + toDate);
      }
    }
  }
  
  enterMemoNumber(memoNumber){
    action.setValue(invoiceSearchInput,memoNumber)
  }





}

export const invoiceSearchPage = new InvoiceSearchClass();