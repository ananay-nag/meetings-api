const express = require("express");
const {
  createMeeting,
  getMeetingById,
} = require("../controlllers/meetingsController");

const router = express.Router();

router.post("/", createMeeting);
router.get("/", getMeetingById);

module.exports = router;
