import request from "supertest";
import app from "../src";
import { User } from "../src/models/User";

// Remove all users before running tests
beforeAll(async () => {
  await User.destroy({ where: {} });
});

describe("User registration", () => {
  test("should create a new user", async () => {
    const res = await request(app).post("/register").send({
      username: "test_user",
      email: "test_user@email.com",
      password: "password1",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("username", "test_user");
  });
});

describe("User login", () => {
  test("should login successfully with correct credentials", async () => {
    const res = await request(app)
      .post("/login")
      .auth("test_user", "password1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Logged in successfully");
  });
});

describe("List users", () => {
  test("should return a list of users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("username", "test_user");
  });
});
