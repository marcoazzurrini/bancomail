import express from "express";
import { config } from "dotenv";
import sequelize from "./database";
import router from "./routes";

config();

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", router);

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
