const mongoose = require("mongoose");
const { boolean, number } = require("joi");
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
    type: Boolean,
    default: false,
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
    startDate: {
      type: Number,
      default: 0,
      required: true,
    },
    endDate: {
      type: Number,
      default: 0,
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
