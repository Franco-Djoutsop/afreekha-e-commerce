import express, { Express } from "express";
import {
  allUSers,
  allUsersRoles,
  createUser,
  deleteUsers,
  oneUsersRole,
  updateUsers,
} from "../controllers/userControler";
import { userValidationRules } from "../middlewares/validationsRules";
import { validate } from "../middlewares/validate";
import {
  allRoles,
  createRole,
  deleteRole,
  roleUsers,
  updateRole,
} from "../controllers/roleControler";

const router = express.Router();

//users route
router.route("/users").post(userValidationRules, validate, createUser);
router.route("/users").get(allUSers);
router.route("/usersRoles/:id").get(allUsersRoles);
router.route("/usersRoles/:id").get(oneUsersRole);
router.route("/users/:id").patch(updateUsers);
router.route("/users/:id").delete(deleteUsers);

//role route
router.route("/role").post(createRole).get(allRoles);
router.route("/role/:id").patch(updateRole).delete(deleteRole);

export default router;
