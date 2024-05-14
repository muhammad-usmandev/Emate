import { Router } from "express";
import AuthenticationMiddleware from "../../middleware/authorization.js";
import SeekerController from "../../controller/seeker/index.js";
import SeekerRoleChecker from "../../middleware/seekerRoleChecker.js";

const SeekerRouter = Router();
SeekerRouter.get(
  "/seeker-profile",
  AuthenticationMiddleware,
  SeekerRoleChecker,
  SeekerController.showProfile
);

SeekerRouter.get(
  "/seeker-connections",
  AuthenticationMiddleware,
  SeekerRoleChecker,
  SeekerController.showConnections
);
SeekerRouter.put(
  "/seeker-editProfile",
  AuthenticationMiddleware,
  SeekerRoleChecker,
  SeekerController.editProfile
);
export default SeekerRouter;
