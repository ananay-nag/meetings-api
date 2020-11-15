const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const Meetings = require("../models/meetingsModel");
const { meetingsValidation } = require("../validator/meetingValidation");

const createMeeting = async (req, res) => {
  try {
    // const { error } = meetingsValidation(req.body);

    // if (error) {
    //   throw new Error(error.details[0].message);
    // }

    const { title, startTime, endTime, participants } = req.body;
    let date = new Date();
    let toDay =
      date.getFullYear().toString().padStart(2, 0) +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      date.getDate().toString().padStart(2, 0);

    let startDate = new Date(toDay + " " + startTime).getTime();
    let endDate = new Date(toDay + " " + endTime).getTime();

    const newMeeting = await new Meetings({
      id: uuidv4(),
      title,
      startDate,
      endDate,
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

module.exports = { createMeeting, getMeetingById };

// let val = moment().format("Do MMMM YYYY");
// console.log(val);
