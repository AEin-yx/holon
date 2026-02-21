const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const healthRouter = require('./routes/health');
const { globalErrorList } = require("./middleware/globalErrorHandler");

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// mount the router
app.use("/api", authRoutes);
app.use('/', healthRouter); 

// Global error handler
app.use(globalErrorList);

app.listen(PORT, "0.0.0.0");
