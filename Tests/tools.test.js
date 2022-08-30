require("dotenv").config();
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Tool = require("../Models/toolModel");

describe("Test /api/tools/", () => {
  // Connect to DB

  beforeAll(() => {
    mongoose.connect(process.env.DBSTRING);
  });

  // Tests allTools (toolControllers.js)

  test("GET should return status 200", async () => {
    const response = await request(app).get("/api/tools/");

    expect(response.statusCode).toBe(200);
  });

  // Tests newTool (toolControllers.js)

  test("POST should create new Tool (201)", async () => {
    const response = await request(app)
      .post("/api/tools/")
      .send({
        title: "testcreated",
        link: "link.com",
        description: "site de teste",
        tags: ["teste"],
      });

    expect(response.statusCode).toBe(201);
    const id = await response.body._id;
  });

  // Tests title duplication

  test("POST should return status 400 / TITLE", async () => {
    const response = await request(app)
      .post("/api/tools/")
      .send({
        title: "testCreated",
        link: "link.com",
        description: "site de teste",
        tags: ["teste"],
      });

    expect(response.body).toEqual({
      error:
        'E11000 duplicate key error collection: test.tools index: title_1 dup key: { title: "testcreated" }',
    });
  });

  // Tests description length

  test("POST should return status 400 / DESCRIPTION", async () => {
    const response = await request(app)
      .post("/api/tools/")
      .send({
        title: "novo titullo",
        link: "novolink.com",
        description:
          "site de fakeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        tags: ["fake"],
      });

    expect(response.body).toEqual({
      error:
        "Tool validation failed: description: Path `description` (`site de fakeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`) is longer than the maximum allowed length (256).",
    });
  });

  // Tests tags array length

  test("POST should return status 400 / TAGS", async () => {
    const response = await request(app)
      .post("/api/tools/")
      .send({
        title: "novo titulo",
        link: "novolink.com",
        description: "site de fake",
        tags: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
      });

    expect(response.body).toEqual({
      error: "tags elements exceeds the limit(8)",
    });
  });

  // Close connection

  afterAll(async () => {
    const tool = await Tool.findOneAndDelete({ title: "testcreated" });
    mongoose.disconnect();
    return;
  });
});
