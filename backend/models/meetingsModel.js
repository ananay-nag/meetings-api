const mongoose = require("mongoose");
const { Schema } = mongoose;

const participantsSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rsvp: {
    type: String,
    default: "MayBe",
  },
});

const meetingsSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    participants: {
      type: [participantsSchema],
      default: Array,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    creationTimestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Meetings", meetingsSchema);
