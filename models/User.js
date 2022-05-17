const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

const User = model('user', usersSchema);

module.exports = userSchema;
