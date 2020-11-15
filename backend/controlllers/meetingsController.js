const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const Meetings = require("../models/meetingsModel");
const { meetingsValidation } = require("../validator/meetingValidation");
const { SENDER } = require("../common/constant");
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
    // participants.push(SENDER);
    let allEmail = [];
    participants.map((item) => {
      allEmail.push(item.email);
    });
    console.log("allEmail", allEmail);
    let overLapQuery = [
      {
        $unwind: "$participants",
      },
      {
        $match: { "participants.email": { $in: allEmail }, "participants.rsvp": true, startDate: { $gte: startDate }, endDate: { $lte: endDate } },
      },
    ];
    let checkOverLap = [];
    console.log("overLapQuery", JSON.stringify(overLapQuery));
    try {
      checkOverLap = await Meetings.aggregate(overLapQuery);
      console.log("checkOverLap", JSON.stringify(checkOverLap));
    } catch (err) {
      console.log("err" + err);
    }
    if (!(checkOverLap && checkOverLap.length)) {
      const newMeeting = await new Meetings({
        id: uuidv4(),
        title,
        startDate,
        endDate,
        participants,
      });

      await newMeeting
        .save()
        .then((res) => console.log(res))
        .catch((err) => {
          throw new Error(err.message);
        });
    }

    res.json({
      message: checkOverLap && checkOverLap.length ? "One of them busy" : "metting created",
      data: checkOverLap,
    });
    // res.format({
    //   json:()=>{
    //     "message"="",
    //     "data"=checkOverLap
    //   }
    // })
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
