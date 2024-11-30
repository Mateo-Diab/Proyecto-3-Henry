import { Router } from "express";
import userRouter from "./userRouter";
import appointementsRouter from "./appointementsRouter";

const router: Router = Router();

router.use("/users", userRouter)
router.use("/appointements", appointementsRouter)

export default router;