import { action } from '../support/user.command';
import { executeSQLquery, getSQLdata, convertToUIdate, recordCount, verifyDBcredential } from '../../util/sqlExecute';

var chai = require('chai');
var assert = chai.assert;

/*-----------------Service Invoice locators------------------------*/
const purchaseOrderNumber = '[name="purchaseOrderNo"]';
const partTransactionsHistoryLink = '=Part Transactions History'
const partTransactionTable = '//*[@id="PartTransactions"]'
const fromDate = '[name="fromDate"]';
const toDate = '[name="toDate"]';
const search = '[type="submit"]';
const salesOrderText = '[name="salesOrderNo"]';
const netJetsWorkOrderText = '[name="workOrderNo"]';
const serialText = '[name="partSerialNo"]';
const partNumberText = '[name="partNo"]';
const resetButton = '[value="Reset"]';
const errorOnSearch = "/html/body/span/font/b/ul/li ";
const totalRows = "//table//table/tbody/tr/td[1]/div";
const firstLink = "//table//table/tbody/tr[2]/td[1]/div/a";
const POnumber = "//table//table/tbody/tr[2]/td[2]/div";
const purchaseOrderNumberLabel = "//table/tbody/tr[2]/td[2]/a";
const salesOrderNumberLabel = "//table/tbody/tr[3]/td[2]";
const typeLabel = "//table/tbody/tr[3]/td[4]";
const statusLabel = "//table/tbody/tr[4]/td[2]";
const ownershipTypeLabel = "//table/tbody/tr[4]/td[4]";
const dateLabel = "//table/tbody/tr[5]/td[2]";
const vendorLabel = "//table/tbody/tr[6]/td[2]";
/*---------------------------------Variables used---------------------------*/
var POnumberToVerify;




class PurchaseOrderClass {

  verifyPOsearchResultsOnDates(fromDate, toDate) {
    if (action.isPresent(errorOnSearch)) {
      assert.fail($(errorOnSearch).getText());
    }
    const elements = $$(totalRows);
    console.log("-----number of row elements---------");
    console.log(elements.length);
    /* Starting from 2nd row as first row is table header*/
    for (var i = 2; i <= elements.length + 1; i++) {
      var element = $("//table//table/tbody/tr[" + i + "]/td[8]/div");
      var checkDate = element.getText();
      if ((checkDate <= toDate) && (checkDate >= fromDate)) {
      } else {
        console.log('Check Date=>' + checkDate + '   FromDate=>' + fromDate + '   toDate=>' + toDate);
        assert.fail('In Results there are records in which PO Date=>' + checkDate + ' is not in between FromDate=>' + fromDate + '  and toDate=>' + toDate);
      }
    }

  }

  clickOnFirstPOLinkFromSearchResult() {
    POnumberToVerify = $(POnumber).getText();
    action.click(firstLink);
  }

  verifyPOdetailFromDatabase() {
    verifyDBcredential();
    const query = "select PO.purchase_order_no,sales_order_no,PO.type,PO.status,PO.ownership_type,PO_Date,Vendor_name from cdm_owner.PURCHASE_ORDER PO,cdm_owner.Vendor V where purchase_order_no='" + POnumberToVerify + "' and PO.vendor_id=V.vendor_id"
    console.log('Query=>' + query);
    console.log('---------------Before browser call--------');
    browser.call(() => executeSQLquery(query));
    console.log('---------------After browser call--------');
    var data = getSQLdata();
    console.log('--------------record count from purchaseOrderPage--------');
    var totalRecord = recordCount(data);
    console.log('record count => ' + totalRecord)
    console.log('data array => ' + data)
    const purchaseOrderNumberLabelElement = $(purchaseOrderNumberLabel);
    const salesOrderNumberLabelElement = $(salesOrderNumberLabel);
    const typeLabelElement = $(typeLabel);
    const statusLabelElement = $(statusLabel);
    const ownershipTypeLabelElement = $(ownershipTypeLabel);
    const dateLabelElement = $(dateLabel);
    const vendorLabelElement = $(vendorLabel);

    assert(purchaseOrderNumberLabelElement.getText() === data[0][0], 'Purchase Order number is not matching');
    console.log('salesOrderNumberLabelElement.getText() =>'+salesOrderNumberLabelElement.getText())
    console.log('data[0][1] =>'+data[0][1])
    assert(salesOrderNumberLabelElement.getText() === data[0][1], 'Sales Order number is not matching');
    assert(typeLabelElement.getText() === data[0][2], 'Type is not matching');
    assert(statusLabelElement.getText() === data[0][3], 'Status is not matching');
    assert(ownershipTypeLabelElement.getText() === data[0][4], 'Ownership is not matching');
    assert(dateLabelElement.getText() === convertToUIdate(data[0][5]), 'PO Date is not matching');

    console.log(vendorLabelElement.getText()) //Output : BOMBARDIER INC. (MONTR?AL)
    console.log(data[0][6])  //Output : BOMBARDIER INC. (MONTRÉAL)//log a minor issue
    assert(vendorLabelElement.getText() === data[0][6], 'Vendor Name is not matching to '+data[0][6]);
  }

  fetchPOwhichHasTransactionHistory() {
    verifyDBcredential();
    const fs = require('fs');
    let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
    let TestData = JSON.parse(rawdata);
    const query = TestData["poNumberwhichHasPartTransHistory"];
    console.log('Query=>' + query);
    console.log('---------------Before browser call--------');
    browser.call(() => executeSQLquery(query));
    console.log('---------------After browser call--------');
    var data = getSQLdata();
    return data[0][1]
  }
  
  fetchPOwhichHasWOassociated() {
    verifyDBcredential();
    const fs = require('fs');
    let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
    let TestData = JSON.parse(rawdata);
    const query = TestData["poAssociatedWithWO"];
    console.log('Query=>' + query);
    console.log('---------------Before browser call--------');
    browser.call(() => executeSQLquery(query));
    console.log('---------------After browser call--------');
    var data = getSQLdata();
    return data
  }

  clickOnResetButton() {
    action.click(resetButton);
  }

  verifyResetButton() {
    var salesOrderTextclear = $(salesOrderText).getText();
    var netJetsWorkOrderTextClear = $(netJetsWorkOrderText).getText();
    var serialTextclear = $(serialText).getText();
    var partNumberTextclear = $(partNumberText).getText();

    if ((salesOrderTextclear + netJetsWorkOrderTextClear + serialTextclear + partNumberTextclear) === "") {
      console.log('all srting=> ' + (salesOrderTextclear + netJetsWorkOrderTextClear + serialTextclear + partNumberTextclear))
      return true;
    }
    return false;
  }

  clickOnReset() {
    action.click(resetButton);

  }

  fillPOserachText() {
    action.setValue(salesOrderText, '12345')
    action.setValue(netJetsWorkOrderText, '14321')
    action.setValue(serialText, '3434')
    action.setValue(partNumberText, '6464')
  }



  verifyPurchaseOrderSearchPage() {
    if (action.isPresent(fromDate)) {
      return true;
    } else {
      return false;
    }
  }

  enterFromAndToDate(fromDatevalue, toDatevalue) {
    this.clickOnReset();
    action.setValue(fromDate, fromDatevalue);
    action.setValue(toDate, toDatevalue);

  }
  enterPOnumber(PO) {
    //var data = getSQLdata();
    this.clickOnReset();
    action.setValue(purchaseOrderNumber, PO);

  }

  clickOnPartTransactionsHistory() {
    action.click(partTransactionsHistoryLink);
    browser.pause(5000);

  }
  clickOnWorkOrderLink(woAssociatedWithPO) {
    var woLink= '='+woAssociatedWithPO
    console.log("woLink=>"+woLink)
    assert(action.isPresent(woLink),'Work order is not linked on this purchase order,change SQL query')
    action.click(woLink);
    browser.pause(3000);

  }
  verifyWorkOrderPopupOpensUp(woAssociatedWithPO) {
    browser.switchWindow('/WOSearch')
    action.waitTillPageLoaded()

    const workOrderLabel='//table[3]/tbody/tr[1]/td[1]/table/tbody/tr[1]/td[2]/strong'
    assert($(workOrderLabel).getText().includes(woAssociatedWithPO),'Work order number is not coming correct')
    console.log('Work order number has been verified')
    browser.closeWindow();
    browser.switchWindow('PurchaseOrder')
  }
  verifyPartTransactionOpensUp() {
    var partTransactionTablePresent;
    browser.switchWindow('Part Transactions History')
    partTransactionTablePresent = action.isPresent(partTransactionTable)
    browser.pause(1000);
    browser.closeWindow();
    browser.switchWindow('SearchSubmit.do')
    assert(partTransactionTablePresent === true, 'Part Transaction table is not displayed for selected PO');
    console.log('Part Transaction table is displayed for selected PO')
  }

  clickPurchaseOrderSearch() {
    action.click(search)
  }



}
export const purchaseOrderPage = new PurchaseOrderClass();