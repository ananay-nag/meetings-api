const express = require("express");
const {
  createMeeting,
  getMeetingById,
} = require("../controlllers/meetingsController");

const router = express.Router();

router.post("/createMeeting", createMeeting);
router.get("/getMeetingById", getMeetingById);

module.exports = router;
