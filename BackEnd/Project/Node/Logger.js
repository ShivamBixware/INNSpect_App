// logger.js
const { createLogger, format, transports } = require('winston');

// Create a logger instance
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.File({ filename: 'app.log' }),  // Log to a file
        new transports.Console()                         // Log to console (optional)
    ],
});

module.exports = logger;
