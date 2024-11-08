import rateLimit from "express-rate-limit";

// limiter for the otp
const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
	limit: 3,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
});

export default otpLimiter;