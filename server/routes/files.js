var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const fileUpload = require('express-fileupload');
const app = express();
var VerifyToken = require('./../controllers/VerifyToken');

// default options
router.use(fileUpload());

router.post('/upload', VerifyToken, function(req, res) {
  if (Object.keys(req.file).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }


  var filePath = '/images/' + req.userId + '_' + Date.now() + '/' + req.file.fileName;
  // Use the mv() method to place the file somewhere on your server
  req.file.mv(filePath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.status(200).send({"filePath": filePath});
  });
});

module.exports = router;