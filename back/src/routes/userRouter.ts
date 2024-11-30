import { Router } from "express";
import { getUserByIdController, getUsersController, loginUserController, registerUserController } from "../controllers/usersController";
import { validateRegister } from "../middlewares/validateRegister";

const userRouter: Router = Router();

userRouter.get("/", getUsersController);

userRouter.get("/:id", getUserByIdController);  

userRouter.post("/register" , validateRegister, registerUserController); //Request<Params, Query, body>

userRouter.post("/login", loginUserController);

export default userRouter;