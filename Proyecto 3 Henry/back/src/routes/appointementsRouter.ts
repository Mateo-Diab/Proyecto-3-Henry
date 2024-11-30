import { Router } from "express";
import { cancelAppointementController, getAllAppointementsController, getAppointementByIdController, RegisterNewAppointementsController } from "../controllers/appointementsController";
import { validateRegisterAppointement } from "../middlewares/validateRegisterAppointement";

const appointementsRouter: Router = Router();

appointementsRouter.get("/", getAllAppointementsController)

appointementsRouter.get("/:id", getAppointementByIdController)

appointementsRouter.post("/schedule", validateRegisterAppointement, RegisterNewAppointementsController)

appointementsRouter.put("/cancel/:id", cancelAppointementController)

export default appointementsRouter;