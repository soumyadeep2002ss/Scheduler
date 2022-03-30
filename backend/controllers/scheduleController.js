const TextTime = require('../models/scheduleModel');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const moment = require('moment');

exports.createTextTimes = catchAsyncErrors(async (req, res, next) => {
    const { dateTime } = req.body;
    const time = await TextTime.findOne({ dateTime });
    // console.log(time);
    if (time) {
        res.status(200).json({
            success: false,
            message: 'Time already exists'
        });
    }
    else {
        const textTime = await TextTime.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Succesfully scheduled',
            textTime,
        });
    }
});

exports.getAllTimesText = catchAsyncErrors(async (req, res, next) => {
    const textTimes = await TextTime.find().sort({ dateTime: 1 });
    // console.log(textTimes)
    const futureEvents = textTimes.filter(textTime => new Date(textTime.dateTime).valueOf() >= new Date().valueOf());
    // console.log(futureEvents);
    // console.log(new Date(moment().format()));
    res.status(200).json({
        success: true,
        // futureEvents,
        textTimes: futureEvents,
    });
});