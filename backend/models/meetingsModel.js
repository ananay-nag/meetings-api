const mongoose = require("mongoose");
const { Schema } = mongoose;

const meetingsSchema = new Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  participants: [
    {
      name: {
        type: String,

        min: 5,
      },
      email: {
        type: String,
      },
      rsvp: {
        type: Boolean,
        default: false,
      },
    },
  ],

  startDate: {
    type: Number,
    default: 0,
  },
  endDate: {
    type: Number,
    default: 0,
  },
  creationTimestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("meetings", meetingsSchema);
