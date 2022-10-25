import { action } from '../support/user.command';
import { executeSQLquery, getSQLdata, convertToUIdate, recordCount, verifyDBcredential } from '../../util/sqlExecute';

var chai = require('chai');
var assert = chai.assert;
/*-----------------Element Locators on page------------------------*/
const memoToInvoiceRadio = '[value="invoice"]';
const claimNumberSearchInput = '[name="claimNbr"]'
const memoToClaimRadio = '[value="claim"]';
const PartsInvoiceNumberOnDetail = '//table[3]/tbody/tr[1]/td[1]/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]'
const saveButton = '[value="Save"]';
const invoiceType = '//*[@id="invoiceType"]/td[1]/select'
const invoiceStatus = '//select [@name="invStatusTypes"]'
const invoiceNumberTextField = '[name="value(primaryNumber)"]';
const firstInvoiceNuberOnSearchResult = '//table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div'
const memoAttachedFirstRow = '//table[3]/tbody/tr[1]/td[3]/table/tbody/tr[5]/td/table/tbody/tr[2]/td[1]'
const invoiceMatachesMemo = '[value="matches"]';
const invoiceMatchesLinkAgainMemo = '[value="matchesLinkAgain"]';
const invoiceDoesNotMatchContinueMemo = '[value="doesNotMatchContinue"]';
const invoiceDoesNotMatchSearchAgainMemo = '[value="doesNotMatch"]';
const invoiceDoesNotMatchHoldMemo = '[value="doesNotMatchHold"]';
const memoStatus = '//table[4]/tbody/tr/td[1]/table[1]/tbody/tr[3]/td[4]/b'
const memoPartiallyLinkedStatus = '//table/tbody/tr/td[2]/table[1]/tbody/tr[3]/td[4]/b'
const memoCapturedStatus = '//table/tbody/tr/td[2]/table/tbody/tr[3]/td[4]/b'
const memoLinkedStatus = '//*[@id="carmaForm"]/table[2]/tbody/tr/td[1]/table/tbody/tr[3]/td[4]/b'
const memoOnHoldStatus = '//table[4]/tbody/tr/td[1]/table[1]/tbody/tr[3]/td[4]/b'
const viewNotesLinkOnPO = '//*[@id="POHeaderTable"]/tbody/tr[7]/td[2]/a'
const workOrdersTotalRows = '//table[4]/tbody/tr/td/table/tbody/tr/td[2]'
const workOrderSortLink = '//tbody/tr[1]/th[2]/table/tbody/tr/td[1]/a/img'
const fromDate = '[name="fromDate"]';
const toDate = '[name="toDate"]';
const netJetWorkOrder = '[name="value(netjetswonumber)"]'
const purchaseOrderForSearch = '[name="purchaseOrderNo"]'
const resetButton = '[value="Reset"]';
const submit = '[type="submit"]';
const continueButton = '[type="submit"]'
const continueButtonWithValueContinue = '[value="Continue"]'
const search = '[value="Search"]'
const linkedWorkOrderlabel = '//*[@id="Table7"]/tbody/tr[1]/td/div/strong'

const toptabelheaderLabel = '/html/body/table[3]/tbody/tr/td/table/tbody/tr[1]/td/div/strong'
const purchaseOrderSearchResult = '//form/table/tbody/tr[3]/td'

const workOrdernumberFromResult = '//table[4]/tbody/tr/td/table/tbody/tr[2]/td[2]/div'
const firstLinkInvoice = '//table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[1]/div/a'
const firstLinkWorkOrder = '//table[4]/tbody/tr/td/table/tbody/tr[2]/td[1]/div/a'
const purchaseOrdernumberFromResult = '//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/div'
const firstLinkPurchaseOrder = '//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[2]/td[1]/div/a'
const deleteThisInvoice = '=(Delete this invoice)'
const deleteConfirmationMessage = '/html/body/div[6]/li'

const workOrdernumberOnDetail = '//table[4]/tbody/tr[1]/td[1]/table/tbody/tr[1]/td[2]/strong'
const purchaseOrdernumberOnDetail = '//table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/a/strong'
const invoiceNumberOnDetail = '//table[3]/tbody/tr[1]/td[1]/table/tbody/tr[3]/td[2]'
const workOrderNumberOnPopup = '//table[3]/tbody/tr[1]/td[1]/table/tbody/tr[1]/td[2]/strong'
const purchaseOrderNumberOnPopup = '//table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/a/strong'
const viewNotesLink = '//table[4]/tbody/tr[1]/td[1]/table/tbody/tr[7]/td[4]/a'
const viewNotesLinkOnPopup = '//table[3]/tbody/tr[1]/td[1]/table/tbody/tr[7]/td[4]/a'
const viewNotesLinkOnPopupForPO = '//table/tbody/tr[1]/td[1]/table/tbody/tr[7]/td[2]/a'
const noneNotesText = '/html/body/table[3]/tbody/tr[1]/td[1]/table/tbody/tr[7]/td[4]'
const errorMessage = '/html/body/span/font/b/ul/li'
const firstnotes = '//table[5]/tbody/tr[2]/td/strong'
const firstnotesForPO = '//form/table/tbody/tr[4]/td/strong[2]'
const firstnotesOnWorkOrderPopup = '//table[4]/tbody/tr[2]/td/strong'
const firstnotesOnPurchaseWorkOrderPopup = '//table/tbody/tr[4]/td/strong[2]'
const showLaborandPartDetailsLink = '=Show Labor and Part details'
const hideDetailsLink = '=Hide Details'
const statusCommentsLink = '=Status Comments'
const notesInput = '[name="notes"]'
const workOrderMatchesInvoiceRadio = '[value="doesMatchContinue"]';
const workOrderMatchAddAnotherRadio = '[value="doesMatchAddAnother"]';
const WorkOrderDoesntMatchSearchAgainRadio = '[value="doesNotMatchSearch"]'
const WorkOrderDoesntMatchHoldRadio = '[value="doesNotMatchHold"]'
const holdReasonsSelect = '//*[@id="Table7"]/tbody/tr[6]/td/select'
const holdReasonSelectOnLinking = '[name="holdReasonValues"]'
const holdReasonsSelectOnPoSearch = '//*[@id="Table7"]/tbody/tr[2]/td[2]/select'
const holdReasonsSelectAfterRemoveOption = '//*[@id="Table7"]/tbody/tr[7]/td/select'
const removeHoldRadio = '[value="removeholds"]'
const removeHoldRadioOnLinking = '[value="removeHolds"]'
const airportLocationLabel = '//tbody/tr[1]/td[1]/table/tbody/tr[2]/td[3]'
const vendorNameLabel = '//tbody/tr[1]/td[1]/table/tbody/tr[3]/td[2]'
const salesOrderLabel = '//tbody/tr[1]/td[1]/table/tbody/tr[4]/td[2]'
const woTypeLabel = '//tbody/tr[1]/td[1]/table/tbody/tr[4]/td[4]'
const statusLabel = '//tbody/tr[1]/td[1]/table/tbody/tr[5]/td[2]/strong'
const InvoiceStatusOnPOsearch = '//table[4]/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[1]/table/tbody/tr[2]/td[4]'
const invoiceStatusOnLinkPage = '//table/tbody/tr[1]/td[2]/table/tbody/tr[2]/td/div/table/tbody/tr[2]/td[4]'
const salesOrderPoLabel = '//form/table/tbody/tr[1]/td[1]/table/tbody/tr[3]/td[2]'
const poTypeLabel = '//form/table/tbody/tr[1]/td[1]/table/tbody/tr[3]/td[4]'
const statusPoLabel = '//table/tbody/tr[1]/td[1]/table/tbody/tr[4]/td[2]/strong'
const owenershipTypePoLabel = '//form/table/tbody/tr[1]/td[1]/table/tbody/tr[4]/td[4]'
const vendorNamePoLabel = '//form/table/tbody/tr[1]/td[1]/table/tbody/tr[6]/td[2]'

const viewWorkOrderLink = '//table[4]/tbody/tr[1]/td[1]/table/tbody/tr[1]/td[2]/strong/a'
const viewPurchaseOrderLink = '//table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/a/strong'

const inVoiceStatus = '//*[@id="Table7"]/tbody/tr[3]/td[4]'

const fleetOverride = '//html/body/form/table/tbody/tr[1]/td'
const laborTotalMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[3]/b'
const partTotalMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[5]/b'
const otherTotalMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[7]/b'
const linesTotalMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[9]/b'
const headerTotalMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[11]/b'
const differenceMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[13]/b'
const laborDetailsTextOnPopup = '//table[3]/tbody/tr[4]/td/table/tbody/tr[4]/td/table/tbody/tr[1]/td[1]'
const laborDetailsText = '//table[4]/tbody/tr[4]/td/table/tbody/tr[4]/td/table/tbody/tr[1]/td[1]'
const invoiceStatusPOsearch = '//table[4]/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[1]/table/tbody/tr[2]/td[4]'
const claimnumberlabelToVerify = '//table[2]/tbody/tr[1]/td[2]/table/tbody/tr[3]/td/table/tbody/tr[1]/td[2]'

/*-------------Veriables used-----------*/
var WOnumberToVerify;
var POnumberToVerify;
var invoiceNumberToVerify;

class InvoiceLinkPageClass {

    verifyInvoiceStatusOnPOsearch(status) {
        action.waitTillPageLoaded()
        assert($(InvoiceStatusOnPOsearch).getText().includes(status), 'Invoice status is not coming correct')
        console.log("Invoice status is coming correct as " + status)
    }
    verifyClaimNumberWhileLinking(claimNumber) {
        action.waitTillPageLoaded()
        assert($(claimnumberlabelToVerify).getText().includes(claimNumber), 'Claim number is not coming correct on linking')
        console.log("Claim number is coming as " + claimNumber)
    }
    verifymemoAttachedFirstRow() {
        action.waitTillPageLoaded()
        assert(action.isPresent(memoAttachedFirstRow), 'Memo does not look attached to invoice')
        console.log('Memo looks attached to invoice')
    }
    verifymemoAttachedFirstRowForPartsInvoice(memoNumber) {
        action.waitTillPageLoaded()
        var memoNumberlocator = "=" + memoNumber
        console.log("memoNumberlocator=>" + memoNumberlocator)
        assert(action.isPresent(memoNumberlocator), 'Memo does not look attached to invoice')
        console.log('Memo looks attached to invoice')
    }
    verifyNOmemoAttachedFirstRow() {
        action.waitTillPageLoaded()
        assert(!action.isPresent(memoAttachedFirstRow), 'Memo still looks attached to invoice')
        console.log('Now Memo is not attached to invoice')
    }
    verifyNOmemoAttachedFirstRowForPartsInvoice(memoNumber) {
        action.waitTillPageLoaded()
        var memoNumberlocator = "=" + memoNumber
        console.log("memoNumberlocator=>" + memoNumberlocator)
        assert(!action.isPresent(memoNumberlocator), 'Memo still looks attached to invoice')
        console.log('Now Memo is not attached to invoice')
    }

    verifyInvoiceSearchResult() {
        action.waitTillPageLoaded()
        assert(action.isPresent(firstInvoiceNuberOnSearchResult), 'Invoice list does not appear,search criteria can be changed')
        console.log('Invoice list has been displayed')
    }

    selectInvoiceType(type) {
        action.selectByVisibleText(invoiceType, type)
    }
    selectInvoiceStatus(status) {
        action.selectByVisibleText(invoiceStatus, status)
    }

    selectmemoToInvoiceRadio() {
        action.click(memoToInvoiceRadio)
    }
    selectmemoToClaimRadio() {
        action.click(memoToClaimRadio)
    }
    clickOnSaveButton() {
        action.click(saveButton)
        action.waitTillPageLoaded()
    }

    verifyMomoStatusOnBalancePage(status) {
        action.waitTillPageLoaded()
        assert($(memoStatus).getText().includes(status), 'Memo Status is not coming correct')
        console.log("Memo Status is coming correct as " + status)

    }
    verifyInvoiceStatusOnLinkPage(status) {
        action.waitTillPageLoaded()
        assert($(invoiceStatusOnLinkPage).getText().includes(status), 'Invoice Status is not coming correct')
        console.log("Invoice Status is coming correct as " + status)
    }
    verifyMomoStatusPartiallyLinkedOnBalancePage() {
        action.waitTillPageLoaded()
        assert($(memoPartiallyLinkedStatus).getText().includes('Partially Linked'), 'Memo Status is not coming correct as Partially Linked')
        console.log("Memo Status is coming correct as Partially Linked")
    }
    verifyMomoStatusCapturedOnBalancePage() {
        action.waitTillPageLoaded()
        assert($(memoCapturedStatus).getText().includes('Captured'), 'Memo Status is not coming correct as Captured')
        console.log("Memo Status is coming correct as Captured")

    }
    verifyMomoStatusLinkedOnBalancePage() {
        action.waitTillPageLoaded()
        assert($(memoLinkedStatus).getText().includes('Linked'), 'Memo Status is not coming correct as Linked')
        console.log("Memo Status is coming correct as Linked")

    }
    verifyMomoStatusOnHoldOnBalancePage() {
        action.waitTillPageLoaded()
        assert($(memoOnHoldStatus).getText().includes('On Hold'), 'Memo Status is not coming correct as On Hold')
        console.log("Memo Status is coming correct as On Hold")

    }

    verifyInvoiceSearchTextField() {
        action.waitTillPageLoaded()
        action.mediumWait()
        assert(action.isPresent(invoiceNumberTextField), 'Invoice search page is not displayed')
    }

    deleteInvoice() {
        action.click(deleteThisInvoice)

    }
    VerifyConfirmationMessageAfterDeletion() {
        assert($(deleteConfirmationMessage).getText().includes('has been successfully deleted'))
        console.log('Confirmation message has been verified')
    }

    verifyInvoiceStatusCaptured() {
        action.waitTillPageLoaded()
        action.mediumWait()
        assert($(inVoiceStatus).getText().includes('Captured'), 'Invoice status is not coming as captured')
    }

    verifyInvoiceStatusPartialLinking() {
        action.waitTillPageLoaded()
        assert($(inVoiceStatus).getText().includes('Partially Linked'), 'Invoice status is not coming as Partially Linked')
    }

    selectWorkOrderMatchAddAnotherRadio() {
        action.waitTillPageLoaded()
        action.click(workOrderMatchAddAnotherRadio)
    }
    selectWorkOrderDoesntMatchSearchAgainRadio() {

        action.click(WorkOrderDoesntMatchSearchAgainRadio)
    }
    selectWorkOrderDoesntHoldRadio() {

        action.click(WorkOrderDoesntMatchHoldRadio)
    }
    selectHoldReason(index) {
        action.selectByIndex(holdReasonsSelect, index)
    }

    selectHoldReasonOnLinking(index) {
        action.selectByIndex(holdReasonSelectOnLinking, index)
    }

    selectHoldReasonOnPOSearch(index) {
        action.selectByIndex(holdReasonsSelectOnPoSearch, index)

    }
    verifyHoldReason() {
        action.waitTillPageLoaded()
        console.log('Hold Reason =>' + $(holdReasonsSelect).getValue())
        assert($(holdReasonsSelect).getValue() != '', 'Hold reason not selected')
        console.log('Verified :Hold reason is selected')
    }

    verifyHoldReasonOnLinking() {
        action.waitTillPageLoaded()
        console.log('Hold Reason =>' + $(holdReasonSelectOnLinking).getValue())
        assert($(holdReasonSelectOnLinking).getValue() != '', 'Hold reason not selected')
        console.log('Verified :Hold reason is selected')
    }
    verifyRemoveHoldRadio() {
        action.waitTillPageLoaded()
        assert(action.isPresent(removeHoldRadio), 'Remove hold option does not get available')
        console.log('Disable attribute => ' + $(removeHoldRadio).getAttribute('disabled'))
        assert($(removeHoldRadio).getAttribute('Disabled') == null, 'Remove hold radio button is not visible')
        console.log('Remove hold option gets available')

    }

    verifyRemoveHoldRadioOnLinking() {
        action.waitTillPageLoaded()
        assert(action.isPresent(removeHoldRadioOnLinking), 'Remove hold option does not get available')
        console.log('Disable attribute => ' + $(removeHoldRadioOnLinking).getAttribute('disabled'))
        assert($(removeHoldRadioOnLinking).getAttribute('Disabled') == null, 'Remove hold radio button is not visible')
        console.log('Remove hold option gets available')

    }

    selectRemoveHoldRadio() {
        action.click(removeHoldRadio)
    }
    selectRemoveHoldRadioOnLinking() {
        action.click(removeHoldRadioOnLinking)
    }
    verifyHoldRemoved() {
        action.waitTillPageLoaded()
        console.log('Hold Reason =>' + $(holdReasonsSelectAfterRemoveOption).getValue())
        assert($(holdReasonsSelectAfterRemoveOption).getValue() == '', 'Hold reason is not removed')
    }


    verifyAddedNote() {
        action.waitTillPageLoaded()
        action.click(statusCommentsLink)
        browser.switchWindow('notesPop')
        console.log('Notes field text => ' + $(notesInput).getValue())
        assert($(notesInput).getValue().includes('Note added by automation'), 'Newly added notes could not be verified')
        browser.closeWindow();
        browser.switchWindow('WorkOrder')

    }
    verifyAddedNoteForPO() {
        action.waitTillPageLoaded()
        action.click(statusCommentsLink)
        browser.switchWindow('notesPop')
        console.log('Notes field text => ' + $(notesInput).getValue())
        assert($(notesInput).getValue().includes('Note added by automation'), 'Newly added notes could not be verified')
        browser.closeWindow();
        action.smallWait()
        browser.switchWindow('PurchaseOrder')

    }

    addNewNote() {
        action.click(statusCommentsLink)
        browser.switchWindow('notesPop')
        action.waitTillPageLoaded()
        action.setValue(notesInput, 'Note added by automation')
        action.smallWait()
        action.click(submit)
        action.smallWait()
        browser.switchWindow('WorkOrder')
    }
    addNewNoteForPO() {
        action.click(statusCommentsLink)
        browser.switchWindow('notesPop')
        action.waitTillPageLoaded()
        action.setValue(notesInput, 'Note added by automation')
        action.click(submit)
        browser.switchWindow('PurchaseOrder')
    }


    clickOnShowLaborandPartDetailsLink() {
        action.mediumWait()
        action.click(showLaborandPartDetailsLink)
        action.waitTillPageLoaded()
    }

    verifyHideDetailLink() {
        action.waitTillPageLoaded()
        assert(action.isPresent(hideDetailsLink), 'Hide details link is not present')
        console.log('Hide details link is  present')
        if (action.isPresent(laborDetailsText)) {
            assert($(laborDetailsText).getText().includes('Labor Details'), 'Labor Details heading is not visible/expanded')
            console.log('Lobor details heading is expanded and visible')
        } else
            assert.fail('Labor Details heading is not visible/expanded or workorder does not have labor detais')
    }
    verifyHideDetailLinkonPopup() {
        action.waitTillPageLoaded()
        assert(action.isPresent(hideDetailsLink), 'Hide details link is not present')
        console.log('Hide details link is  present')
        if (action.isPresent(laborDetailsTextOnPopup)) {
            assert($(laborDetailsTextOnPopup).getText().includes('Labor Details'), 'Labor Details heading is not visible/expanded')
            console.log('Lobor details heading is expanded and visible')
        } else
            assert.fail('Labor Details heading is not visible/expanded or workorder does not have labor detais')
    }

    clickOnResetButton() {
        action.click(resetButton);
    }
    clickWorkOrderSubmit() {
        action.smallWait()
        action.click(submit)
    }
    clickPurchaseOrderSearch() {
        action.smallWait()
        action.click(search)
        action.waitTillPageLoaded()
    }
    clickOnContinueButton() {
        action.click(continueButton)
        action.waitTillPageLoaded()
    }
    clickOnContinueButtonWithValueContinue() {
        action.click(continueButtonWithValueContinue)
        action.waitTillPageLoaded()
    }

    enterFromAndToDate(fromDatevalue, toDatevalue) {
        this.clickOnResetButton();
        action.setValue(fromDate, fromDatevalue);
        action.setValue(toDate, toDatevalue);

    }
    verifylinkedWorkOrderlabel() {
        action.waitTillPageLoaded()
        assert(action.isPresent(toptabelheaderLabel), 'Currently Linking Invoice top table information is not displayed')
        assert($(linkedWorkOrderlabel).getText().includes('Currently Linking Invoice'), 'Matching Work Orders List is not displayed')

    }
    verifyPurchaseOrderResultslabel() {
        action.waitTillPageLoaded()
        assert(action.isPresent(purchaseOrderSearchResult), 'Purchase order results list  is not displayed')
        assert($(purchaseOrderSearchResult).getText().includes('Purchase Order Search Results'), 'Purchase order results list  is not displayed')
    }

    clickOnFirstWOLinkFromSearchResult() {
        WOnumberToVerify = $(workOrdernumberFromResult).getText();
        console.log('Work order number =>' + WOnumberToVerify)
        action.click(firstLinkWorkOrder);
        action.waitTillPageLoaded()

    }
    clickOnFirstInvoiceLinkFromSearchResult() {
        invoiceNumberToVerify = $(firstInvoiceNuberOnSearchResult).getText();
        console.log('Work order number =>' + invoiceNumberToVerify)
        action.click(firstLinkInvoice);
        action.waitTillPageLoaded()
    }

    clickOnFirstPOLinkFromSearchResult() {
        POnumberToVerify = $(purchaseOrdernumberFromResult).getText();
        console.log('Purchase order number =>' + POnumberToVerify)
        action.click(firstLinkPurchaseOrder);
        action.waitTillPageLoaded()

    }

    verifyInvoiceNumberOnDetailPage() {
        action.waitTillPageLoaded()
        assert($(invoiceNumberOnDetail).getText().includes(invoiceNumberToVerify), 'Invoice number is not matching')

    }
    verifyPartsInvoiceNumberOnDetailPage() {
        action.waitTillPageLoaded()
        assert($(PartsInvoiceNumberOnDetail).getText().includes(invoiceNumberToVerify), 'Invoice number is not matching')

    }


    verifyWOnumberOnDetailPage() {
        action.waitTillPageLoaded()
        assert($(workOrdernumberOnDetail).getText().includes(WOnumberToVerify), 'Work Order number is not matching')
    }
    verifyPOnumberOnDetailPage() {
        action.waitTillPageLoaded()
        assert($(purchaseOrdernumberOnDetail).getText().includes(POnumberToVerify), 'Purchase Order number is not matching')
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
    verifyPOdetailFromDatabase() {
        verifyDBcredential();
        const fs = require('fs');
        let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
        let TestData = JSON.parse(rawdata);
        const query = TestData["purchaseOrderDetail"] + POnumberToVerify + "'";
        console.log('Query=>' + query);
        console.log('---------------Before browser call--------');
        browser.call(() => executeSQLquery(query));
        console.log('---------------After browser call--------');
        var data = getSQLdata();
        console.log('--------------record count from Work Order Result Page--------');
        var totalRecord = recordCount(data);
        console.log('record count => ' + totalRecord)

        const salesOrderPoLabelElement = $(salesOrderPoLabel);
        const poTypeLabelElement = $(poTypeLabel);
        const statusPoLabelElement = $(statusPoLabel);
        const owenershipTypePoLabelElement = $(owenershipTypePoLabel);
        const vendorNamePoLabelElement = $(vendorNamePoLabel);


        assert(salesOrderPoLabelElement.getText() === data[0][0], 'Sales Order number is not matching');
        assert(poTypeLabelElement.getText() === data[0][1], 'Purchase Order Type is not matching');
        assert(statusPoLabelElement.getText() === data[0][2], 'Status is not matching');
        assert(owenershipTypePoLabelElement.getText() === data[0][3], 'OwserShip Type is not matching');
        assert(vendorNamePoLabelElement.getText() === data[0][4], 'Vendor name is not matching');

    }

    clickOnViewWorkOrderLink() {
        action.click(viewWorkOrderLink);
        action.waitTillPageLoaded()
        action.smallWait()
    }
    clickOnViewPurchaseOrderLink() {
        action.click(viewPurchaseOrderLink);
        action.waitTillPageLoaded()
        action.smallWait()
    }


    clickOnViewWorkOrderWithNotesLink() {
        action.click(viewWorkOrderLinkOnBalancePage);
        action.waitTillPageLoaded()
    }
    verifyNotesOnWorkOrderPopup(WOnumberToVerify) {
        browser.switchWindow('Display.do')
        action.waitTillPageLoaded()
        console.log('Switched to Popup window having Display.do')
        assert($(workOrderNumberOnPopup).getText().includes(WOnumberToVerify), 'Work Order number on popup window is not matching')
        browser.pause(1000);
        action.click(viewNotesLinkOnPopup)
    }
    verifyNotesOnPurchaseOrderPopup(POnumberToVerify) {
        action.switchToPopUpWindow()
        action.waitTillPageLoaded()
        console.log('Switched to Popup window having Display.do')
        assert($(purchaseOrderNumberOnPopup).getText().includes(POnumberToVerify), 'Work Order number on popup window is not matching')
        browser.pause(1000);
        action.click(viewNotesLinkOnPopupForPO)
    }



    verifyWordkOrderPopupOpensUp() {
        browser.switchWindow('Display.do')
        assert($(workOrderNumberOnPopup).getText().includes(WOnumberToVerify), 'Work Order number on popup window is not matching')
        console.log('Work Order number popup has been verified')
        browser.closeWindow();
        browser.switchWindow('Link.do')
    }

    verifyPurchaseOrderPopupOpensUp() {
        action.switchToPopUpWindow()
        console.log('Switched to popup window')
        action.waitTillPageLoaded()
        assert($(purchaseOrderNumberOnPopup).getText().includes(POnumberToVerify), 'Purchase Order number on popup window is not matching')
        console.log('Purchase Order number on popup has been verified')
        browser.closeWindow();
        browser.switchWindow('LINK=TRUE')
        console.log('Switched back to main window')
        action.waitTillPageLoaded()
    }
    fetchWorkOrderNumberHavingNotes() {
        verifyDBcredential();
        const fs = require('fs');
        let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
        let TestData = JSON.parse(rawdata);
        const query = TestData["workOrderNumberWithNotes"];
        console.log('Query=>' + query);
        console.log('---------------Before browser call--------');
        browser.call(() => executeSQLquery(query));
        console.log('---------------After browser call--------');
        var data = getSQLdata();
        console.log('--------------record count from purchaseOrderPage--------');
        return data[0][0]
    }
    fetchPurchaseOrderNumberHavingNotes() {
        verifyDBcredential();
        const fs = require('fs');
        let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
        let TestData = JSON.parse(rawdata);
        const query = TestData["purchaseOrderNumberWithNotes"];
        console.log('Query=>' + query);
        console.log('---------------Before browser call--------');
        browser.call(() => executeSQLquery(query));
        console.log('---------------After browser call--------');
        var data = getSQLdata();
        console.log('--------------record count from purchaseOrderPage--------');
        return data[0][0]
    }
    getPurchaseOrderNumberHavingOpenStatus() {
        verifyDBcredential();
        const fs = require('fs');
        let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
        let TestData = JSON.parse(rawdata);
        const query = TestData["OpenPO"];
        console.log('Query=>' + query);
        console.log('---------------Before browser call--------');
        browser.call(() => executeSQLquery(query));
        console.log('---------------After browser call--------');
        var data = getSQLdata();
        console.log('--------------record count from purchaseOrderPage--------');
        return data[0][0]
    }
    enterWorkOrderNumber(workOrderNumber) {
        this.clickOnResetButton();
        action.setValue(netJetWorkOrder, workOrderNumber)

    }
    enterPurchaseOrderNumber(purchaseOrderNumber) {
        this.clickOnResetButton();
        action.smallWait()
        action.setValue(purchaseOrderForSearch, purchaseOrderNumber)

    }
    clickOnViewNotesLink() {
        if (!($$(noneNotesText).length === 0)) {
            action.click(viewNotesLink);
        } else {
            console.log('View notes link is not present,there might be no notes in selected work order')
        }

    }
    clickOnViewNotesLinkOnPO() {

        action.click(viewNotesLinkOnPO);

    }
    verifyNotesSection() {
        console.log('Number of Notes found =>' + $$(firstnotes).length)
        if ($$(firstnotes).length === 0) {
            assert.fail('No notes found in selected work order')
        }
        console.log('firstnotes=== >', $(firstnotes).getText())
    }
    verifyNotesSectionForPO() {
        console.log('Number of Notes found =>' + $$(firstnotesForPO).length)
        if ($$(firstnotesForPO).length === 0) {
            assert.fail('No notes found in selected work order')
        }
        console.log('firstnotes For PO=== >', $(firstnotesForPO).getText())
    }
    verifyNotesSectionOnWorkOrderPopup() {
        console.log('Number of Notes found =>' + $$(firstnotesOnWorkOrderPopup).length)
        if ($$(firstnotesOnWorkOrderPopup).length === 0) {
            assert.fail('No notes found in selected work order')
        }
        console.log('firstnotesOnWorkOrderPopup=== >', $(firstnotesOnWorkOrderPopup).getText())
    }
    verifyNotesSectionOnPurchaseOrderPopup() {
        action.waitTillPageLoaded()
        console.log('Number of Notes found =>' + $$(firstnotesOnPurchaseWorkOrderPopup).length)
        if ($$(firstnotesOnPurchaseWorkOrderPopup).length === 0) {
            assert.fail('No notes found in selected work order')
        }
        console.log('firstnotesOnWorkOrderPopup=== >', $(firstnotesOnPurchaseWorkOrderPopup).getText())

    }
    verifyErrorWhileSearchingWithoutWorkOrdercriteria() {
        var errorElement = $(errorMessage)
        var errorMessageUI = "" + errorElement.getText();
        var errorCheck = "At least one criteria must be chosen";
        assert(errorMessageUI.includes(errorCheck), "Error message:At least one criteria must be chosen for an work order search not displayed")

    }

    selectWorkOrderMatchesInvoiceRadio() {
        action.click(workOrderMatchesInvoiceRadio)

    }
    selectInvoiceMatchesMemoRadio() {
        action.click(invoiceMatachesMemo)
    }
    selectinvoiceMatchesLinkAgainMemoRadio() {
        action.click(invoiceMatchesLinkAgainMemo)
    }
    selectInvoiceDoesNotMatchContinueMemoRadio() {
        action.click(invoiceDoesNotMatchContinueMemo)
    }
    selectInvoiceDoesNotMatchSearchAgainRadio() {
        action.click(invoiceDoesNotMatchSearchAgainMemo)
    }
    clickOnSubmitButton() {
        action.click(submit);
    }



    enterOpenClaimNumber(openClaimNumber) {
        action.setValue(claimNumberSearchInput, openClaimNumber)
    }
    clickToOverRideFleet() {
        console.log('fleetOverride not present if 0 =>', $$(fleetOverride).length)
        if ($$(fleetOverride).length === 1) {
            action.click(submit);
        }
    }
    verifyOverRideFleetMessage() {
        action.waitTillPageLoaded()
        assert(action.isPresent(fleetOverride), 'Fleet override message not displayed')
    }
    getInvoiceBalanceDetails() {
        action.waitTillPageLoaded()
        var laborTotal = $(laborTotalMsg).getText().replace('$', '').replace(',', '');
        var partTotal = $(partTotalMsg).getText().replace('$', '').replace(',', '');
        var otherTotal = $(otherTotalMsg).getText().replace('$', '').replace(',', '');
        var linesTotal = $(linesTotalMsg).getText().replace('$', '').replace(',', '');
        var headerTotal = $(headerTotalMsg).getText().replace('$', '').replace(',', '');
        var balanceDifference = $(differenceMsg).getText().replace('$', '').replace(',', '');

        console.log('Labor Total=>', laborTotal)
        console.log('Part Total=>', partTotal)
        console.log('Other Total=>', otherTotal)
        console.log('LinesTotal=>', linesTotal)
        console.log('HeaderTotal=>', headerTotal)
        console.log('Balance Difference=>', balanceDifference)

        if (parseFloat(balanceDifference) > 0) {
            console.log('Invoice is not balanced')
        }

    }

    getWorkOrderNumberHavingDifferentFleet() {
        verifyDBcredential();
        const fs = require('fs');
        let rawdataFleet = fs.readFileSync('./test-data/serviceInvoiceCapture.json');
        let TestDataFleet = JSON.parse(rawdataFleet);

        let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
        let TestData = JSON.parse(rawdata);
        const query = TestData["woNumberWithDifferentFleet"] + TestDataFleet["Fleet Assignment"] + "'";
        console.log('Query=>' + query);
        console.log('---------------Before browser call--------');
        browser.call(() => executeSQLquery(query));
        console.log('---------------After browser call--------');
        var data = getSQLdata();
        console.log('--------------record count from Work Order Result Page--------');
        var totalRecord = recordCount(data);
        console.log('record count => ' + totalRecord)
        console.log('work order number with different fleet than invoice =>' + data[0][0])
        return data[0][0]

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
            var element = $("//table[4]/tbody/tr/td/table/tbody/tr[" + i + "]/td[" + column + "]");
            //table[4]/tbody/tr/td/table/tbody/tr/td[2]
            columnData[i - 1] = element.getText();
        }
        return columnData;
    }

    verifyColumnSortingAscending(column) {
        action.waitTillPageLoaded()
        column = parseInt(column);
        console.log('---inside first method-column ====>' + column)
        var columnData = this.getColumnValuesFromWorkOrderSearchResultTable(column);
        console.log('-------------------columnData---------------------');
        console.log(columnData);
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


    clickOWorkOrderSort() {
        action.click(workOrderSortLink)
    }


}

export const invoiceLinkPage = new InvoiceLinkPageClass();