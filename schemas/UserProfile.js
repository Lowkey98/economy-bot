const { Schema, model } = require("mongoose");

const UserProfileSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 100,
    },
    lastDaily: {
      type: Date,
      default: new Date(0),
    },
  },
  { timestamps: true }
);

module.exports = model("UserProfile", UserProfileSchema);