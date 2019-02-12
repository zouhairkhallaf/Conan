// var GoogleSpreadsheet = require('google-spreadsheet');
// var creds             = require('./client_secret.json');

// function updateGoogleSheet(obj){
//   // Create a document object using the ID of the spreadsheet - obtained from its URL.
//   var doc = new GoogleSpreadsheet('1KVyVo5rIRqfKbXlPz5i_pBgrwBHLuy7a3y9dHvp_98A');
//   // Authenticate with the Google Spreadsheets API.
//   doc.useServiceAccountAuth(creds, function (err) {
//     if(err) {
//       console.log(err)
//     }
//      var newRow = {
//          Ip: obj.ip||'',
//          Range:obj.data.range||'',
//          Country:obj.data.country||'',
//          State:obj.data.region||'',
//          City:obj.data.city||'',
//          Longitude: obj.data.ll[0]||'',
//          Latitude: obj.data.ll[1]||'',
//          Metro:obj.data.metro||'',
//          Zip:obj.data.zip||'',
//          Timestamp: new Date()
//       }
//     doc.addRow(1,newRow, function(err) {
//       if(err) {
//         console.log(err);
//       }
//     });
//   });
// }
// // To read all of the rows from the spreadsheet use the following code.
// // doc.getRows(1, function (err, rows) {
// //   console.log(rows);
// // });
//  //updateGoogleSheet(nr)
// exports.updateGoogleSheet = updateGoogleSheet




