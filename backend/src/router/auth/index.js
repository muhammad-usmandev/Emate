import { Router } from "express";
import AuthController from "../../controller/auth/index.js";
import AuthValidator from "../../validator/auth/index.js";
import uploadMiddleware from "../../middleware/multerMiddleware.js";

const AuthRouter = Router();

AuthRouter.post(
  "/register",
  uploadMiddleware,
  AuthValidator.register,
  AuthController.register
);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/forgot-password", AuthController.forgotPassword);
AuthRouter.patch("/reset-password/:token", AuthController.resetPassword);
AuthRouter.get("/uploads/:filename", AuthController.getProfilePicture);

AuthRouter.post("/nearestMentor", AuthController.nearestMentor);
export default AuthRouter;
