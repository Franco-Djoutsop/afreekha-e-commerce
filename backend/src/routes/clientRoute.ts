import express, { Express } from "express";
import {
  allUSers,
  allUsersRoles,
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
import { login, register } from "../controllers/authUserControler";
import { validateToken } from "../middlewares/validateTokenHandler";
const router = express.Router();

//users route
router.route("/users").post(userValidationRules, validate, register);
router.route("/users").get(validateToken, allUSers);
router.route("/usersRoles/:id").get(validateToken, allUsersRoles);
router.route("/usersRoles/:id").get(validateToken, oneUsersRole);
router.route("/users/:id").patch(validateToken, updateUsers);
router.route("/users/:id").delete(validateToken, deleteUsers);

//role route
router.route("/role").post(createRole).get(validateToken, allRoles);
router
  .route("/role/:id")
  .patch(validateToken, updateRole)
  .delete(validateToken, deleteRole);

//authentification
router.route("/auth").post(login);

export default router;
