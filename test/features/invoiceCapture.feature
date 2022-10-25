@Sprint1-6 @Batch
Feature: CARMA invoice capture
     #CARMA-179
      Scenario: Invoice: Capture Invoice Landing
          Given I am in the Carma home landing
          When Clicking on capture
          Then Capture landing page shows

     # #CARMA-180
     Scenario: Invoice Capture: Enter Parts Invoice
          Given I am in the capture landing page
          When enter all necessary information for part invoice without purchase order number
          Then part invoice created
          And Search purchase order page shows up

     Scenario: Invoice Capture: Enter Service Invoice
          Given I am in the capture landing page
          When enter all necessary information for service invoice without work order number
          Then Service invoice created
          And Search workorder order page shows up

     # #CARMA-183
     Scenario: Invoice Capture Enter Invoice Reset
          Given I am in the capture landing page
          When I reset all necessary information for part invoice
          Then all entered data is clear
     # #CARMA-225
     Scenario: Invoice Capture Error
          Given I am in the capture landing page
          When submit without any data enter
          Then list of require fields shown
     # #CARMA-249
     Scenario: Invoice Capture Dates Error
          Given I am creating a service invoice
          When I have entered Received Date to be BEFORE the Invoice Date
          Then an error message pops up