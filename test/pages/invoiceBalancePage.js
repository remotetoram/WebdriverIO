import { action } from '../support/user.command';
import { getUninqueNumber } from '../../util/commonUtilities';
var chai = require('chai');
var assert = chai.assert;
/*-------------------Invoice information------------------------*/
const continueButton = '[type="submit"]'
const editMemo = '//table[4]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/a[3]'
const memoTotal = '[name="total"]'
const amountLabel='//form/table/tbody/tr[5]/td[1]/strong'
const balanceMemoRadio = '//table[4]/tbody/tr/td[3]/form/table/tbody/tr[2]/td[1]/input'
const partTransactionTable = '//*[@id="PartTransactions"]'
const saveAndCloseButton = '[value="Save and Close"]'
const saveButton = '[value="Save"]'
const addLineItemButton = '[value="Add a line"]'
const invoiceNumberLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[3]/td[2]'
const salesNumberLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[5]/td[2]'
const receivedDateLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[6]/td[2]'
const invoiceVendorLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[7]/td[2]'
const remitToVendorLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[8]/td[2]'
const fleetAssignmentLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[9]/td[2]'
const companyLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[10]/td[2]'
const assignedToLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[11]/td[2]'
const invoiceStatusLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[3]/td[4]'
const invoiceDateLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[4]/td[4]'
const invoiceTotalLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[5]/td[4]'

const invoiceNumberPopup = '//table/tbody/tr[2]/td[2]/input'
const salesNumberPopup = '//table/tbody/tr[4]/td[2]/input'
const receivedDatePopup = '//table/tbody/tr[5]/td[2]/input'
const invoiceVendorPopup = '//table/tbody/tr[7]/td/select'
const remitToVendorPopup = '//table/tbody/tr[8]/td/input'
const fleetAssignmentPopup = '//table/tbody/tr[9]/td/select'
const companyPopup = '//table/tbody/tr[10]/td/select'
const assignedToPopup = '//table/tbody/tr[11]/td/select'
const invoiceStatusPopup = '//table/tbody/tr[2]/td[4]'
const invoiceDatePopup = '//table/tbody/tr[3]/td[4]/input'
const invoiceTotalPopup = '//table/tbody/tr[4]/td[4]/input'

const submit = '[type="submit"]';
const submitEditPopup = '[title="Submit this form. Shortcut key : Alt + U"]'
const closeEditPopup = '[title="Close this form without changes. Shortcut key : Alt + C"]'
const laborTotalMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[3]/b'
const partTotalMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[5]/b'
const otherTotalMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[7]/b'
const linesTotalMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[9]/b'
const headerTotalMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[11]/b'
const differenceMsg = '//*[@id="divStayTopLeft"]/table/tbody/tr/td[13]/b'
const editInvoice = '//table/tbody/tr/td/table/tbody/tr[2]/td/a[3]'
const editInvoiceHeaderLabel = '//table/tbody/tr[1]/td'
const invoiceTotalInput = '[name="total"]';

const workOrderNumberOnPopup = '//table[3]/tbody/tr[1]/td[1]/table/tbody/tr[1]/td[2]/strong'
const purchaseOrderNumberOnPopup = '//table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/a/strong'
const viewWorkOrderLinkOnBalancePage = '//table[1]/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[1]/td[2]/strong/a'
const viewPurchaseOrderLinkOnBalancePage = '//table[1]/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/a/strong'
const viewNotesLinkOnPopup = '//table[3]/tbody/tr[1]/td[1]/table/tbody/tr[7]/td[4]/a'
const firstnotes = '//table[4]/tbody/tr[2]/td/strong'


const holdRadio = '//*[@id="HOLD"]'
const holdReasonSelect = '//table[1]/tbody/tr/td[3]/table/tbody/tr[3]/td[2]/select'

const holdReasonSelectMemo = '//select[@name="holdReasonValues"]'
const firstZbutton = '//*[@id="0Button"]'
const firstMiscZbutton = "//input[@id='MISCLINESButton']"
const addEditMisc='=Add / Edit misc. memo lines' 
const firstMiscZbuttonOnMemo="//input[@id='miscLinesButton']"
const firstCommentArea = "//textarea[@name='invoiceLineItems[0].comments']"
const descriptionText = "//input[@value='Z'][@tabindex='1']"
const linesItemsCount = '//*[contains(@name,"costStructure.costCategoryId")]'
const statusCommentsLink = '=Status Comments'
const notesInput = '[name="notes"]'
const descriptionLineItems = '//html/body/form/a/table[1]/tbody/tr'



class InvoiceBalancePageClass {
    verifyBalanceMemoHoldRadioSelected() {
        action.waitTillPageLoaded()
        assert(action.isPresent(balanceMemoRadio), 'Balance Memo radio option does not get available')
        console.log('Checked attribute => ' + $(balanceMemoRadio).getAttribute('checked'))
        assert($(balanceMemoRadio).getAttribute('checked') == 'true', 'Balance Memo radio button is not checked')
        console.log('Balance Memo radio button is already checked')
    }
    clickOnSaveButton() {
        action.click(saveButton)
        console.log('clicked on save button')
     }

    verifyAddedNote() {
        action.click(statusCommentsLink)
        browser.switchWindow('notesPop')
        action.waitTillPageLoaded()
        assert(action.isPresent(notesInput), 'Notes area is not visible')
       console.log('Notes field text => ' + $(notesInput).getValue())
        assert($(notesInput).getValue().includes('Note added by automation'), 'Newly added notes could not be verified')
        action.click(submit)
        browser.switchWindow('/BalanceDisplay.do')

    }

    addNewNote() {
        action.click(statusCommentsLink)
        action.mediumWait()
        browser.switchWindow('notesPop')
        action.longWait()
        action.waitTillPageLoaded()
        assert(action.isPresent(notesInput), 'Notes area is not visible')
        action.setValue(notesInput, 'Note added by automation')
        action.click(submit)
        action.mediumWait()
        browser.switchWindow('/BalanceDisplay.do')
    }
    verifyAddedLineItemForMemo() {
        action.waitTillPageLoaded()
        const descriptionLineItemsForMemo='/html/body/table[6]/tbody/tr'
        var count = $$(descriptionLineItemsForMemo).length
        console.log('Total Line Items =>' + count)
        var descPresent = false
        for (var i = 1; i < count+1; i++) {
            var lineItemDescOnParentPage = "/html/body/table[6]/tbody/tr[" + i + "]/td[3]"
            console.log("Total Text=>" + $(lineItemDescOnParentPage).getText())
            if ($(lineItemDescOnParentPage).getText().includes('-$5.00')) {
                console.log('Added line item found on main screen on line number')
                descPresent = true
                break
            }

        }
        if (descPresent == false) {
            assert.fail('Added line item not found on main screen')
        }
    }
    verifyAddedLineItem() {
        action.waitTillPageLoaded()
        var count = $$(descriptionLineItems).length
        console.log('Total Line Items =>' + count)
        var descPresent = false
        for (var i = 3; i < count + 2; i++) {
            var lineItemDescOnParentPage = "//html/body/form/a/table[1]/tbody/tr[" + i + "]/td[5]"
            console.log("Total Text=>" + $(lineItemDescOnParentPage).getText())
            if ($(lineItemDescOnParentPage).getText().includes('$51.00')) {
                console.log('Added line item found on main screen on line number')
                descPresent = true
                break
            }

        }

        if (descPresent == false) {
            assert.fail('Added line item not found on main screen')
        }
    }
    getCountOfExistingLineItems() {
        action.waitTillPageLoaded()
        console.log('Existing Line Items =>' + $$(linesItemsCount).length)
        return $$(linesItemsCount).length
    }
    // getCountOfExistingLineItemsOnMemo() {
    //     action.waitTillPageLoaded()
    //     console.log('Existing Line Items =>' + $$(linesItemsCountMemo).length)
    //     return $$(linesItemsCountMemo).length
    // }

    clickOnAddLineItemButton() {
        action.waitTillPageLoaded()
        assert(action.isPresent(addLineItemButton), 'Add Line Item button is not present there might be zero line items to start with,Please refer to CARMA-610')
        action.click(addLineItemButton)
        console.log('clicked on Add Line Item button')
    }
    addLineItemForTaxes(existingLineItems) {
        action.waitTillPageLoaded()
        var catagorySelect = "//select[@name='invoiceLineItems[" + existingLineItems + "].costStructure.costCategoryId']"
        var total = "//input[@name='invoiceLineItems[" + existingLineItems + "].costStructure.actTotal']"
        action.selectByVisibleText(catagorySelect, 'Taxes')

        action.setValue(total, 11)
        browser.keys(['Control', 'a'])
        browser.keys(['5', '1'])
    }
    addLineItemForMemo(existingLineItems) {
        action.waitTillPageLoaded()
        var catagorySelect = "//select[@name='lineItems[" + existingLineItems + "].costStructure.costCategoryId']"
        var subCatagorySelect = "//select[@name='lineItems[" + existingLineItems + "].costStructure.subCostCategoryId']"
        var glAccount = "//select[@name='lineItems[" + existingLineItems + "].costStructure.glAccount']"
        var actTotal = "//input[@name='lineItems[" + existingLineItems + "].costStructure.actTotal']"
        action.selectByVisibleText(catagorySelect, 'Labor')
        action.selectByVisibleText(subCatagorySelect, 'Regular')
        action.smallWait()
        action.selectByVisibleText(glAccount, 'Maintenance - Labor')
        action.setValue(actTotal, '-$5.00')
        browser.keys(['Control', 'a'])
        browser.keys(['-','$','5','.', '0','0'])
      
    }
    clickOnsaveAndCloseButton(invoiceType) {
        action.click(saveButton)
        console.log('clicked on save button')
        action.mediumWait()
        action.click(saveAndCloseButton)
        console.log('clicked on save and close button')
        action.mediumWait()
        if (invoiceType.includes('Parts')) {
            if (browser.isAlertOpen()) {
                browser.acceptAlert()
            }
            if (browser.isAlertOpen()) {
                browser.acceptAlert()
            }
        }
    }

    clickOnfirstMiscZbutton() {
        action.click(firstMiscZbutton)
        console.log('clicked first Misc Z button')
    }
    clickOnfirstZbutton() {
        action.click(firstZbutton)
        console.log('clicked first Z button')
    }

    clickOnAddEditOnMemo(){
      action.click(addEditMisc)
      console.log('click on Add/Edit Misc line items')
    }
    clickOnfirstMiscZbuttonOnMemo() {
        action.click(firstMiscZbuttonOnMemo)
        console.log('clicked first Misc Z button')
    }
    verifyEditLineUpItemPopupOpen() {
        action.waitTillPageLoaded()
        action.mediumWait()
        assert(action.isPresent(saveAndCloseButton), "Edit line Item popup does not open")
        console.log('Edit line Item popup gets opened')
    }
    selectHoldRadio() {
        action.click(holdRadio)
    }
    selectHoldReason(index) {
        action.selectByIndex(holdReasonSelect, index)
    }
    selectHoldReasonMemo(index) {
        action.selectByIndex(holdReasonSelectMemo, index)
    }
    verifyHoldReasonMemo() {
        action.waitTillPageLoaded()
        console.log('Hold Reason =>' + $(holdReasonSelectMemo).getValue())
        assert($(holdReasonSelectMemo).getValue() != '', 'Hold reason not selected')
        console.log('Verified :Hold reason is selected')
    }
    verifyHoldReason() {
        action.waitTillPageLoaded()
        console.log('Hold Reason =>' + $(holdReasonSelect).getValue())
        assert($(holdReasonSelect).getValue() != '', 'Hold reason not selected')
        console.log('Verified :Hold reason is selected')
    }

    clickOnViewWorkOrderWithNotesLink() {
        action.click(viewWorkOrderLinkOnBalancePage);
    }
    clickOnViewPurchaseOrderWithNotesLink() {
        action.click(viewPurchaseOrderLinkOnBalancePage);
    }
    verifyWordkOrderPopupOpensUp(WOnumberToVerify) {
        browser.switchWindow('/Display.do')
        action.waitTillPageLoaded()
        action.waitTillPageLoaded()
        assert($(workOrderNumberOnPopup).getText().includes(WOnumberToVerify), 'Work Order number on popup window is not matching')
        console.log('WorkOrder number on  popup has been verified')
        browser.pause(1000);
    }
    verifyPurchasekOrderPopupOpensUp(POnumberToVerify) {
        action.switchToPopUpWindow()
        action.waitTillPageLoaded()
        assert($(purchaseOrderNumberOnPopup).getText().includes(POnumberToVerify), 'Work Order number on popup window is not matching')
        console.log('Purchase Order number on  popup has been verified')
    }
    clickOnViewNotes() {
        action.click(viewNotesLinkOnPopup)
    }
    verifyNotesSection() {
        action.waitTillPageLoaded()
        console.log('Number of Notes found =>' + $$(firstnotes).length)
        if ($$(firstnotes).length === 0) {
            assert.fail('No notes found in selected work order')
        }
        console.log('firstnotes=== >', $(firstnotes).getText())
        browser.closeWindow();
        browser.switchWindow('BalanceDisplay.do')
    }
  
    verifyPartTransactionOpensUp() {
        var partTransactionTablePresent;
        browser.switchWindow('Part Transactions History')
        action.waitTillPageLoaded()
        partTransactionTablePresent = action.isPresent(partTransactionTable)
        browser.pause(1000);
        browser.closeWindow();
        browser.switchWindow('PurchaseOrder')
        assert(partTransactionTablePresent === true, 'Part Transaction table is not displayed for selected PO');
        console.log('Part Transaction table is displayed for selected PO')
    }
    clickOnContinueButton() {
        action.click(continueButton)
    }
    clickOnSubmitButton() {
        action.click(submit)
    }

    getInvoiceBalanceMessage() {
        action.waitTillPageLoaded()
        if (action.isPresent(differenceMsg)) {
            console.log('Invoice balance message at bottom of the page appears')
            return true
        } else {
            return false;
        }
    }
    verifyInvoiceEditPopupOpensUp() {
        action.waitTillPageLoaded()
        browser.switchWindow('HeaderEditDisplay.do')
        assert($(editInvoiceHeaderLabel).getText().includes('Edit Invoice Header'), 'Edit invoice popup window did not open')
        console.log('Edit invoice popup window gets opened')
    }
    clickOnEditAndSetInvoiceTotalToZero() {
        action.smallWait()
        action.click(editInvoice)
        action.mediumWait()
        browser.switchWindow('HeaderEditDisplay.do')
        action.waitTillPageLoaded()
        assert($(editInvoiceHeaderLabel).getText().includes('Edit Invoice Header'), 'Edit invoice popup window did not open')
        console.log('Edit invoice popup window gets opened')
        action.setValue(invoiceTotalInput, '0.00')
        action.setValue(invoiceTotalInput, '0.00')
        console.log("Invoice Total value is set to=>" + $(invoiceTotalInput).getValue())
        action.click(submitEditPopup)
        console.log('Clicked on update button to make changes')
        browser.switchWindow('BalanceDisplay.do')
        action.VeryLongWait()
        action.waitTillPageLoaded()
        console.log('Switched back to main screen')
    }
    clickOnEditAndSetDebitMemoTotalToZero() {
        action.smallWait()
        action.click(editMemo)
        action.smallWait()
        action.switchToPopUpWindow()
        action.waitTillPageLoaded()
        assert(action.isPresent(memoTotal), 'Edit invoice popup window did not open')
        console.log('Edit invoice popup window gets opened')
        action.setValue(memoTotal, '')
        console.log("Invoice Total value is set to=>" + $(memoTotal).getValue())
        action.click(submitEditPopup)
        action.mediumWait()
        console.log('Clicked on update button to make changes')
        browser.switchWindow('MemoInvoice')
        console.log('Switched back to main screen')
        action.VeryLongWait()
        action.waitTillPageLoaded()
    }
    clickOnEditAndSetCreditMemoTotalToZero() {
        action.smallWait()
        action.click(editMemo)
        action.smallWait()
        action.switchToPopUpWindow()
        action.waitTillPageLoaded()
        assert(action.isPresent(memoTotal), 'Edit invoice popup window did not open')
        console.log('Edit invoice popup window gets opened')
        action.setValue(memoTotal, '')
        action.click(amountLabel)
        action.acceptAlert()
        console.log("Invoice Total value is set to=>" + $(memoTotal).getValue())
        action.click(submitEditPopup)
       
        action.mediumWait()
        console.log('Clicked on update button to make changes')
        browser.switchWindow('MemoInvoice')
        console.log('Switched back to main screen')
        action.VeryLongWait()
        action.waitTillPageLoaded()
         
    }
    clickOnEditAndEditInvoiceInformation() {

        console.log('invoiceNumberLabel => ' + $(invoiceNumberLabel).getText())
        console.log('salesNumberLabel => ' + $(salesNumberLabel).getText())
        console.log('receivedDateLabel => ' + $(receivedDateLabel).getText())
        console.log('invoiceVendorLabel => ' + $(invoiceVendorLabel).getText())
        console.log('remitToVendorLabel => ' + $(remitToVendorLabel).getText())
        console.log('invoiceNumberLabel => ' + $(invoiceNumberLabel).getText())
        console.log('fleetAssignmentLabel => ' + $(fleetAssignmentLabel).getText())
        console.log('companyLabel => ' + $(companyLabel).getText())
        console.log('assignedToLabel => ' + $(assignedToLabel).getText())
        console.log('invoiceStatusLabel => ' + $(invoiceStatusLabel).getText())
        console.log('invoiceDateLabel => ' + $(invoiceDateLabel).getText())
        console.log('invoiceTotalLabel => ' + $(invoiceTotalLabel).getText())

        action.click(editInvoice)
        browser.switchWindow('HeaderEditDisplay.do')
        action.waitTillPageLoaded()
        assert($(editInvoiceHeaderLabel).getText().includes('Edit Invoice Header'), 'Edit invoice popup window did not open')
        console.log('Edit invoice popup window gets opened')

        var tempInvoiceNumber = getUninqueNumber()
        action.setValue(invoiceNumberPopup, tempInvoiceNumber)
        action.setValue(salesNumberPopup, '12345')
        action.setValue(receivedDatePopup, '10/30/2020')
        action.selectByVisibleText(invoiceVendorPopup, 'AAROW AVIATION-MDW (MDW) (SERVICE)')
        action.setValue(remitToVendorPopup, '123')
        action.selectByVisibleText(fleetAssignmentPopup, 'CE-560')
        action.selectByVisibleText(companyPopup, 'NJE')
        assert(action.isPresent(assignedToPopup), 'assignedTo field is not present on edit popup')
        action.selectByIndex(assignedToPopup, 1)
        var assignedToValue = $(assignedToPopup).getValue()
        action.setValue(invoiceDatePopup, '10/30/2020')
        console.log('Invoice Information has been changed')
        action.click(submitEditPopup)

        console.log('Clicked on update button to make changes')
        action.mediumWait()
        browser.switchWindow('/BalanceDisplay.do')
        console.log('Switched back to main screen')
        action.waitTillPageLoaded()

        var valuesNotUpdated = "";
        if (!($(invoiceNumberLabel).getText() === tempInvoiceNumber)) {
            valuesNotUpdated += "Invoice Number field value not updated";
        }
        if (!($(salesNumberLabel).getText() === "12345")) {
            valuesNotUpdated += "/Sales Number field value not updated"
        }
        if (!($(receivedDateLabel).getText() === "10/30/2020")) {
            valuesNotUpdated += "/Invoice Number field value not updatedtting"
        }
        if (!($(invoiceVendorLabel).getText() === "AAROW AVIATION-MDW (MDW) (SERVICE)")) {
            valuesNotUpdated += "/Vendor field value not updated"
        }
        if (!($(remitToVendorLabel).getText() === "123")) {
            valuesNotUpdated += "/IRemit to vendor field value not updated"
        }

        if (!($(fleetAssignmentLabel)).getText() === "CE-560") {
            valuesNotUpdated += "/Fleet Assignment field value not updated"
        }

        if (!($(companyLabel).getText() === "NJE")) {
            valuesNotUpdated += "/Company field value not updated"
        }
        if (!($(assignedToLabel).getText() === assignedToValue)) {
            valuesNotUpdated += "/Assigned to field value not updated"
        }
        if (!($(invoiceDateLabel).getText() === "10/30/2020")) {
            valuesNotUpdated += "/Invoice date field value not updated"
        }

        console.log('valuesNotUpdated final =>' + valuesNotUpdated)
        assert(valuesNotUpdated === "", valuesNotUpdated);

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
        } else {
            console.log('Invoice is now balanced')
        }
        return balanceDifference
    }



}

export const invoiceBalancePage = new InvoiceBalancePageClass();