import Subscription from '../Models/subscription.js';

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({...req.body, user: req.user._id});
        res.status(201).json({ success: true, subscription });
    }
    catch(error){
        next(error);
    }  
};

export const getUserSubscriptions = async (req, res, next) => {
    try{
        let userId;
        if(req.params.userId)
        {
            if(req.user.role !== 'admin') {
                return res.status(403).json({ message: "Access denied: insufficient permissions" });
            }
            userId = req.params.userId;
        }
        else {
            userId = req.user._id;
        }
        const subscriptions = await Subscription.find({user: userId});
        res.status(200).json({ success: true, data :subscriptions });
    }
    catch(error){
        next(error);
    }
};

export const AllSubscriptions = async (req, res, next) => {
    try{
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data :subscriptions });
    }
    catch(error){
        next(error);
    }
};

export const SubscriptionDetailsById = async (req, res, next) => {
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription || (subscription.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }
        res.status(200).json({ success: true, data :subscription });
    }
    catch(error){
        next(error);
    }
};

export const updateSubscriptionDetails = async (req, res, next) => {
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription || (subscription.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }
        Object.assign(subscription, req.body);
        await subscription.save();
        res.status(200).json({ success: true, data :subscription });
    }
    catch(error){
        next(error);
    }
}; 

export const deleteSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription || (subscription.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }
        await subscription.deleteOne();
        res.status(200).json({ success: true, message : "Subscription deleted successfully" });
    }
    catch(error){
        next(error);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription || (subscription.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }
        subscription.status = 'canceled';
        await subscription.save();
        res.status(200).json({ success: true, message : "Subscription canceled successfully", data: subscription });
    }
    catch(error){
        next(error);
    }   
};

export const UpcomingRenewalsById = async (req, res, next) => {
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription || (subscription.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }
        res.status(200).json({ success: true, message : "Get upcoming renewals", data: subscription.renewalDate });
    }
    catch(error){
        next(error);
    }
};

export const UpcomingRenewals = async (req, res, next) => {
    try{
        const subscriptions = await Subscription.find({ user: req.user._id, renewalDate: { $ne: null }, status: "active" });
        if(!subscriptions.length) {
            return res.status(404).json({ success: false, message: "Subscriptions not found" });
        }
        res.status(200).json({ success: true, message : "Get upcoming renewals", data: subscriptions.map(sub => ({ id: sub.name, renewalDate: sub.renewalDate })) });
    }
    catch(error){
        next(error);
    }
};

