const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  createFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);
  

  // /api/users/:userId
  router.route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

// /api/users/:userId/friends/:friendId
router
  .route('/:id/friend/:friendId')
  .post(createFriend)
  .delete(deleteFriend);
 

module.exports = router;
