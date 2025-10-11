import { Router } from "express";
import authorize from "../Middlewares/auth.js";
import { createSubscription, AllSubscriptions, getUserSubscriptions, SubscriptionDetailsById, updateSubscriptionDetails, deleteSubscription, cancelSubscription, UpcomingRenewalsById, UpcomingRenewals } from "../controllers/subscription.js";
import { authorizeRoles } from "../Middlewares/roleMiddleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, authorizeRoles("admin"), AllSubscriptions);

subscriptionRouter.get ('/upcoming-renewals', authorize, UpcomingRenewals);

subscriptionRouter.get('/:id', authorize, SubscriptionDetailsById);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', authorize, updateSubscriptionDetails);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/user/mySubscriptions', authorize, getUserSubscriptions);

subscriptionRouter.get('/user/:userId', authorize, authorizeRoles('admin'), getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

subscriptionRouter.get ('/upcoming-renewals/:id', authorize, UpcomingRenewalsById);


export default subscriptionRouter;