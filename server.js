var express = require("express");
var app = express();
var router = express.Router();

router.use(function(req, res, next) {
    next();
});

router.route('/').get(function(req, res) {
   var headerData = {};
   headerData.ipaddress = req.headers['x-forwarded-for'];
   headerData.language = req.headers['accept-language'].match(/([\W\w]+?),/)[1];
   headerData.software = req.headers['user-agent'].match(/\(([^)]+)\)/)[1];
   res.json(headerData); 
});

app.use('/', router);

app.listen(process.env.PORT || 8080, function () {
  console.log('Request header parser listening on port ' + (process.env.PORT || "8080"));
});