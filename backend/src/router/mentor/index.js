import { Router } from "express";
import AuthenticationMiddleware from "../../middleware/authorization.js";
import MentorController from "../../controller/mentor/index.js";
import MentorRoleChecker from "../../middleware/mentorRoleChecker.js";

const MentorRouter = Router();
MentorRouter.get(
  "/mentor-profile",
  AuthenticationMiddleware,
  MentorRoleChecker,
  MentorController.showProfile
);
MentorRouter.get(
  "/mentor-connections",
  AuthenticationMiddleware,
  MentorRoleChecker,
  MentorController.showConnections
);
MentorRouter.put(
  "/mentor-editProfile",
  AuthenticationMiddleware,
  MentorRoleChecker,
  MentorController.editProfile
);
export default MentorRouter;
