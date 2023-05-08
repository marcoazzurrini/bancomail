import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  DB_NAME: z.string().nonempty(),
  DB_USER: z.string().nonempty(),
  DB_USER_PASSWORD: z.string().nonempty(),
  DB_ROOT_PASSWORD: z.string().nonempty(),
  DB_HOST: z.string().nonempty(),
  SESSION_SECRET: z.string().nonempty(),
  PORT: z.string().nonempty(),
});

const env = envSchema.parse(process.env);

export default env;
