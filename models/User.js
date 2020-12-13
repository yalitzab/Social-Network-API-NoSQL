const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: 'Username is Required',
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },

    thoughtsId: {
      type: Schema.Types.thoughtsId,
      ref: 'Thought'
    },

    friendsId: {
      type: Schema.Types.friendsId,
      ref: 'User'
    },
   
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.thoughts.reduce(
    (total, friends) => total + friends.thoughts.length + 1,
    0
  );
});

const User = model('user', UserSchema);

module.exports = User;
