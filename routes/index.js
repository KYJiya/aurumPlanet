var express = require('express');
var router = express.Router();
const highlightController = require('../controllers');

/* GET home page. */
router.post('/oneAPI', highlightController.oneAPI);
router.post('/twoAPI', highlightController.twoAPI);
router.post('/threeAPI', highlightController.threeAPI);
router.post('/fourAPI', highlightController.fourAPI);

module.exports = router;
