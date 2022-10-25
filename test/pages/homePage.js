import { action } from '../support/user.command';
var chai = require('chai');
var assert = chai.assert;
/*-----------------Element Locators on page------------------------*/
const invoicesMenuId = '#InvoicesMenuId';
const SearchMenuId = '#SearchMenuId';
const admin='#AdminMenuId'
const accountingMenuId = '#AccountingMenuId';
const invoiceCapture = '//*[contains(@src,"images/menu/capture.gif")]'
const PurchaseOrderLink = '//*[contains(@src,"images/menu/searchPurchaseOrder.gif")]'
const invoiceSearchLink = '//*[contains(@src,"images/menu/searchInvoice.gif")]'
const reviewInternalCosts = '//*[contains(@src,"images/menu/searchInternalWOs.gif")]'
const workOrderSearch = '//*[contains(@src,"images/menu/searchWorkOrder.gif")]'
const reviewIWAclaim='//*[contains(@src,"images/menu/searchReviewIWOClaims.gif")]'
const claimSearchLink='//*[contains(@src,"images/menu/searchClaim.gif")]'
const newClaimLink='//*[contains(@src,"images/menu/newClaim.gif")]'
const distributeLink='//*[contains(@src,"images/menu/adminDistInvoices.gif")]'


class HomePageClass {

    openNewClaimCapture() {
        action.hover(invoicesMenuId);
        action.click(newClaimLink);
    }
    openClaimSearchCapture() {
        action.hover(SearchMenuId);
        action.click(claimSearchLink);
    }

    openInvoiceCapture() {
        action.hover(invoicesMenuId);
        action.click(invoiceCapture);
    }
    selectPurchaseOrderSearch() {
        action.hover(SearchMenuId);
        action.click(PurchaseOrderLink);
    }
    selectInvoiceSearch() {
        action.hover(SearchMenuId);
        action.click(invoiceSearchLink);
    }
    selectReviewInternalCosts() {
        action.hover(accountingMenuId);
        action.click(reviewInternalCosts);
    }
    selectWorkOrdersSearch() {
        action.hover(SearchMenuId);
        action.click(workOrderSearch);
    }
    selectReviewIWAclaims() {
        action.hover(SearchMenuId);
        action.click(reviewIWAclaim);
    }
    selectDistributeInvoice() {
        action.hover(admin);
        action.click(distributeLink);
    }
}

export const homePage = new HomePageClass();