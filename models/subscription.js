import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: [2, "Subscription name must be at least 2 characters long"],
        maxLength: [100, "Subscription name must be at most 100 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    currency: {
        type: String,
        required: [true, "Currency is required"],
        enum: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "RUB", "BRL", "ZAR", "TRY", "KRW", "MXN", "IDR", "SAR", "AED", "NGN", "EGP", "PKR", "BDT", "VND", "THB", "MYR", "PHP", "PLN", "HUF", "CZK", "DKK", "NOK", "SEK", "ILS", "CLP", "COP", "PEN", "ARS"],
        default: "EGP",
        uppercase: true
    },
    billingCycle: {
        type: String,
        required: [true, "Billing cycle is required"],
        enum: ["monthly", "yearly", "weekly", "daily", "quarterly", "biannually"],
        default: "monthly"
    },
    category: {
        type: String,
        trim: true,
        maxLength: [50, "Category must be at most 50 characters long"],
        default: "General",
        enum: ["Entertainment", "Productivity", "Health", "Education", "Finance", "Utilities", "Shopping", "Travel", "Food", "Music", "Video Streaming", "Cloud Storage", "Software", "Gaming", "News", "Social Media", "Communication", "Fitness", "Wellness", "Other"],
        required: [true, "Category is required"],
    },
    paymentMethod: {
        type: String,
        trim: true,
        required: [true, "Payment method is required"],
        maxLength: [50, "Payment method must be at most 50 characters long"],
    }, 
    status: {
        type: String,
        enum: ["active", "inactive", "canceled", "paused", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate:{
            validator:function(value) {return value <= new Date()},    
            message: "Start date cannot be in the future"
        },
        default: Date.now
    },
    renewalDate: {
        type: Date,
        validate:{
            validator:function(value) 
            {return value > this.startDate},
            message: "Renewal date must be after start date"
        },
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"], 
        index: true
    }
}, { timestamps: true });
    
//Auto set renewalDate based on billingCycle and startDate
SubscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            quarterly: 90,
            biannually: 180,
            yearly: 365
        };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.billingCycle]);
    }
    //Auto-update the status if renewalDate has passed
    if(this.renewalDate && this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
export default Subscription;