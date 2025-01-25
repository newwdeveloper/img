import express from "express";
import connectDB from "./config/dbConfig.js";
const app = express();
import apiRoutes from "./router/index.js";
import PORT from "./config/portConfig.js";
import errorHandler from "./middleware/eerorMiddleware.js";
import multer from "multer";
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.get("/", (req, res) => {
//  return res.json({ message: "1st get" });
//});
////app.get("/ping", (req, res) => {
//return res.json({ message: "ping" });
//});
app.use((req, res, next) => {
  console.log("Incoming Request Details:");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body); // Log request body (parsed JSON or form data)
  next(); // Ensure the request continues to the next middleware or route
});
app.use(upload.none());

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`server started at the port :${PORT}`);
  connectDB();
});

// Use the error-handling middleware

app.use(errorHandler);
