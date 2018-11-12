const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const router = express();

router.get('/', function(req, res) {
    res.sendFile(path.join(path.resolve(__dirname, '..') + '/public/html/index.html'));
});

router.use(bodyParser.text({
  parameterLimit: 100000,
  limit: '50mb',
  extended: true
}));

router.post('/cards', function(req, res) {

  const dom = new JSDOM(req.body);
  const document = dom.window.document;
  const pinyinTerms = document.getElementsByClassName("pinyin");
  const englishTerms = document.getElementsByClassName("english");

  var fileContents = "";

  for(var i=1; i < pinyinTerms.length; i++) {

    pinyinTerm = (pinyinTerms[i-1].innerHTML).replace(new RegExp(',', 'g'), '');
    englishTerm = (englishTerms[i-1].innerHTML).replace(new RegExp(',', 'g'), '');
    fileContents += (pinyinTerm + ',' + englishTerm + '\n');
  }
  const filePath = path.join(path.resolve(__dirname, '..') + '/public/file.txt');
  fs.appendFile(filePath, fileContents, function(err) {
    if(err) {
      console.log(err);
      res.send(err);
    }
    else {
      console.log('File Contents Saved');
      res.send('success');
    }
  });
});

router.delete('/cards', function(req, res) {
  const filePath = path.join(path.resolve(__dirname, '..') + '/public/file.txt');
  fs.writeFile(filePath, "", function(err) {
    if(err) {
      console.log(err);
      res.send(err);
    }
    else {
      res.send('success');
    }
  })
})

module.exports = router;
