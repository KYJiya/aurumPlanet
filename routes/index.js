var express = require('express');
var router = express.Router();
const highlightController = require('../controllers');

/* GET home page. */
router.post('/oneAPI', highlightController.oneAPI);

module.exports = router;
