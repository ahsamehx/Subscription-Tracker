import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        if (process.env.NODE_ENV !== "production") return next(); // skip Arcjet locally
        const desicion = await aj.protect(req, {requested : 1});
        if(desicion.isDenied())
        {
            if(desicion.reason.isRateLimit()) return res.status(429).json({ message: "Too many requests, please try again later." });
            if(desicion.reason.isBot()) return res.status(403).json({ message: "Access denied for bots." });
            return res.status(403).json({ message: "Access denied." });
        }
        next();
    }
    catch (error) {
        console.error("Arcjet middleware error:", error);
        next(error);
    }
}

export default arcjetMiddleware;