import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./database/connect.js";
import postRoutes from "./routes/post.routes.js";
import dalleRoutes from "./routes/dalle.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello world");
});

const PORT = 4000;
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(`App running in http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
