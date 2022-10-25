import { action } from '../support/user.command';
import { getUninqueNumber } from '../../util/commonUtilities';
var chai = require('chai');
var assert = chai.assert;
/*-----------------Element Locators on page------------------------*/
 const saveButton='[title="Save memo. Shorcut key : Alt + S"]'
 const approveRadioButton='//*[@id="SAVE"]'
 const reconcileTabColor='//table[3]/tbody/tr/td[4]'
 const balanceTabColor='//table[3]/tbody/tr/td[3]'
 const continueButton = '[type="submit"]'
 const approveRadio= '[value="approveAll"]';
 const invoiceNumberLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[3]/td[2]'
 const salesNumberLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[5]/td[2]'
 const receivedDateLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[6]/td[2]'
 const invoiceVendorLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[7]/td[2]'
 const remitToVendorLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[8]/td[2]'
 const fleetAssignmentLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[9]/td[2]'
 const companyLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[10]/td[2]'
 const assignedToLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[11]/td[2]'
 const invoiceStatusLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[3]/td[4]'
 const invoiceStatusBalanceLabel = '//table[1]/tbody/tr/td[1]/table/tbody/tr[3]/td[4]'
 const invoiceDateLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[4]/td[4]'
 const invoiceTotalLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[5]/td[4]'

const invoiceNumberPopup = '//table/tbody/tr[2]/td[2]/input'
const salesNumberPopup = '//table/tbody/tr[4]/td[2]/input'
const receivedDatePopup = '//table/tbody/tr[5]/td[2]/input'
const invoiceVendorPopup = '//table/tbody/tr[7]/td/select'
const remitToVendorPopup = '//table/tbody/tr[8]/td/input'
const fleetAssignmentPopup = '//table/tbody/tr[9]/td/select'
const companyPopup = '//table/tbody/tr[10]/td/select'
const assignedToPopup = '//table/tbody/tr[11]/td/div/select'
const invoiceStatusPopup = '//table/tbody/tr[2]/td[4]'
const invoiceDatePopup = '//table/tbody/tr[3]/td[4]/input'
const invoiceTotalPopup = '//table/tbody/tr[4]/td[4]/input'
const editInvoice = '//table/tbody/tr/td/table/tbody/tr[2]/td/a[3]'
const editInvoiceHeaderLabel = '//table/tbody/tr[1]/td'
const viewWorkOrderLink  ='//table[4]/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[1]/td[2]/strong/a'
const viewPurchaseOrderLink='//table[4]/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/a/strong'
const workOrderNumberOnPopup='//table[3]/tbody/tr[1]/td[1]/table/tbody/tr[1]/td[2]/strong'
const viewNotesLinkOnPopup  ='//table[3]/tbody/tr[1]/td[1]/table/tbody/tr[7]/td[4]/a' 
const holdRadio = '//*[@id="HOLD"]'
const holdReasonSelect = '//table[4]/tbody/tr/td[3]/table/tbody/tr[3]/td[2]/select'
const holdReasonSelectAfterSubmit='//table[4]/tbody/tr/td[3]/table/tbody/tr[4]/td[2]/select'
const submit = '[type="submit"]';
const statusCommentsLink = '=Status Comments'
const notesInput = '[name="notes"]'
const descriptionLineItems = '//table[3]/tbody/tr/td[3]'
const unbalanceInvoiceRadio= '//*[@value="UNBALANCE"]'
const submitEditPopup='[title="Submit this form. Shortcut key : Alt + U"]'
const closeEditPopup='[title="Close this form without changes. Shortcut key : Alt + C"]'
const purchaseOrderNumberOnPopup='//table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/a/strong'
const  viewNotesLinkOnPopupforPO ='//*[@id="POHeaderTable"]/tbody/tr[7]/td[2]/a' 
const memoStatusAsBalanced='//table[4]/tbody/tr/td[1]/table[1]/tbody/tr[3]/td[4]/b'
const invoiceStatusOnReconcilePage='//table[4]/tbody/tr/td[1]/table/tbody/tr[3]/td[4]'


class InvoiceReconcilePageClass {

   clickOnApproveRadioButton(){
       action.click(approveRadioButton)
       console.log('Approve radio button is clicked')
   }
   clickOnSaveButton(){
    action.click(saveButton)
    console.log('Save button is clicked')
}
    verifyBalancePage() {
        var balanceTabElement=$(balanceTabColor)
        console.log('balanceTabElement BG color =>'+balanceTabElement.getAttribute('bgcolor'))
        assert(balanceTabElement.getAttribute('bgcolor')=='#FFFFFF','Reconcile tab is not visible in white background')
        console.log('Balance tab is visible in white background')
        assert($(invoiceStatusBalanceLabel).getText()=='On Hold','Invoice status is not coming as ON HOLD')
        console.log('Invoice status is coming as ON HOLD')
    }
    
    addNewNote() {
        action.click(statusCommentsLink)
        browser.switchWindow('notesPop')
        action.setValue(notesInput, 'Note added by automation')
        action.smallWait()
        action.click(submit)
        action.smallWait()
        browser.switchWindow('/ReconcileDisplay.do')
    }
    verifyAddedNote() {
        action.click(statusCommentsLink)
        action.smallWait()
        browser.switchWindow('notesPop')
        console.log('Notes field text => ' + $(notesInput).getValue())
        assert($(notesInput).getValue().includes('Note added by automation'), 'Newly added notes could not be verified')
        action.click(submit)
        browser.switchWindow('/ReconcileDisplay.do')

    }
    selectHoldRadio() {

        action.click(holdRadio)
    }
    selectUnbalanceInvoiceRadio() {
        assert(action.isPresent(unbalanceInvoiceRadio),'Unbalance radio button is not present: This is known BUG CARMA-967')
        action.click(unbalanceInvoiceRadio)
    }
    selectHoldReason(index) {
        action.selectByIndex(holdReasonSelect, index)
    }
    verifyHoldReason() {
        console.log('Hold Reason =>' + $(holdReasonSelectAfterSubmit).getValue())
        assert($(holdReasonSelectAfterSubmit).getValue() != '', 'Hold reason not selected')
        console.log('Verified :Hold reason is selected')
    }
    clickOnSubmitButton() {
        action.click(submit)
    }
    clickOnViewWorkOrderLink() {

         action.click(viewWorkOrderLink);
    }
    clickOnViewPurchaseOrderLink() {
          action.click(viewPurchaseOrderLink);
   }
    verifyWordkOrderWithNotesPopupOpensUp(workOrderNumberWithNotes) {
        browser.switchWindow('/Display.do')
       assert($(workOrderNumberOnPopup).getText().includes(workOrderNumberWithNotes), 'Work Order number on popup window is not matching')
       console.log('Work Order number popup has been verified')
       action.click(viewNotesLinkOnPopup)
    }
    verifyPurchaseOrderWithNotesPopupOpensUp(purchaseOrderNumberWithNotes) {
      action.switchToPopUpWindow()
      assert($(purchaseOrderNumberOnPopup).getText().includes(purchaseOrderNumberWithNotes), 'Purchase Order number on popup window is not matching')
       console.log('Purchase Order number popup has been verified')
       action.click(viewNotesLinkOnPopupforPO)
    }
    verifyPurchaseOrderWithWOPopupOpensUp(purchaseOrderWithWO) {
        action.switchToPopUpWindow()
        assert($(purchaseOrderNumberOnPopup).getText().includes(purchaseOrderWithWO), 'Purchase Order number on popup window is not matching')
         console.log('Purchase Order number popup has been verified')
         
      }
    selectApproveRadio(){
        action.click(approveRadio)
        console.log('Approve radio button has been selected')
        action.waitTillPageLoaded()
    }
 

    clickOnContinueButton() {
        action.click(continueButton)
        action.waitTillPageLoaded()
    }
    clickOnSubmitButton() {
        action.click(submit)
        action.waitTillPageLoaded()
    }
    verifyMomoStatusCapturedOnReconcilePage() {
        action.waitTillPageLoaded()
        assert($(memoStatusAsBalanced).getText().includes('Balanced'), 'Memo Status is not coming correct as Balanced')
        console.log("Memo Status is coming correct as Balanced")
        
    }
    
    verifyInvoiceStatusOnReconcilePage(){
        action.waitTillPageLoaded()
        assert($(invoiceStatusOnReconcilePage).getText().includes('Balanced'),'Invoice status is not coming as Balanced')
        console.log('Invoice status is coming as Balanced')
    }
    verifyReconcilePage() {
        action.waitTillPageLoaded()
        var reconcileTabElement=$(reconcileTabColor)
        console.log('reconcileTabElement BG color =>'+reconcileTabElement.getAttribute('bgcolor'))
        assert(reconcileTabElement.getAttribute('bgcolor')=='#FFFFFF','Reconcile tab is not visible in white background')
        console.log('Reconcile tab is visible in white background')
        assert($(invoiceStatusLabel).getText()=='Balanced','Invoice status is not coming as Balanced')
        console.log('Invoice status is coming as Balanced')
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
        //this.getInvoiceBalanceMessage()
        browser.switchWindow('HeaderEditDisplay.do')
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
        action.setValue(invoiceDatePopup, '10/30/2020')
        console.log('Invoice Information has been changed')
        action.click(submitEditPopup)

        console.log('Clicked on update button to make changes')
        action.mediumWait()
        browser.switchWindow('/ReconcileDisplay.do')
        console.log('Switched back to main screen')


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
        // if (!($(assignedToLabel).getText() === "Unknown")) {
        //     valuesNotUpdated += "/Assigned to field value not updated"
        // }
        if (!($(invoiceDateLabel).getText() === "10/30/2020")) {
            valuesNotUpdated += "/Invoice date field value not updated"
        }

        console.log('valuesNotUpdated final =>' + valuesNotUpdated)
        assert(valuesNotUpdated === "", valuesNotUpdated);

        console.log('-----now changed values are coming as---')
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

    }

   
   
}

export const invoiceReconcilePage = new InvoiceReconcilePageClass();