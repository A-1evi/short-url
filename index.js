import express from "express";
import connectToMongoDb from "./connect.js";
import path from "path";
import router from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js";
import URL from "./models/url.js";

const app = express();
const PORT = 8001;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/url", router);
app.use("/", staticRouter);

app.set("view engine", "ejs");

app.set("views", path.resolve("./views"));

connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB connected!");
});

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});

  return res.render("home", {
    urls: allUrls,
  });
});

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT}`);
});
