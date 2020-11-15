const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const Meetings = require("../models/meetingsModel");
const { meetingsValidation } = require("../validator/meetingValidation");

const createMeeting = async (req, res) => {
  try {
    const { error } = meetingsValidation(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const { title, startTime, endTime, participants } = req.body;

    const newMeeting = await new Meetings({
      id: uuidv4(),
      title,
      startTime,
      endTime,
      participants,
    });

    await newMeeting.save();

    res.json({
      message: "Meeting scheduled successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getMeetingById = async (req, res) => {
  try {
    const { id } = req.query;
    const meeting = await Meetings.findById(id);

    if (!meeting) {
      throw new Error("There is no meeting on this id");
    } else {
      res.json(meeting);
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
let val = moment().format("Do MMMM YYYY");
console.log(val);
module.exports = { createMeeting, getMeetingById };
