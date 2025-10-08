import { Router } from "express";
const subscriptionRouter = Router();

subscriptionRouter.post('/', (req, res) => {
  res.send({title : "Get all subscriptions"});
});

subscriptionRouter.get('/:id', (req, res) => {
  res.send({title : "Get subscription details"});
});

subscriptionRouter.post('/', (req, res) => {
  res.send({title : "Create new subscription"});
});

subscriptionRouter.put('/:id', (req, res) => {
  res.send({title : "Update subscription details"});
});

subscriptionRouter.delete('/:id', (req, res) => { 
    res.send({title : "Delete a subscription"});
});

subscriptionRouter.get('/user/:userId', (req, res) => {
    res.send({title : "Get all subscriptions for a user"});
});

subscriptionRouter.get('/:id/cancel', (req, res) => {
    res.send({title : "Cancel a subscription"});
});

subscriptionRouter.get ('/upcoming-renewals', (req, res) => {
    res.send({title : "Get upcoming renewals"});
});

export default subscriptionRouter;