const { Schema, model } = require("mongoose");

const UserSchama = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    bio: String,
    avatar: {
      type: String,
      required: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);
module.exports = model("User", UserSchama);