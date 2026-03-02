const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

// Custom Middleware
const myLogger = require("./middleware/logger");
const requestId = require("./middleware/requestId");
const errorHandler = require("./middleware/errorHandler");
const validateCookies = require("./middleware/validateCookies");

// Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const fakePost = require("./routes/fakeApi");
const testRouter = require("./routes/test");
const mergeParamRouter = require("./routes/merge_param_example/users");

// Expense Tracker API Routes
const expenseApiRouter = require("./src/routes/index");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();

// --- 1. Security & Performance ---
app.use(helmet()); // Basic security headers
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); // Enable CORS
app.use(compression()); // Compress responses

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true,
	legacyHeaders: false,
});
app.use("/api/", limiter); // Apply rate limit to API routes only (example)

// --- 2. Request Tracing & Logging ---
app.use(requestId()); // Add unique ID to each request
app.use(myLogger()); // Custom logger
app.use(morgan("dev")); // Morgan developer logging

// --- 3. Parsing & Assets ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// --- 4. Routes ---
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", fakePost);
app.use("/test", testRouter);
app.use("/mergeparam", mergeParamRouter);

// Expense Tracker API Endpoints group
app.use("/api", expenseApiRouter);

// Swagger Documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- 5. Error Handling ---
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// Centralized error handler (Last middleware)
app.use(errorHandler);

module.exports = app;
