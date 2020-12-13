const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Your thoughts must be typed',
      match: [/.[A-Z][a-z]a{1,280}[\s\S]\d\w\s/]
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    userName: {
      type: String,
      required: 'Username is Required'
    },
    reactions: {
      type: Schema.Types.reactionSchema,
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    commentBody: {
      type: String,
      required: true,
      match: '/a{1,280}/'
    },
    userName: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Reaction', thoughtSchema);

module.exports = Thought;
