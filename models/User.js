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

    thoughtId: {
      // type: Schema.Types.objectId,
      ref: 'Thought'
    },

    friendId: {
      // type: Schema.Types.objectId,
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
  return this.thought.reduce(
    (total, friends) => total + friends.thought.length + 1,
    0
  );
});

const User = model('User', UserSchema);

module.exports = User;
