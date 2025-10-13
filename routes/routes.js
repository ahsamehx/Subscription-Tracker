import UserRouter from "./userRoutes.js";
import subscriptionRouter from "./subscriptionRouter.js";
import authRouter from "./authRoutes.js";
import workflowRouter from "./workflow.js";
import { Router } from "express";

const router = Router();
router.use('/users', UserRouter);
router.use('/subscriptions', subscriptionRouter);
router.use('/auth', authRouter);
router.use('/workflows', workflowRouter);

export default router;