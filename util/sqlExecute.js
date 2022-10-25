var dbconnect = require('./dbConnect')
var XLSX = require('XLSX');
var chai = require('chai');
var assert = chai.assert;
export function verifyDBcredential() {
   if (ORACLEDB_USER === 'undefined') {
      assert.fail("DB userID is not supplied.Please set ORACLEDB_USER environment variable.")
   }
   if (ORACLEDB_PASSWORD === 'undefined') {
      assert.fail("DB password is not supplied.Please set ORACLEDB_PASSWORD environment variable.")
   }
   if (ORACLEDB_CONNECTSTRING === 'undefined') {
      assert.fail("DB connection string is not supplied.Please set ORACLEDB_CONNECTSTRING environment variable.")
   }



}

export async function executeSQLquery(selectSQLquery) {
   try {
      const result = await dbconnect(selectSQLquery, []);
      var ws = XLSX.utils.json_to_sheet(result, { skipHeader: true }, { cellDates: true }, { defval: "" })
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "./test-data/sqlResult.xlsx");
   }
   catch (e) {
      console.log(e)
      return '--------------caught------------------------';
   }
}
export function recordCount(data) {
   for (var i = 1; i < 10; i++) {
      if (data[i][0] === '') {
         return i;
      }
   }
   
}

export function getSQLdata() {
   /* Below function is for reading data from excel and putting in data variable*/
   try {
      let workbook = XLSX.readFile('./test-data/sqlResult.xlsx', { cellDates: true });
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];
      var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var data = new Array(10)
      for (var i = 0; i < 10; i++) {
         data[i] = new Array(26);
      }

      for (var i = 1; i < 10; i++) {
         for (var j = 0; j < 26; j++) {
            var cell = worksheet[alpha[j] + i];
            var desired_value = (cell ? cell.v : '');
            data[i - 1][j] = desired_value;

         }
      }
     
      const fs = require('fs')
      const path = './test-data/sqlResult.xlsx'
      try {
         fs.unlinkSync(path)
      } catch (err) {
         console.error(err)
      }

      console.log('---------Values within getSQLdata function---');
      return data;
   }
   catch (err) {
      console.log(err);
      assert.fail("Database conenction was not successful OR SQL Query resulted 0 result OR Wrong SQL query,For details Please see console log");
   }
}


export function convertToUIdate(dbDate) {
   let UI_date = ('0' + (dbDate.getMonth() + 1)).slice(-2) + "/" + ('0' + dbDate.getDate()).slice(-2) + "/" + dbDate.getFullYear();
   return UI_date;
}

export function deleteSQLresultFile(dbDate) {
   let UI_date = ('0' + (dbDate.getMonth() + 1)).slice(-2) + "/" + ('0' + dbDate.getDate()).slice(-2) + "/" + dbDate.getFullYear();
   return UI_date;
}
