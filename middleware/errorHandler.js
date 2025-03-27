import { STATUS } from '../constants.js';

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || STATUS.SERVER_ERROR;

    // 🎨 Error response template
    const errorResponse = {
        status: 'fail',
        code: statusCode,
        message: err.message || 'Oopsie whoopsie! 🫢',
        stack: process.env.NODE_ENV === 'development' ? err.stack : '🙈 Prod mode - no stack for you!',
        emoji: '💥', // Default oopsie face
        type: 'Server Side L'
    };

    // 🔥 Emoji + sass based on error type
    switch(statusCode) {
        case STATUS.BAD_REQUEST:
            errorResponse.emoji = "🤦‍♂️";
            errorResponse.type = "You sent nonsense";
            errorResponse.message = err.message || "Bruh, check your request 🧐";
            break;
        case STATUS.UNAUTHORIZED:
            errorResponse.emoji = "🔒";
            errorResponse.type = "Who dis?";
            errorResponse.message = err.message || "Not you forgetting to log in... again 😤";
            break;
        case STATUS.FORBIDDEN:
            errorResponse.emoji = "🚫";
            errorResponse.type = "No touchy!";
            errorResponse.message = err.message || "Aht aht! Not your data 👮‍♀️";
            break;
        case STATUS.NOT_FOUND:
            errorResponse.emoji = "👻";
            errorResponse.type = "404 Vibes";
            errorResponse.message = err.message || "This ain't here, chief 🕳️";
            break;
        case STATUS.TOO_MANY_REQUESTS:
            errorResponse.emoji = "🐇";
            errorResponse.type = "Slow yo roll";
            errorResponse.message = "Chill with the requests, rabbit! 🥤";
            break;
    }

    // 📤 Send that spicy response
    res.status(statusCode).json(errorResponse);
};