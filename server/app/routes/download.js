'use strict';
var router = require('express').Router();
module.exports = router;

router.get('/', function (req, res) {

	console.log("download route hit", req.body);
});


