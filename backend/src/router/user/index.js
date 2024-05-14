import { Router } from "express";
import UserController from "../../controller/user/index.js";
import AuthenticationMiddleware from "../../middleware/authorization.js";
import AuthController from "../../controller/auth/index.js";

const UserRouter = Router();
UserRouter.get("/user-get", AuthenticationMiddleware, UserController.get);
UserRouter.put("/user-update", UserController.update);
UserRouter.delete("/user-delete", UserController.delete);
UserRouter.get("/user/:user", UserController.getOne);

export default UserRouter;
