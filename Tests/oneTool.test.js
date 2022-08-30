require("dotenv").config();
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Tool = require("../Models/toolModel");

describe("Test /api/tools/:id", () => {
  // Connect to DB
  let id;
  beforeAll(async () => {
    mongoose.connect(process.env.DBSTRING);

    // Generate Tool ID for uri parameters
    const tool = await Tool.create({
      title: "testonecreated",
      link: "link.com",
      description: "site de teste",
      tags: ["teste"],
    });

    id = tool._id.valueOf();
  });

  // Test GET one tool
  test("GET one Tool should return status 200", async () => {
    const response = await request(app).get(`/api/tools/${id}`);

    expect(response.statusCode).toBe(200);
  });

  // Test DELETE one tool
  test("DELETE one Tool should return status 200", async () => {
    const response = await request(app).delete(`/api/tools/${id}`);

    expect(response.statusCode).toBe(200);
  });

  // Close connection
  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
