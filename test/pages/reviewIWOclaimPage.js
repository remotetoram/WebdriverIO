import { action } from '../support/user.command';
import { executeSQLquery, getSQLdata, convertToUIdate, recordCount, verifyDBcredential } from '../../util/sqlExecute';

var chai = require('chai');
var assert = chai.assert;
/*-----------------Element Locators on page------------------------*/
const workOrdersTotalRows = '//table[4]/tbody/tr/td/table/tbody/tr/td[2]'
const reviewIWAsearchTotalRows = '//table/tbody/tr/td/table/tbody/tr/td[2]/div'
const fromDate = '[name="fromDate"]';
const toDate = '[name="toDate"]';
const netJetWorkOrder = '[name="value(netjetswonumber)"]'
const resetButton = '[value="Reset"]';
const saveButton = '[type="submit"]';
const submit = '[type="submit"]';
const goBackButton = '[value="Go Back"]';
const continueButton = '[type="submit"]'
const linkedWorkOrderlabel = '//*[@id="Table7"]/tbody/tr[1]/td/div/strong'
const reviewIWAclaimLabel = '//table/tbody/tr/td[1]/table/tbody/tr[1]/th/div'
const resultsTotalRows = '//table/tbody/tr/td/table/tbody/tr/td[2]/div'
const errorOnSearch = '//span/font/b/ul/li'
const aircraftTypeSelect = '[name="aircrafts"]';

const workOrderSortLink = '//tbody/tr[1]/th[2]/table/tbody/tr/td[1]/a/img'
const aircraftLink = '//tbody/tr[1]/th[3]/table/tbody/tr/td[1]/a/img'
const tailSortLink = '//tbody/tr[1]/th[4]/table/tbody/tr/td[1]/a/img'
const locationSortLink = '//tbody/tr[1]/th[5]/table/tbody/tr/td[1]/a/img'
const actualStartDateLink = '//tbody/tr[1]/th[6]/table/tbody/tr/td[1]/a/img'
const actualEndDateLink = '//tbody/tr[1]/th[7]/table/tbody/tr/td[1]/a/img'
const typeSortLink = '//tbody/tr[1]/th[8]/table/tbody/tr/td[1]/a/img'
const unadjustedToalLaborSortLink = '//tbody/tr[1]/th[9]/table/tbody/tr/td[1]/a/img'
const adjustedTotalLaborSortLink = '//tbody/tr[1]/th[10]/table/tbody/tr/td[1]/a/img'
const unadjustedTotalPartSortLink = '//tbody/tr[1]/th[11]/table/tbody/tr/td[1]/a/img'
const adjustedTotalPartSortLink = '//tbody/tr[1]/th[12]/table/tbody/tr/td[1]/a/img'
const costApprovalStatusSortLink = '//tbody/tr[1]/th[13]/table/tbody/tr/td[1]/a/img'
const reviewStatusSortLink = '//tbody/tr[1]/th[14]/table/tbody/tr/td[1]/a/img'
const claimNumberSortLink = '//tbody/tr[1]/th[15]/table/tbody/tr/td[1]/a/img'
const workOrdernumberFromResult = '//table/tbody/tr/td/table/tbody/tr[2]/td[2]/div'
const firstLinkWorkOrder = '//table/tbody/tr/td/table/tbody/tr[2]/td[1]/div/a'
const workOrdernumberOnDetail = '//*[@id="Table7"]/tbody/tr[2]/td[2]/strong'
const showLaborandPartDetailsLink = '=Show Labor and Part details'
const hideDetailsLink = '=Hide Details'
const statusCommentsLink = '=Status Comments'
const laborDetailsTextOnPopup = '//table/tbody/tr[3]/td/table/tbody/tr[4]/td[2]/table/tbody/tr[1]/td[1]'
const commentTextArea = "//textarea[@name='lineItems[0].laborTasks[0].laborDetailComments']"
const setAllItemsReviewedLink = '//*[@id="Table7"]/tbody/tr[3]/td[2]/a'
const reviewStatusFirsrRow = '//table/tbody/tr/td/table/tbody/tr[2]/td[14]/div'
const setAllItemsClaimToBeFilledLink = '//table/tbody/tr[1]/td[3]/table/tbody/tr[4]/td[2]/a'
const LineItemClaimsToBeFiledRadio = "//input[@name='lineItems[0].laborTasks[0].reviewStatus'][@value='false']"
const costApprovalStatus = '[name="value(statusType)"]'
const noneNotesText = '/html/body/table[3]/tbody/tr[1]/td[1]/table/tbody/tr[7]/td[4]'
const viewNotesLink = '=View'
const firstnotes = '//form/strong[1]'


/**************Variables used*****************/
var WOnumberToVerify;


class ReviewIWOclaimClass {

  clickOnViewNotesLink() {
      action.click(viewNotesLink);
      console.log('View notes link has been clicked' )
    }
  

  verifyNotesSection() {
    console.log('Number of Notes found =>' + $$(firstnotes).length)
    if ($$(firstnotes).length === 0) {
      assert.fail('No notes found in selected work order')
    }
    console.log('firstnotes=== >', $(firstnotes).getText())
  }
  deselectCostApprovalStatus() {
    action.selectByVisibleText(costApprovalStatus, 'Select One')

  }

  verifyIfWOPopupClosed() {
    assert(!(action.isPresent(goBackButton)), 'WO popup window is not closed after clicking Go Back')
    console.log('WO popup window is closed after clicking Go Back')
  }


  clickOnGoBackButton() {
    action.click(goBackButton)
    browser.switchWindow('/IWOSearch')
  }
  clickOnLineItemClaimsToBeFiled() {
    if (action.isPresent(LineItemClaimsToBeFiledRadio)) {
      action.click(LineItemClaimsToBeFiledRadio)
      console.log('Claims to be filed radio button is selected')
    } else {
      console.log('Claims to be filed radio button is already selected')
    }
  }

  veryWorkOrderStatusAsClaimToBeFilled() {
    assert($(reviewStatusFirsrRow).getText().includes('Claims to be filed'), 'Review status for work order has not be updated to Claims to be filed')
    console.log('Review status for work order has been updated to Claims to be filed')
  }

  clickOnSetAllItemsClaimToBeFilledLink() {
    action.click(setAllItemsClaimToBeFilledLink)
  }
  veryWorkOrderStatusAsReviewed() {
    assert($(reviewStatusFirsrRow).getText().includes('Reviewed'), 'Review status for work order has not be updated to Reviewed')
    console.log('Review status for work order has been updated to Reviewed')
  }

  clickOnSetAllItemsReviewedLink() {
    action.click(setAllItemsReviewedLink)
  }

  verifyAddedComment() {
    browser.switchWindow('/Submit.do')
    action.click(firstLinkWorkOrder)
    browser.switchWindow('/WOReview.do')
    assert($(commentTextArea).getValue().includes('Comment added by automation'), 'Added comment is not shown')
    console.log('Added comment is successfully saved')
    browser.closeWindow()
    browser.switchWindow('/Submit.do')
  }
  clickOnSaveButton() {
    action.click(saveButton)
    browser.switchWindow('/Submit.do')
  }
  AddCommentInFirstLineItem() {
    action.setValue(commentTextArea, 'Comment added by automation')
  }

  verifyLaborAndPartDetailsOnPopup() {
    browser.switchWindow('/WOReview.do')
    assert($(workOrdernumberOnDetail).getText().includes(WOnumberToVerify), 'Work Order number is not matching')
    assert(action.isPresent(hideDetailsLink), 'Labor and Part details is not expanded by default/or wo does not have labor details')
    console.log('Labor and Part details is expanded by default')
    assert(action.isPresent(commentTextArea), 'Labor Details is not visible/expanded')
    console.log('Lobor details heading is expanded and visible')

  }

  verifyLaborAndPartDetailsOnPopUpHideDetail() {
    browser.switchWindow('/WOReview.do')
    assert($(workOrdernumberOnDetail).getText().includes(WOnumberToVerify), 'Work Order number is not matching')
    assert(action.isPresent(hideDetailsLink), 'Labor and Part details is not expanded by default/or wo does not have labor details')
    console.log('Labor and Part details is expanded by default')
    action.click(hideDetailsLink)
    action.mediumWait()
    if (action.isPresent(showLaborandPartDetailsLink)) {
      action.click(showLaborandPartDetailsLink)
      assert(action.isPresent(commentTextArea), 'Labor Details is not visible/expanded')
      console.log('Lobor details heading is expanded and visible')
    } else
      assert.fail('Labor Details heading is not visible/expanded or workorder does not have labor detais')
    browser.closeWindow()
    browser.switchWindow('/Submit.do')
  }


  clickOnFirstWOLinkFromSearchResult() {
    WOnumberToVerify = $(workOrdernumberFromResult).getText();
    console.log('Work order number =>' + WOnumberToVerify)
    action.click(firstLinkWorkOrder)
  }



  enterFromAndToDate(fromDateValue, toDateValue) {
    action.setValue(fromDate, fromDateValue)
    action.setValue(toDate, toDateValue)
  }
  clickOnSubmitButton() {
    action.click(submit)
  }
  verifyIWAresultAppeared() {
    if (action.isPresent(errorOnSearch)) {
      console.log('For the selected dates no results appeared, please change date range')
      assert.fail($(errorOnSearch).getText());

    }
  }
  verifyIWAsearchResultsOnDates(fromDate, toDate) {
    if (action.isPresent(errorOnSearch)) {
      assert.fail($(errorOnSearch).getText());
    }
    const elements = $$(resultsTotalRows);
    console.log("-----number of row elements---------");
    console.log(elements.length);
    /* Starting from 2nd row as first row is table header*/
    for (var i = 2; i <= elements.length + 1; i++) {
      var element = $("//table//table/tbody/tr[" + i + "]/td[6]/div");

      var invoiceDateUI = new Date(element.getText());
      let checkDate = ('0' + (invoiceDateUI.getMonth() + 1)).slice(-2) + "/" + ('0' + invoiceDateUI.getDate()).slice(-2) + "/" + invoiceDateUI.getFullYear();

      if ((checkDate <= toDate) && (checkDate >= fromDate)) {
      } else {
        console.log('Check Date=>' + checkDate + '   FromDate=>' + fromDate + '   toDate=>' + toDate);
        assert.fail('In Results there are records in which actual start Date=>' + checkDate + ' is not in between FromDate=>' + fromDate + '  and toDate=>' + toDate);
      }
    }
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
  clickOnReset() {
    action.click(resetButton);

  }
  verifyResetFields() {
    var noResetFields = "";
    if (!($(fromDate).getValue() === "")) {
      noResetFields += "From Date field is not resetting"
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
  getColumnValuesFromInvoiceSearchResultTable(column) {
    column = parseInt(column);
    console.log('---inside second method-column ====>' + column)
    const elements = $$(reviewIWAsearchTotalRows);
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
  clickOnWorkOrderSortLink() {
    action.click(workOrderSortLink)
  }
  clickOnAircraftLink() {
    action.click(aircraftLink)
  }
  clickOnTailSortLink() {
    action.click(tailSortLink)
  }

  clickOnLocationSortLink() {
    action.click(locationSortLink)
  }
  clickOnActualStartDateLink() {
    action.click(actualStartDateLink)
  }
  clickOnActualEndDateLink() {
    action.click(actualEndDateLink)
  }
  clickOnTypeSortLink() {
    action.click(typeSortLink)
  }
  clickOnUnadjustedToalLaborSortLink() {
    action.click(unadjustedToalLaborSortLink)
  }
  clickOnAdjustedTotalLaborSortLink() {
    action.click(adjustedTotalLaborSortLink)
  }

  clickOnUnadjustedTotalPartSortLink() {
    action.click(unadjustedTotalPartSortLink)
  }
  clickOnAdjustedTotalPartSortLink() {
    action.click(adjustedTotalPartSortLink)
  }
  clickOnCostApprovalStatusSortLink() {
    action.click(costApprovalStatusSortLink)
  }
  clickOnReviewStatusSortLink() {
    action.click(reviewStatusSortLink)
  }
  clickOnClaimNumberSortLink() {
    action.click(claimNumberSortLink)
  }
}
export const reviewIWOpage = new ReviewIWOclaimClass();