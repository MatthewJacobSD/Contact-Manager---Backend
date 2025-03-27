/**
 * 📱 HTTP Status Codes ~ for the Sassy Devs 💅
 *
 * @description No more guessing status codes – it's all vibes here 🎶
 *
 * @example
 * import { STATUS } from './constants.js';
 * res.status(STATUS.NOT_FOUND).json({ error: 'Bruh, this ain’t it 👀' });
 */
export const STATUS = {
    // 2xx – Success (We ate! 🍽️)
    OK: 200,                  // 👌 Everything slaps
    CREATED: 201,             // 🎉 Just built different
    NO_CONTENT: 204,          // 📭 No response? Still valid, fam.

    // 4xx – Client did *not* eat (Skill issue 💀)
    BAD_REQUEST: 400,         // 🤡 Sent absolute nonsense
    UNAUTHORIZED: 401,        // 🕵️‍♂️ Who even are you??
    FORBIDDEN: 403,           // 🚷 Not today, hacker.
    NOT_FOUND: 404,           // 👻 This page? Gone. Reduced to atoms.
    CONFLICT: 409,            // 🥊 Data beefin’ with itself
    TOO_MANY_REQUESTS: 429,   // 🐇 Slow down, rabbit!

    // 5xx – Server said "I can't even" 😫
    SERVER_ERROR: 500,        // 💥 We fumbled the bag
    NOT_IMPLEMENTED: 501,     // 🦆 Duck-tape code
    SERVICE_UNAVAILABLE: 503, // 🛠️ Down bad rn
};

/**
 * Default sassy error messages 🎤
 */
export const ERROR_MESSAGES = {
    [STATUS.BAD_REQUEST]: "Bruh, check your request 🧐",
    [STATUS.UNAUTHORIZED]: "Nah, log in first 🔑",
    [STATUS.NOT_FOUND]: "This ain’t here, chief 🕳️",
    [STATUS.SERVER_ERROR]: "Our bad – server had a meltdown 🤯",
};

/**
 * Spice up errors with ✨ personality ✨
 * @param {number} statusCode - HTTP code (pick from STATUS)
 * @param {string} [customMessage] - Optional roast 🔥
 * @returns {Object} Error response (with extra sass)
 */
export const slayError = (statusCode, customMessage) => ({
    status: "error",
    code: statusCode,
    message: customMessage || ERROR_MESSAGES[statusCode] || "Oops? 🤷‍♂️",
    timestamp: new Date().toISOString(),
});

// Pro Tip: Use these like:
// if (userNotFound) {
//   return res.status(STATUS.NOT_FOUND).json(
//     slayError(STATUS.NOT_FOUND, "User ghosted us 👻")
//   );
// }