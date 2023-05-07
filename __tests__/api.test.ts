import request from "supertest";
import app, { server } from "../src";
import { User } from "../src/models/User";
import sequelize from "../src/database";

// Remove all users before running tests
beforeAll(async () => {
  await User.destroy({ where: {} });
});

afterAll(async () => {
  server.close();
  await sequelize.close();
});

describe("User registration", () => {
  test("should create a new user", async () => {
    const res = await request(app).post("/api/register").send({
      username: "test_user",
      email: "test_user@email.com",
      password: "password1",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("username", "test_user");
  });

  test("should not create a user with missing data", async () => {
    const res = await request(app).post("/api/register").send({
      username: "",
      email: "test_user2@email.com",
      password: "password2",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  test("should not create a user with an existing username or email", async () => {
    const res = await request(app).post("/api/register").send({
      username: "test_user",
      email: "test_user@email.com",
      password: "password2",
    });
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty(
      "error",
      "User with this username or email already exists"
    );
  });
});

describe("User login", () => {
  test("should login successfully with correct credentials", async () => {
    const res = await request(app)
      .post("/api/login")
      .auth("test_user", "password1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Logged in successfully");
  });

  test("should not login with an incorrect password", async () => {
    const res = await request(app)
      .post("/api/login")
      .auth("test_user", "incorrect_password");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Unauthorized");
  });

  test("should not login with a non-existent username", async () => {
    const res = await request(app)
      .post("/api/login")
      .auth("non_existent_user", "password1");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Unauthorized");
  });
});

describe("List users", () => {
  test("should return a list of users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("username", "test_user");
  });
});
