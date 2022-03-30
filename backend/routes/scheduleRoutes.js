const express = require('express');
const { getAllTimesText,createTextTimes } = require('../controllers/scheduleController');

const router = express.Router();

router.route("/schedules").get(getAllTimesText);
router.route("/schedules/new").post(createTextTimes);


module.exports = router;