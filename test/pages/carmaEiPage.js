
import { findExistingFiles,placeFileOnFTP } from '../../util/ftpConnect';
import { executeSQLquery, getSQLdata, convertToUIdate, recordCount, verifyDBcredential } from '../../util/sqlExecute';
import { getUninqueNumber } from '../../util/commonUtilities';
import { action } from '../support/user.command';
var chai = require('chai');
var assert = chai.assert;

const invokeCarmaEI='//*[@id="invokeEI"]'
const confirmMessage='/html/body'

class CarmaEIpage {

 findExistingFiles(){
    findExistingFiles()
 }   

 placeFileOnFTP(fileName){
    placeFileOnFTP(fileName)
 }

 createServiceInvoiceFileNoWOfoundGAMA(invoiceNumber,workOrderNumber,fileNameAppend){
    var fs = require("fs");
    var stream;
    var fileName="netjets.eipp.file.IV20"+getUninqueNumber()+"."+fileNameAppend+".test.txt"
    
    stream = fs.createWriteStream("./test-data/electronicInvoices/"+fileName);
    
    stream.write("H03|04|GAMA AVIATION ENGINEERING INC.|VC04068||||||||"+'\r\n')
    stream.write("H04|04|"+invoiceNumber+"|20200924|20201108|Terms for 45 days|DEBIT|USD|22672124"+'\r\n')
    stream.write("H05|04|"+workOrderNumber+"||680A|N585QS"+'\r\n')
    stream.write('\r\n')
    stream.write("H09|04|TOTAL|68354"+'\r\n')
    stream.write('\r\n')
    stream.write("D01|04|SQUAWK NUMBER:|2.1"+'\r\n')
    stream.write("D02|04|LABOR_REGULAR|1|2.1|50|HR||LABOR|||11950|5975"+'\r\n')
    stream.write("D03|04|2.1. 050245A (CE-680AS Tire pressure Checklist (Use latest revision posted on Comply 365).)"+'\r\n')

    stream.write("D01|04|SQUAWK NUMBER:|2.2"+'\r\n')
    stream.write("D02|04|LABOR_REGULAR|2|2.2|200|HR||LABOR|||11950|23900"+'\r\n')
    stream.write("D03|04|2.2. JEPP-19-2020 (Jeppesen Electronic Charts (14 days) Cycle 19-2020)"+'\r\n')
    
    stream.write("D01|04|SQUAWK NUMBER:|2.3"+'\r\n')
    stream.write("D02|04|LABOR_REGULAR|3|2.3|200|HR||LABOR|||11950|23900"+'\r\n')
    stream.write("D03|04|2.3. TC-68A-31-190214S (Comply with TC-68A-31-190214S. CE-680A FOQA QAR Download (Used latest revision on Comply365))"+'\r\n')
    
    stream.write("D01|04|SQUAWK NUMBER:|3.1"+'\r\n')
    stream.write("D02|04|LABOR_REGULAR|1|3.1|100|HR||LABOR|||11950|11950"+'\r\n')
    stream.write("D03|04|3.1. Found LH and RH lower engine cowlings dirty"+'\r\n')
    
    stream.write("D01|04|SQUAWK NUMBER:|A9999"+'\r\n')
    stream.write("D02|04|SHOP_SUPPLIES|5|A9999|100|||CONSUMABLES|||2629|2629"+'\r\n')
    
    stream.write("T01|04|INVOICE TOTAL AMOUNT|68354|"+'\r\n')

    return fileName
}

createServiceInvoiceFileValidGAMA(invoiceNumber,workOrderNumber,fileNameAppend){
    var fs = require("fs");
    var stream;
    var fileName="netjets.eipp.file.IV20.TEST"+getUninqueNumber()+"."+fileNameAppend+".test.txt"
    
    stream = fs.createWriteStream("./test-data/electronicInvoices/"+fileName);
    
    stream.write("H03|04|GAMA AVIATION ENGINEERING INC.|VC04068||||||||"+'\r\n')
    stream.write("H04|04|"+invoiceNumber+"|20200924|20201108|Terms for 45 days|DEBIT|USD|22672124"+'\r\n')
    stream.write("H05|04|WO - 22672124||680A|N585QS"+'\r\n')
    stream.write('\r\n')
    stream.write("H09|04|TOTAL|68354"+'\r\n')
    stream.write('\r\n')
    stream.write("D01|04|SQUAWK NUMBER:|2.1"+'\r\n')
    stream.write("D02|04|LABOR_REGULAR|1|2.1|50|HR||LABOR|||11950|5975"+'\r\n')
    stream.write("D03|04|2.1. 050245A (CE-680AS Tire pressure Checklist (Use latest revision posted on Comply 365).)"+'\r\n')

    stream.write("T01|04|INVOICE TOTAL AMOUNT|5975|"+'\r\n')

    return fileName
}

createServiceInvoiceFileNotBalancedGAMA(invoiceNumber,workOrderNumber,fileNameAppend){
    var fs = require("fs");
    var stream;
    var fileName="netjets.eipp.file.IV20.TEST"+getUninqueNumber()+"."+fileNameAppend+".test.txt"
    
    stream = fs.createWriteStream("./test-data/electronicInvoices/"+fileName);
    
    stream.write("H03|04|GAMA AVIATION ENGINEERING INC.|VC04068||||||||"+'\r\n')
    stream.write("H04|04|"+invoiceNumber+"|20200924|20201108|Terms for 45 days|DEBIT|USD|22672124"+'\r\n')
    stream.write("H05|04|WO - 22672124||680A|N585QS"+'\r\n')
    stream.write('\r\n')
    stream.write("H09|04|TOTAL|68354"+'\r\n')
    stream.write('\r\n')
   // stream.write("D01|04|SQUAWK NUMBER:|2.1"+'\r\n')
  //  stream.write("D02|04|LABOR_REGULAR|1|2.1|50|HR||LABOR|||11950|5975"+'\r\n')
   // stream.write("D03|04|2.1. 050245A (CE-680AS Tire pressure Checklist (Use latest revision posted on Comply 365).)"+'\r\n')

    stream.write("T01|04|INVOICE TOTAL AMOUNT|5975|"+'\r\n')

    return fileName
}

createServiceInvoiceFileUnableToMatchLaborLineGAMA(invoiceNumber,workOrderNumber,fileNameAppend){
    var fs = require("fs");
    var stream;
    var fileName="netjets.eipp.file.IV20.TEST"+getUninqueNumber()+"."+fileNameAppend+".test.txt"
    
    stream = fs.createWriteStream("./test-data/electronicInvoices/"+fileName);
    
    stream.write("H03|04|GAMA AVIATION ENGINEERING INC.|VC04068||||||||"+'\r\n')
    stream.write("H04|04|"+invoiceNumber+"|20200924|20201108|Terms for 45 days|DEBIT|USD|22672124"+'\r\n')
    stream.write("H05|04|WO - 22445857||680A|N585QS"+'\r\n')
    stream.write('\r\n')
    stream.write("H09|04|TOTAL|2629"+'\r\n')
    stream.write('\r\n')
    stream.write("D01|04|SQUAWK NUMBER:|A9999"+'\r\n')
    stream.write("D02|04|SHOP_SUPPLIES|5|A9999|100|||CONSUMABLES|||2629|2629"+'\r\n')
    stream.write("T01|04|INVOICE TOTAL AMOUNT|2629|"+'\r\n')

    return fileName
}




createServiceInvoiceFileInvoiceTotalExceptionGAMA(invoiceNumber,workOrderNumber,fileNameAppend){
    var fs = require("fs");
    var stream;
    var fileName="netjets.eipp.file.IV20.TEST"+getUninqueNumber()+"."+fileNameAppend+".test.txt"
    
    stream = fs.createWriteStream("./test-data/electronicInvoices/"+fileName);
    
    stream.write("H03|04|GAMA AVIATION ENGINEERING INC.|VC04068||||||||"+'\r\n')
    stream.write("H04|04|"+invoiceNumber+"|20200924|20201108|Terms for 45 days|DEBIT|USD|22672124"+'\r\n')
    stream.write("H05|04|WO - 22672124||680A|N585QS"+'\r\n')
    stream.write('\r\n')
    stream.write("H09|04|TOTAL|68354"+'\r\n')
    stream.write('\r\n')
    stream.write("D01|04|SQUAWK NUMBER:|2.1"+'\r\n')
    stream.write("D02|04|LABOR_REGULAR|1|2.1|50|HR||LABOR|||11950|5975"+'\r\n')
    stream.write("D03|04|2.1. 050245A (CE-680AS Tire pressure Checklist (Use latest revision posted on Comply 365).)"+'\r\n')

    stream.write("T01|04|INVOICE TOTAL AMOUNT||"+'\r\n')

    return fileName
}



startBatchProcessByCarmaEI(){
    var CARMAEI_URL='http://cmhqacarma51/CarmaEI/CarmaEIWEB/'
    browser.url(CARMAEI_URL)
    action.waitTillPageLoaded()
    console.log('Opened CARMA EI again')
    action.click(invokeCarmaEI)
    action.acceptAlert()
    browser.pause(30000)
    action.waitTillPageLoaded()
    
    for (var iLoop = 0; iLoop < 2000; iLoop++) {
        if ($(confirmMessage).getText().includes('completed processing')) {
           console.log('Process complete')
            break;
        } else browser.pause(50);
    }
    

    assert($(confirmMessage).getText().includes('completed processing'),'Batch processing confirmation message did not appear')
    console.log('CARMA EI was invoked and completed processing. Please check logs for details')
   // browser.closeWindow()


}




verifyExceptionCodeFromCarmaEI(invoiceNumber,exceptionCode) {
    verifyDBcredential();
    const fs = require('fs');
    let rawdata = fs.readFileSync('./test-data/sqlsUsed.json');
    let TestData = JSON.parse(rawdata);
    console.log("Invoice number=> "+invoiceNumber)
    const query = TestData["exceptionForInvoice"]+invoiceNumber+"' order by batch_id desc";
    console.log('Query=>' + query);
    console.log('---------------Before browser call--------');
    browser.call(() => executeSQLquery(query));
    console.log('---------------After browser call--------');
    var data = getSQLdata();
    console.log('--------------record count from Work Order Result Page--------');
    var totalRecord = recordCount(data);
    console.log("record count => " + totalRecord)
    console.log("Exception code in DB =>" + data[0][0])
    console.log("Exception code Expected =>" + exceptionCode)
    assert(data[0][0]==exceptionCode, 'Expected exception code did not appear');
    console.log("Expected Exception received=>"+data[0][1]) 

}
copyAndRenameFile(fileName){
    var fs = require("fs");
    const newName=fileName+"DUP"
    const oldfile="./test-data/electronicInvoices/"+fileName
    const newfile="./test-data/electronicInvoices/"+newName
    fs.copyFileSync(oldfile,newfile)
    console.log("Successfully created duplicate invoice file.")
    return newName;
   // const currPath = "./test-report/CARMA_AutomationReportOutput"

    //const newPath = "./test-report/CARMA_AutomationReportOutput_"+getTimeStamp.getTimeStamp()
   // fs.renameSync(currPath, newPath)
    //console.log("C:\Carma UI Automation\test-report\CARMA_AutomationReportOutput_10-12-2020-18-56\report\index.html")
  
  //  fs.copyFileSync()
}

createRAMCOInvoiceFile(invoiceNumber,workOrderNumber,fileNameAppend){
  
    var fs = require("fs");
    var stream;
    var fileName="netjets.eipp.file.RAMCO"+getUninqueNumber()+fileNameAppend
    
    stream = fs.createWriteStream("./test-data/electronicInvoices/"+fileName);
    stream.write("H01|05||36023|NETJETS AVIATION, INC.|ATTN:  WARRANTY DEPARTMENT|4111 BRIDGEWAY AVE|||COLUMBUS|OH|43219|US"+'\r\n')
    stream.write("H03|05|BOMBARDIER INC. (MONTRÉAL)||||||||BOMBHQ|BOMBHQ"+'\r\n')
    stream.write("H04|05|"+invoiceNumber+"|20181212|20181213|20190111|NET 30|Credit|USD|SIN-A078297|CMH\TLETT"+'\r\n')
    stream.write("H05|05|PO-A071134|||11/03/2018"+'\r\n')
    stream.write("H06|05||||||||||"+'\r\n')
    stream.write("D01|05|PO LINE ITEM ID|737832"+'\r\n')
    stream.write("D02|05|PARTS|388147|2524.001.26-123-068G|ASH TRAY||||385700|EA|30|1157100|||||PO-A071134/1"+'\r\n')
    stream.write("D03|05|SIN-A078297:388147"+'\r\n')

    stream.write("T01|05|Total Invoice Amount|1157100|"+'\r\n')

    return fileName
}
createRAMCOInvoiceFilePOnotFound(invoiceNumber,purchaseOrderNumber,fileNameAppend){
  
    var fs = require("fs");
    var stream;
    var fileName="netjets.eipp.file.RAMCO"+getUninqueNumber()+fileNameAppend
    
    stream = fs.createWriteStream("./test-data/electronicInvoices/"+fileName);
    stream.write("H01|05||36023|NETJETS AVIATION, INC.|ATTN:  WARRANTY DEPARTMENT|4111 BRIDGEWAY AVE|||COLUMBUS|OH|43219|US"+'\r\n')
    stream.write("H03|05|BOMBARDIER INC. (MONTRÉAL)||||||||BOMBHQ|BOMBHQ"+'\r\n')
    stream.write("H04|05|"+invoiceNumber+"|20181212|20181213|20190111|NET 30|Credit|USD|SIN-A078297|CMH\TLETT"+'\r\n')
    stream.write("H05|05|"+purchaseOrderNumber+"|||11/03/2018"+'\r\n')
    stream.write("H06|05||||||||||"+'\r\n')
    stream.write("D01|05|PO LINE ITEM ID|737832"+'\r\n')
    stream.write("D02|05|PARTS|388147|2524.001.26-123-068G|ASH TRAY||||385700|EA|30|1157100|||||PO-A071134/1"+'\r\n')
    stream.write("D03|05|SIN-A078297:388147"+'\r\n')

    stream.write("T01|05|Total Invoice Amount|1157100|"+'\r\n')

    return fileName
}

createServiceInvoiceMandateFieldsNotAvailableExceptionGAMA(invoiceNumber,workOrderNumber,fileNameAppend){
    var fs = require("fs");
    var stream;
    var fileName="netjets.eipp.file.IV20.TEST"+getUninqueNumber()+"."+fileNameAppend+".test.txt"
    
    stream = fs.createWriteStream("./test-data/electronicInvoices/"+fileName);
    
    stream.write("H03|04|GAMA AVIATION ENGINEERING INC.|VC04068||||||||"+'\r\n')
    stream.write("H04|04|"+invoiceNumber+"|20200924||Terms for 45 days|DEBIT|USD|22672124"+'\r\n')
    
  //stream.write("H04|04|"+invoiceNumber+"|20200924|20201108|Terms for 45 days|DEBIT|USD|22672124"+'\r\n')
    stream.write("H05|04|WO - 22672124||680A|N585QS"+'\r\n')
    stream.write('\r\n')
    stream.write("H09|04|TOTAL|68354"+'\r\n')
    stream.write('\r\n')
    stream.write("D01|04|SQUAWK NUMBER:|2.1"+'\r\n')
    stream.write("D02|04|LABOR_REGULAR|1|2.1|50|HR||LABOR|||11950|5975"+'\r\n')
    stream.write("D03|04|2.1. 050245A (CE-680AS Tire pressure Checklist (Use latest revision posted on Comply 365).)"+'\r\n')

    stream.write("T01|04|INVOICE TOTAL AMOUNT|5975|"+'\r\n')

    return fileName
}


}
export const carmaEiPage = new CarmaEIpage();

/*-- 
Exception to start with:
Technical:  Mandatory Fields Not Available 
Mandatory Header Attributes Not Found
Work Order Not Found
Purchase Order Not Found
Invoice Not Balanced

1) try to get access for CARMA  FTP
2)try to edit invoice file as per desired change...complex
3) how to upload in ftp folder/or just put in pre-req that put these files on that FTP
4) trigger then back process thru CARMA EI UI
5)open db and see exception and valdate...u canstart with this as take some old data and try to validate
--*/
