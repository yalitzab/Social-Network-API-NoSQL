const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  getThought,
  getFriend,
  createFriend,
  deleteFriend,
  createUser,
  updateUserById,
  deleteUserById
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUser)
  .get(getUserById)
  .get(getThought)
  .get(getFriend)
  .post(createUser)
  .put(updateUserById)
  .delete(deleteUserById);

// /api/users/:userId/friends/:friendId
router
  .route('/:id')
  .post(createFriend)
  .delete(deleteFriend);
 

module.exports = router;
