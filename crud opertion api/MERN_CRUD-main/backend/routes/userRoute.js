const express = require("express");
const {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

//------------------ SIMPLE ROUTES --------------------------------------//

router.route("/createUser").post(createUser);
router.route("/getAllUser").get(getAllUser);
router.route("/getUserById").post(getUserById);
router.route("/updateUser").post(updateUser);
router.route("/deleteUser").post(deleteUser);

module.exports = router;
