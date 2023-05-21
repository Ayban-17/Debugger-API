import express from "express";
import cors from "cors";
import gptRouter from "./routes/gptResponse.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

import dotenv from "dotenv";

dotenv.config();

app.use("/api/v1/openAI", gptRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
