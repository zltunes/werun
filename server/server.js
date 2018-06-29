var express = require('express');
var app = express();

var WXBizDataCrypt = require('./WXBizDataCrypt')

var appId = 'wx8e16ce9067925ad7'
 
app.get('/decrypt', function (req, res) {
 
   var encryptedData = req.query.encryptedData
   var iv = req.query.iv
   var sessionKey = req.query.session_key

   var pc = new WXBizDataCrypt(appId, sessionKey)
   var response = pc.decryptData(encryptedData , iv)
   console.log(response);
   res.end(JSON.stringify(response));
})


 
var server = app.listen(8081, function () {
 
  var host = '127.0.0.1'
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})