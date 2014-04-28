var express = require('express');
var router = express.Router();

var gitutils = require('gitutils');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Git GUI' });
});

router.post('/git/clone', function (req, res) {
  var remote=req.body.remote;
  gitutils.gitClone(remote,function(output){res.send(output);});
  //res.send(output);
});

module.exports = router;
