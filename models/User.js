const { Schema, Types } = require('mongoose');
const thoughtSchema = require('thought')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [ isEmail, 'invalid email' ]
    },
    thoughtIds: [thoughtSchema],
    friendIds: [userSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = assignmentSchema;
