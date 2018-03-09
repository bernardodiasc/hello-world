var express = require('express');
var router = express.Router();
var request = require('request-promise');

router.get('^*$', function(req, res) {
  request.get({
    uri: 'http://localhost:80/api' + req.path,
    headers: {
      'apikey': 'DEFAULT'
    },
    json: true
  }).then((response) => {
    res.send(response);
    res.end();
  }).catch((response) => {
    res.status(500).end('Error on development proxy');
  });
});

module.exports = router;
