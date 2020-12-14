const { Thought, User } = require('../models');

const thoughtController = {

  // GET allThoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get thoughtbyid
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: `No thought found with this id.` });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // POST add thought to User
  addThought: ({ params, body }, res) => {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.UserId },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // PUT update thought by id
  updateThoughtById: ({ params, body }, res) => {
    console.log(body);
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: `No thought found with this id.` });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        // 500 is server side error code
        res.status(500).json(err);
      });
  },

  // remove thought
  removeThought: ({ params }, res) => {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbReactionData) => {
        if (!dbReactionData) {
          res.status(404).json({ message: `Cannot react. No reaction found with this id.`, });
          return;
        }
        res.json(dbReactionData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  // remove reaction
  removeReaction: ({ params }, res) => {
    thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true }
    )
      .then((dbReactionData) => {
        if (!dbReactionData) {
          res.status(404).json({ message: `No reaction found with this id.`, });
          return;
        }
        res.json(dbReactionData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

module.exports = thoughtController;
