import express from "express";
import connectDB from "./config/dbConfig.js";
const app = express();
import apiRoutes from "./router/index.js";
import PORT from "./config/portConfig.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.get("/", (req, res) => {
//  return res.json({ message: "1st get" });
//});
////app.get("/ping", (req, res) => {
//return res.json({ message: "ping" });
//});

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`server started at the port :${PORT}`);
  connectDB();
});
