import { action } from '../support/user.command';
import { executeSQLquery, getSQLdata, convertToUIdate, recordCount, verifyDBcredential } from '../../util/sqlExecute';

var chai = require('chai');
var assert = chai.assert;
const reviewInternalWorkOrder = '//tbody/tr/td[1]/table/tbody/tr[1]/th/div';
const tailNumber = '[name="tailnumber"]';
const netJetsWOnumber = '[name="netjetswonumber"]';
const submitButton = '[type="submit"]';
const aircraftInfLabel = '//table/tbody/tr[1]/td[1]/table/tbody/tr[1]/td/div'
const tailNumberInSearchTable = "//tbody/tr[3]/td[1]/b"
const fromDate = '[name="fromDate"]';
const toDate = '[name="toDate"]';
const aircraftTypeSelect = '[name="aircraftType"]';
const resetButton = '[value="Reset"]';
const approveAll = '=Approve All'
const holdAll = '=Hold All'
const saveButton = '[type="submit"]';
const changeStatusApproveAfterSave = '//table/tbody/tr[4]/td[8]/input'
const changeStatusSelect = "//select[@class='optionsList']"

/*-----Variables used---------*/
var tailNumberToVerify;
var woNumberToVerify;


class ReviewInternalCostClass {
  verifyReviewInternalCostPage() {
    if ($(reviewInternalWorkOrder).getText() == "Review Internal Work Orders") {
      return true;
    } else {
      return false;
    }
  }

  enterTailNumberFromDatabase() {
    verifyDBcredential();
    const fs = require('fs');
    let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
    let TestData = JSON.parse(rawdata);
    const query = TestData["searchCriteriaForReviewInternalCosts"];
    console.log('Query=>' + query);
    console.log('---------------Before browser call--------');
    browser.call(() => executeSQLquery(query));
    console.log('---------------After browser call--------');
    var data = getSQLdata();
    console.log('--------------record count from purchaseOrderPage--------');
    var totalRecord = recordCount(data);
    console.log('record count => ' + totalRecord)
    tailNumberToVerify = data[0][1]
    console.log("tailNumberToVerify =>" + tailNumberToVerify)
    action.setValue(tailNumber, tailNumberToVerify)
  }
  enterWoNumberFromDatabase() {
    verifyDBcredential();
    const fs = require('fs');
    let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
    let TestData = JSON.parse(rawdata);
    const query = TestData["searchCriteriaForReviewInternalCosts"];
    console.log('Query=>' + query);
    console.log('---------------Before browser call--------');
    browser.call(() => executeSQLquery(query));
    console.log('---------------After browser call--------');
    var data = getSQLdata();
    console.log('--------------record count from purchaseOrderPage--------');
    var totalRecord = recordCount(data);
    console.log('record count => ' + totalRecord)
    woNumberToVerify = data[0][0]
    console.log("woNumberToVerify =>" + woNumberToVerify)
    action.setValue(netJetsWOnumber, woNumberToVerify)
  }

  clickonSubmitButton() {
    action.click(submitButton)
  }

  verifyAirCraftInfoLabel() {
    if ($(aircraftInfLabel).getText() == "Aircraft Information") {
      return true;
    } else {
      return false;
    }

  }
  verifySearchResultsOnTailNumber() {
    const tailNumberInSearchTableElement = $(tailNumberInSearchTable);
    console.log('tailNumberInSearchTableElement.getText() =>' + tailNumberInSearchTableElement.getText())
    console.log('tailNumberToVerify =>' + tailNumberToVerify)
    assert(tailNumberInSearchTableElement.getText() === tailNumberToVerify, 'In Search result TAIL number is not matching');
  }
  fillReviewInternalCostPageSerachText() {
    action.setValue(tailNumber, '12345')
    action.setValue(fromDate, '03/01/2019')
    action.setValue(toDate, '03/01/2019')
    action.selectByVisibleText(aircraftTypeSelect, 'CE-560')
    console.log('aircraf value =>' + $(aircraftTypeSelect).getValue())
  }
  clickOnReset() {
    action.click(resetButton);

  }

  verifyResetFields() {
    var noResetFields = "";
    if (!($(tailNumber).getText() === "")) {
      noResetFields += "Tail Number field is not resetting";
    }
    if (!($(fromDate).getValue() === "")) {
      noResetFields += "/From Date field is not resetting"
    }
    if (!($(toDate).getText() === "")) {
      noResetFields += "/To Date field is not resetting"
    }
    if (!($(aircraftTypeSelect).getValue() === "")) {
      noResetFields += "/Aircraft type field is not resetting"
    }
    console.log('noResetFields final =>' + noResetFields)
    assert(noResetFields === "", noResetFields);

  }

  clickOnHoldAllLink() {
    action.click(holdAll)
  }
  clickOnApproveAllLink() {
    action.click(approveAll)
  }
  clickOnSaveButton() {
    action.click(submitButton)
  }
  verifyHoldStatus() {
    var changeStatusElement = $(changeStatusSelect)
    console.log('changeStatus =>', changeStatusElement.getValue())
    assert(changeStatusElement.getValue() === "WO_HOLD", 'Status has not been changed to HOLD,Please check SQL query as well');

  }
  verifyApproveStatus() {
    var changeStatusElement = $(changeStatusSelect)
    console.log('changeStatus =>', changeStatusElement.getValue())
    assert(changeStatusElement.getValue() === "WO_APPROVE", 'Status has not been changed to APPROVE,Please check SQL query as well');

  }
  verifyApproveStatusAfterSave() {
    var changeStatusElement = $(changeStatusApproveAfterSave)
    console.log('changeStatus After Save =>', changeStatusElement.getValue())
    assert(changeStatusElement.getValue().includes('APPROVE'), 'Status has not been changed to APPROVE,Please check SQL query as well');

  }

}

export const reviewInternalCostPage = new ReviewInternalCostClass();