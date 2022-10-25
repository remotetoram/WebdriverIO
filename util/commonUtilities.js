module.exports = {
  getUninqueNumber: function () {
      browser.pause(2000); //just to make difference invoice number
      var today = new Date();
      let invoiceNumberAuto = today.getDate() + '' + (today.getMonth() + 1) + ('' + (today.getHours()) + '').slice(0, 2) + today.getMinutes() + '' + today.getSeconds();
       console.log('invoiceNumberAuto=> ' + invoiceNumberAuto)
      return invoiceNumberAuto
    },
    getTimeStamp: function () {
      var today = new Date();
      let timestamp = today.getDate() + '-' + (today.getMonth()+1)+'-'+today.getFullYear() + '-' + today.getHours()+'-' + today.getMinutes();
      return timestamp
    }
  }
  



