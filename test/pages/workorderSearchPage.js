import { action } from '../support/user.command';
import { executeSQLquery, getSQLdata, convertToUIdate, recordCount, verifyDBcredential } from '../../util/sqlExecute';

var chai = require('chai');
var assert = chai.assert;
const fromDate = '[name="fromDate"]';
const toDate = '[name="toDate"]';
const workOrdersTotalRows = '//table/tbody/tr/td/table/tbody/tr/td[2]'
const firstLinkWO = "//table//table/tbody/tr[2]/td[1]/div/a";
const WOnumber = "//table//table/tbody/tr[2]/td[2]/div"
const resetButton = '[value="Reset"]';
const submitButton = '[type="submit"]';
const workOrderSearchLabel = '/html/body/table[3]/tbody/tr/td[1]/form/table/tbody/tr[1]/th/div'
const errorOnSearch = '/html/body/span/font/b/ul/li';
const workOrderSortLink = '//tbody/tr[1]/th[2]/table/tbody/tr/td[1]/a/img'
const salesOrderSortLink = '//tbody/tr[1]/th[3]/table/tbody/tr/td[1]/a/img'
const tailSortLink = '//tbody/tr[1]/th[4]/table/tbody/tr/td[1]/a/img'
const airportSortLink = '//tbody/tr[1]/th[5]/table/tbody/tr/td[1]/a/img'
const repairingVendorSortLink = '//tbody/tr[1]/th[6]/table/tbody/tr/td[1]/a/img'
const endDateSortLink = '//tbody/tr[1]/th[8]/table/tbody/tr/td[1]/a/img'
const typeSortLink = '//tbody/tr[1]/th[9]/table/tbody/tr/td[1]/a/img'
const statusSortLink = '//tbody/tr[1]/th[10]/table/tbody/tr/td[1]/a/img'

const airportLocationLabel = '//tbody/tr[1]/td[1]/table/tbody/tr[2]/td[3]'
const vendorNameLabel = '//tbody/tr[1]/td[1]/table/tbody/tr[3]/td[2]'
const salesOrderLabel = '//tbody/tr[1]/td[1]/table/tbody/tr[4]/td[2]'
const woTypeLabel = '//tbody/tr[1]/td[1]/table/tbody/tr[4]/td[4]'
const statusLabel = '//tbody/tr[1]/td[1]/table/tbody/tr[5]/td[2]/strong'

/*---------------------------------Variables used---------------------------*/
var WOnumberToVerify;

class WorkOrderSearchClass {
  verifyWorkOrdersSearchPage() {
    if ($(workOrderSearchLabel).getText() == "Search For Work Orders") {
      return true;
    } else {
      return false;
    }
  }

  enterFromAndToDate(fromDatevalue, toDatevalue) {
    this.clickOnResetButton();
    action.setValue(fromDate, fromDatevalue);
    action.setValue(toDate, toDatevalue);
  }

  clickonSubmitButton() {
    action.click(submitButton)
  }


  clickOnResetButton() {
    action.click(resetButton);

  }

  verifyWorkOrdersearchResultsOnDates(fromDate, toDate) {
    if (action.isPresent(errorOnSearch)) {
      assert.fail($(errorOnSearch).getText());

    }
    const elements = $$(workOrdersTotalRows);
    console.log("-----number of row elements---------");
    console.log(elements.length);
    /* Starting from 2nd row as first row is table header*/
    for (var i = 2; i <= elements.length + 1; i++) {
      var element = $("//table//table/tbody/tr[" + i + "]/td[7]");
      var workOrderDateUI = new Date(element.getText());
      let checkDate = ('0' + (workOrderDateUI.getMonth() + 1)).slice(-2) + "/" + ('0' + workOrderDateUI.getDate()).slice(-2) + "/" + workOrderDateUI.getFullYear();
      if ((checkDate <= toDate) && (checkDate >= fromDate)) {
      } else {
        console.log('Check Date=>' + checkDate + '   FromDate=>' + fromDate + '   toDate=>' + toDate);
        assert.fail('In Results there are records in which work order start Date=>' + checkDate + ' is not in between FromDate=>' + fromDate + '  and toDate=>' + toDate);
      }
    }
  }
  verifyWorkOrderSearchResetFields() {
    var noResetFields = "";
    if (!($(fromDate).getText() === "")) {
      noResetFields += "From Date field is not resetting";
    }
    if (!($(toDate).getText() === "")) {
      noResetFields += "/To Date field is not resetting"
    }

    assert(noResetFields === "", noResetFields);
  }

  getColumnValuesFromWorkOrderSearchResultTable(column) {
    column = parseInt(column);
    console.log('---inside second method-column ====>' + column)
    const elements = $$(workOrdersTotalRows);
    var columnData = new Array(elements.length)
    console.log("-----number of row elements---------");
    console.log(elements.length);
    /* Starting from 2nd row as first row is table header*/
    for (var i = 2; i <= elements.length + 1; i++) {
      var element = $("//table//table/tbody/tr[" + i + "]/td[" + column + "]");
      columnData[i - 1] = element.getText();
    }
    return columnData;
  }

  verifyColumnSortingAscending(column) {
    column = parseInt(column);
    console.log('---inside first method-column ====>' + column)
    var columnData = this.getColumnValuesFromWorkOrderSearchResultTable(column);
    // console.log('-------------------columnData---------------------');
    // console.log(columnData);
    browser.pause(1000);
    var sorted = true;
     console.log('columnData.length  =>'+columnData.length)

    for (var i = 0; i < columnData.length - 1; i++) {
      if (columnData[i] > columnData[i + 1]) {
        console.log('[i]  => ' + i);
        console.log('columnData[i]  => ' + columnData[i]+' columnData[i + 1])  => ' + columnData[i + 1]);
        sorted = false;
        break;
      }
    }
    return sorted;
  }


  clickOWorkOrderSort() {
    action.click(workOrderSortLink)
  }
  clickOnSalesOrderSort() {
    action.click(salesOrderSortLink)
  }
  clickOnTailSort() {
    action.click(tailSortLink)
  }

  clickOnAirportSort() {
    action.click(airportSortLink)
  }
  clickOnRepairingVendorSort() {
    action.click(repairingVendorSortLink)
  }
  clickOnEndDateSort() {
    action.click(endDateSortLink)
  }
  clickOnTypeSort() {
    action.click(typeSortLink)
  }
  clickOnStatusSort() {
    action.click(statusSortLink)
  }
  clickOnFirstWOLinkFromSearchResult() {
    WOnumberToVerify = $(WOnumber).getText();
    action.click(firstLinkWO);
  }
  


  verifyWOdetailFromDatabase() {
    verifyDBcredential();
    const fs = require('fs');
    let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
    let TestData = JSON.parse(rawdata);
    const query = TestData["workOrderDetail"] + WOnumberToVerify + "'";
    console.log('Query=>' + query);
    console.log('---------------Before browser call--------');
    browser.call(() => executeSQLquery(query));
    console.log('---------------After browser call--------');
    var data = getSQLdata();
    console.log('--------------record count from Work Order Result Page--------');
    var totalRecord = recordCount(data);
    console.log('record count => ' + totalRecord)
    const airportLocationLabelElement = $(airportLocationLabel);
    const vendorNameLabelElement = $(vendorNameLabel);
    const salesOrderLabelElement = $(salesOrderLabel);
    const woTypeLabelElement = $(woTypeLabel);
    const statusLabelElement = $(statusLabel);


    assert(airportLocationLabelElement.getText() === data[0][0], 'Airport Location is not matching');
    assert(vendorNameLabelElement.getText() === data[0][1], 'Vendor name is not matching');
    assert(salesOrderLabelElement.getText() === data[0][2], 'Sales Order number is not matching');
    assert(woTypeLabelElement.getText() === data[0][3], 'Type is not matching');
    assert(statusLabelElement.getText() === data[0][4], 'Status is not matching');

  }

}


export const workOrderSearchPage = new WorkOrderSearchClass();