const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  updateThoughtById,
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// GET all thoughts
router.route("/").get(getAllThoughts);

// /api/ addthoughts
router.route('/:userId')
  .post(addThought);

// /id 
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(removeThought);

router.route("/:userId")
  .post(addThought);

router.route("/:thoughtId/reactions")
  .post(addReaction);

router.route("/:thoughtId/:reactionId")
  .delete(removeReaction);

module.exports = router;
