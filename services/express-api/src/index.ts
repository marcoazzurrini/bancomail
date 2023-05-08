import express from "express";
import sequelize from "./database";
import router from "./routes";
import env from "./env";
import cors from "cors";
import session from "express-session";

const maxRetries = 5;
const retryInterval = 5000; // 5 seconds

async function connectWithRetry(retriesRemaining: number) {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connection established");
  } catch (error) {
    if (retriesRemaining > 0) {
      console.log(
        `Connection failed, retrying in ${retryInterval / 1000} seconds...`
      );
      setTimeout(() => connectWithRetry(retriesRemaining - 1), retryInterval);
    } else {
      console.log("Failed to connect to the database after max retries");
      process.exit(1);
    }
  }
}

connectWithRetry(maxRetries);

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hour
      secure: false,
      httpOnly: true,
    },
  })
);
app.use("/api", router);

app.get("/", (_, res) => {
  res.send("Hello World!");
});

export const server = app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});

export default app;
