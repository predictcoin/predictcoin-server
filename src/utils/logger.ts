import winston, {createLogger, format, transports} from "winston";
const { combine, timestamp, label, prettyPrint, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger(
  {
    format: combine(
      timestamp(),
      myFormat,
    ),
    transports: [
      new transports.File({
        filename: 'src/logs/combined.log',
        level: 'info'
      })
    ]
  }
)

export default logger;