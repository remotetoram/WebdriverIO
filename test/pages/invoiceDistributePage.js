import { action } from '../support/user.command';
import { getUninqueNumber } from '../../util/commonUtilities';
var chai = require('chai');
var assert = chai.assert;
/*-----------------Element Locators on page------------------------*/

const submit = '[type="submit"]';
const resetButton = '[value="Reset"]';
const fromDate = '[name="fromDate"]';
const toDate = '[name="toDate"]';
const errorMessage = '/html/body/span/font/b/ul/li'
const reconcileTabColor = '//table[3]/tbody/tr/td[4]'
const continueButton = '[type="submit"]'
const distributeTabColor = '//table[3]/tbody/tr/td[5]'
const invoiceNumberLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[3]/td[2]'
const salesNumberLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[5]/td[2]'
const receivedDateLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[6]/td[2]'
const invoiceVendorLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[7]/td[2]'
const remitToVendorLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[8]/td[2]'
const fleetAssignmentLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[9]/td[2]'
const companyLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[10]/td[2]'
const assignedToLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[11]/td[2]'
const invoiceStatusLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[3]/td[4]'
const invoiceDateLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[4]/td[4]'
const invoiceTotalLabel = '//table[4]/tbody/tr/td[1]/table/tbody/tr[5]/td[4]'
const editInvoice = '//table/tbody/tr/td/table/tbody/tr[2]/td/a[3]'
const editInvoiceHeaderLabel = '//table/tbody/tr[1]/td'
const memoStatusAsApproved = '//table[4]/tbody/tr/td[1]/table[1]/tbody/tr[3]/td[4]/b'
const invoiceStatusAsApproved = '//table[4]/tbody/tr/td[1]/table/tbody/tr[3]/td[4]'
const distributePageLabel = '//table/tbody/tr/td[1]/table/tbody/tr[2]/th/div'
const firstCheckBox = '//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[2]/td[1]/div/input[1]'
const sellectAll = '=Select All'
const deSelectAll = '=Deselect All'
const selectDistributable = '=Select Distributable'
const distributeButton='[title="Distribute"]'
const distributedMessage='/html/body/table[3]/tbody/tr[4]/td'



/*---------------------------Veriables used-----------------------*/


class InvoiceDistributePageClass {

    clickOnSubmitButton() {
        action.click(submit)
    }
    verifyMomoStatusCapturedOnDistributedPage() {
        action.waitTillPageLoaded()
        assert($(memoStatusAsApproved).getText().includes('Approved'), 'Memo Status is not coming correct as Approved')
        console.log("Memo Status is coming correct as Approved")
    }
    verifyInvoiceStatusApprovedOnDistributedPage() {
        action.waitTillPageLoaded()
        assert($(invoiceStatusAsApproved).getText().includes('Approved'), 'Invoice Status is not coming correct as Approved')
        console.log("Invoice Status is coming correct as Approved")


    }

    verifyDistributePage() {
        var distributeTabElement = $(distributeTabColor)
        console.log('distributeTabColor BG color =>' + distributeTabElement.getAttribute('bgcolor'))
        assert(distributeTabElement.getAttribute('bgcolor') == '#FFFFFF', 'Distribute tab is not visible in white background')
        console.log('Distribute tab is visible in white background')
        assert($(invoiceStatusLabel).getText() == 'Approved', 'Invoice/Memo status is not coming as Approved')
        console.log('Invoice/Memo status is coming as Approved')
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
        assert(action.isPresent(assignedToPopup), 'assignedTo field is not present on edit popup')
        //action.selectByVisibleText(assignedToPopup, 'Unknown') Observation
        action.setValue(invoiceDatePopup, '10/30/2020')
        console.log('Invoice Information has been changed')
        action.click(submitEditPopup)

        console.log('Clicked on update button to make changes')
        action.mediumWait()
        browser.switchWindow('/DistributeDisplay.do')
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

    }

    verifyDistributeInvoicePage() {
        action.waitTillPageLoaded()
        assert($(distributePageLabel).getText().includes('Distribute Invoices/Memos'), 'Distribute Invoices/Memos page did not open')
        console.log('Distribute Invoices/Memos page gets opened')

    }
    enterFromAndToDate(fromDatevalue, toDatevalue) {
        action.waitTillPageLoaded()
        this.clickOnResetButton();
        action.setValue(fromDate, fromDatevalue);
        action.setValue(toDate, toDatevalue);

    }
    clickOnResetButton() {
        action.click(resetButton);
    }
    verifyResultsPage() {
        action.waitTillPageLoaded()
        assert(!action.isPresent(errorMessage), 'No items matched your search criteria. Please change distributeFromDate/ToDate in test-data/dateRangeSearchUI.json file')
        assert(action.isPresent(firstCheckBox), 'Search Results did not come. Please change your criteria and search again.')
        console.log('Search results appeared')
    }

    clickOnSelectDistributable() {
        action.waitTillPageLoaded()
        action.click(selectDistributable)
    }
    clickOnSelectAll() {
        action.waitTillPageLoaded()
        action.click(sellectAll)
    }
    clickOnDeSelectAll() {
        action.waitTillPageLoaded()
        action.click(deSelectAll)
    }
    VerifyAllSelected() {
        action.waitTillPageLoaded()
        const distributeTotalRows = '//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/input[1]'
        const elements = $$(distributeTotalRows);
        var columnData = new Array(elements.length)
        console.log("Number of result=>" + elements.length);
        /* Starting from 2nd row as first row is table header*/
        for (var i = 2; i <= elements.length + 1; i++) {
            var element = $("//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[" + i + "]/td[1]/div/input[1]");
            // console.log("Checked attribute for "+(i-1)+ " Number=> "+ $(element).getAttribute('checked'))
            assert($(element).getAttribute('checked'), 'Checkbox is not checked after select All')
        }
        console.log('All rows are selected')
    }
    VerifyNoneSelected() {
        action.waitTillPageLoaded()
        const distributeTotalRows = '//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/input[1]'
        const elements = $$(distributeTotalRows);
        var columnData = new Array(elements.length)
        console.log("Number of result=>" + elements.length);
        /* Starting from 2nd row as first row is table header*/
        for (var i = 2; i <= elements.length + 1; i++) {
            var element = $("//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[" + i + "]/td[1]/div/input[1]");
            //  console.log("Checked attribute for "+ (i-1)+ " line Number=> "+ $(element).getAttribute('checked'))
            assert(!$(element).getAttribute('checked'), 'This item is checked after deselect All')
        }
        console.log('None of rows are selected')
    }
   

VerifyOnlyDistributableSelected() {
    action.waitTillPageLoaded()
    const distributeTotalRows = '//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/input[1]'
    const elements = $$(distributeTotalRows);
    var columnData = new Array(elements.length)
    console.log("Number of result=>" + elements.length);
    /* Starting from 2nd row as first row is table header*/
    for (var i = 2; i <= elements.length + 1; i++) {

        var status = $("//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[" + i + "]/td[10]/div").getText().includes('On Hold');
        var associatedInvoiceStatus = $("//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[" + i + "]/td[11]/div").getText().includes('On Hold');
        var element = $("//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[" + i + "]/td[1]/div/input[1]");
        if ((status == true) || (associatedInvoiceStatus == true)) {
            console.log("Checked attribute for " + (i - 1) + " line Number=> " + $(element).getAttribute('checked'))
            assert(!$(element).getAttribute('checked'), 'This item is checked even if it has got On Hold status')

        }else{
            assert($(element).getAttribute('checked'), 'Checkbox is not checked even if this item is Distributable')
        }


    }
    console.log('Select Distributable link is working fine')
}


selectDistributableInvoice() {
    action.waitTillPageLoaded()
    const distributeTotalRows = '//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr/td[1]/div/input[1]'
    const elements = $$(distributeTotalRows);
    var columnData = new Array(elements.length)
    console.log("Number of result=>" + elements.length);
    /* Starting from 2nd row as first row is table header*/
    for (var i = 2; i <= elements.length + 1; i++) {

        var status = $("//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[" + i + "]/td[10]/div").getText().includes('On Hold');
        var associatedInvoiceStatus = $("//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[" + i + "]/td[11]/div").getText().includes('On Hold');
        var element = $("//table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[" + i + "]/td[1]/div/input[1]");
        if ((status == true) || (associatedInvoiceStatus == true)) {
            console.log("Skip this item as its not distributable")
         }else{
            action.click(element)
            break;
           
        }
    }
    console.log('Distributable item has been selected')
}
selectDistributeButton(){
    action.waitTillPageLoaded()
    action.click(distributeButton)
}
verifyDistributedMessage(){
   
    action.waitTillPageLoaded()
    assert($(distributedMessage).getText().includes('was successfully distributed.'), 'Successfully distributed message did not appear')
    console.log('Successfully distributed message appeared')
}
}

export const invoiceDistributePage = new InvoiceDistributePageClass();