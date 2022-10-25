const Client = require('ssh2-sftp-client');

const config = {
  host: 'isftp.netjets.com',
  port: 22,
  username: 'carmaei',
  password: 'secureftp'
};

export function findExistingFiles() {

  let sftp = new Client;

  sftp.connect(config)
    .then(() => {
      return sftp.list('/carmaei/qaTest');
    })
    .then(data => {
      console.log(data);
    })
    .then(() => {
      sftp.end();
    })
    .catch(err => {
      console.error(err.message);
    });

}


export function placeFileOnFTP(fileName) {
  const fs = require("fs")
  let client = new Client();


  let data = fs.createReadStream('./test-data/electronicInvoices/' + fileName);
  let remote = '/carmaei/qaTest/' + fileName;
 
  client.connect(config)
  .then(() => {
    return client.put(data, remote);
  })
  .then(() => {
    return client.end();
  })
  .catch(err => {
    console.error(err.message);
  });

}


