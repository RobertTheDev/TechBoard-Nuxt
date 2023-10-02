import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;

// Custom log format.
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create the winston logger.
const winstonLogger = createLogger({
  level: "info", // Minimum log level to display
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add a timestamp to the log.
    myFormat // Apply custom log formatting.
  ),
  transports: [
    new transports.Console(), // Log to the console.
    new transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to a file.
    new transports.File({ filename: "logs/combined.log" }), // Log all levels to another file.
  ],
});

export default winstonLogger;
