# CARMA UI AUTOMATION PROJECT

Test Automation is built on WebDriverIO/Cucumber with node.js, npm for the Node is used as package manager. It’s also implementing POM(Page object Model) design pattern. As in many test scenarios we need to use test data from database, we are using node-oracledb driver with oracle instant client.

## SOFTWARE INSTALLATION:
•	Install windows 64-bit Node.js (please visit [node.js org](https://nodejs.org/en/download/))

•	Install oracle instant client( please visit [Oracle.com](https://www.oracle.com/in/database/technologies/instant-client/winx64-64-downloads.html))

•	Install Chrome browser

## PROJECT SETUP:
•	Clone or download CARMA UI AUTOMATION project from [carma-ui-automation](https://stash.netjets.com/projects/AIRC/repos/carma-ui-automation/browse) GIT repository
     
•	Open Terminal and go to project root directory

•	Run below command, it will install all required npm packages
```bash
    npm i
```


## ENVIRONMENT VARIABLES SETUP: 

Set below Environment variables. These values will be used in execution at various stages.

•	TEST_URL

•	ORACLEDB_USER

•	ORACLEDB_PASSWORD

•	ORACLEDB_CONNECTSTRING

•	PATH_ORACLE_INSTANTCLIENT

•	APPLICATION_USERNAME

•	APPLICATION_PASSWORD


## RUNNING TEST EXECUTION:

To run automation test please execute below commands in terminal

###	Whole Test suite Execution
```bash
    npm run test --silent
```
###	Execution of specific feature file
```bash
	npx wdio wdio.conf.js --spec ./test/features/<feature file name>
```
    For example.
    >npx wdio wdio.conf.js --spec ./test/features/invoiceLinking.feature
    >npx wdio wdio.conf.js --spec ./test/features/invoiceBalancingParts.feature
   
    

###	Execution of specific TAGGED scenarios
 ```bash
	npx wdio wdio.conf.js --cucumberOpts.tagExpression='<@Tag>'
```
    For example..	
    npx wdio wdio.conf.js --cucumberOpts.tagExpression='@WIP'
    npx wdio wdio.conf.js --cucumberOpts.tagExpression='@DBConnection'



## TEST REPORT
•  Go To test-report folder under project

•  Open CARMA_AutomationReportOutput folder with latest timestamp

•  Open report folder and open index.html in browser

## DEBUGGING
•  Please put user browser.debug() where you want to hold the execution.

•  In Order to run test on visible chrome UI,Open wdip.conf.js file uncomment  below line
 ```bash
args: ['--start-maximized','--headless', '--disable-gpu']
```
•  We can use console.log() in order to see any variable value.

•  In order to increase execution hold time we can change timeout: 240000 to other value in wdip.conf.js

## IF NEED TO CHANGE TEST DATA
#### INVOICE/CLAIM CAPTURE DATA
•	Under test-data folder following JSON files are present.They all have required test data but in  case we need to change test data we can change here.

    •   creditMemoCapture.json
	•   debitMemoCapture.json
    •   invoiceClaimCapture.json
    •   partsInvoiceCapture.json
    •   serviceInvoiceCapture.json
    •   workorderClaimCapture.json  

#### SQL USED IN EXECUTION:
•	Under test-data folder sqlsUsed JSON file is present which contains sql we use to get test data from database.

    •   sqlsUsed.json

    
#### CHANGING ITEM SEARCH DATES:
•	Under test-data folder dateRangeSearchUI JSON file is present which contains dates which we are using to get data on QA Enviornment,if data is not available in test enviornment for the given dates we can change these dates here accordingly.

    •   dateRangeSearchUI.json

#### FEATURES USING DATES FROM TEST-DATA/dateRangeSearchUI.json

Feature:InvoiceReconciliationCreditMemo.feature,InvoiceReconciliationDebitMemo

Dates: invoicesForMemoLinkingFromDate,invoicesForMemoLinkingToDate

Feature:invoiceLinkingParts.feature,invoiceBalancingParts.feature,invoiceReconciliationParts.feature, claimCapture.feature

Dates : purchaseOrdersForPartsInvoiceFromDate,purchaseOrdersForPartsInvoiceToDate

Feature: searchInvoice.feature

Dates: memoFromDate,memoToDate,invoiceFromDate,invoiceToDate

Feature: invoiceLinking.feature,invoiceBalancing.feature,invoiceReconciliation.feature,searchWorkOrders.feature

Dates:workorderFromDate,workorderToDate

Feature: purchaseOrder.feature

Dates: purchaseOrderFromDate,purchaseOrderToDate

Feature:reviewIWOclaims.feature

Dates:internalWorkOrderFromDate,internalWorkOrderToDate

Feature:  ClaimCapture.feature

Dates:internalWorkOrderForClaimCaptureFeatureFromDate

Feature:  searchClaims.feature

Dates:internalWorkOrderForClaimCaptureFeatureFromDate

Feature: searchClaims.feature

Dates:WorkOrderClaimsHavingOpenStatusFromDate,
	WorkOrderClaimsHavingOpenStatusToDate,
	WorkOrderClaimsHavingDeniedStatusFromDate,
	WorkOrderClaimsHavingDeniedStatusToDate,
	WorkOrderClaimsHavingClosedStatusFromDate",
	WorkOrderClaimsHavingClosedStatusToDate",
	WorkOrderClaimsHavingCapturedStatusFromDate,
	WorkOrderClaimsHavingCapturedStatusToDate,
	WorkOrderClaimsHavingLinkedStatusFromDate,
	WorkOrderClaimsHavingLinkedStatusToDate,
	WorkOrderClaimsHavingPartiallyLinkedStatusFromDate,
	WorkOrderClaimsHavingPartiallyLinkedStatusToDate,
	invoiceClaimsHavingLinkedStatusFromDate,
	invoiceClaimsHavingLinkedStatusToDate,
	invoiceClaimsHavingOpenStatusFromDate,
	invoiceClaimsHavingOpenStatusToDate,
	invoiceClaimsHavingDeniedStatusFromDate,
	invoiceClaimsHavingDeniedStatusToDate,
	invoiceClaimsHavingClosedStatusFromDate,
	invoiceClaimsHavingClosedStatusToDate,
	invoiceClaimsHavingCapturedStatusFromDate,
	invoiceClaimsHavingCapturedStatusToDate,
	invoiceClaimsHavingPartiallyLinkedStatusFromDate,
	invoiceClaimsHavingPartiallyLinkedStatusToDate"# webdriverIO" 
"# webdriverIO" 
