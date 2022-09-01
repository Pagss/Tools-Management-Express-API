require("dotenv").config();
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Tool = require("../Models/toolModel");

describe("Test UPDATE one tool", () => {
  // Connect to DB
  let id;
  let idToFail;
  beforeAll(async () => {
    mongoose.connect(process.env.DBSTRING);

    // Generate Tool ID for uri parameters
    const tool = await Tool.create({
      title: "testoneupdatecreated",
      link: "link.com",
      description: "site de teste",
      tags: ["teste"],
    });

    id = tool._id.valueOf();

    const toolToFail = await Tool.create({
      title: "testoneupdatetofailcreated",
      link: "linktofail.com",
      description: "site de teste to fail",
      tags: ["teste to fail"],
    });

    idToFail = toolToFail._id.valueOf();
  });

  // Update title
  test("UPDATE title should return 'newtitle'", async () => {
    const response = await request(app).patch(`/api/tools/${id}`).send({
      title: "newtitle",
    });

    expect(response.body.title).toEqual("newtitle");
  });

  // Update title fail
  test("UPDATE title should not duplicate", async () => {
    const response = await request(app).patch(`/api/tools/${id}`).send({
      title: "testoneUpdatetofailcreated",
    });

    expect(response.body).toEqual({
      error:
        'Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.tools index: title_1 dup key: { title: "testoneupdatetofailcreated" }',
    });
  });

  // Update link
  test("UPDATE link should return 'newlink.com'", async () => {
    const response = await request(app).patch(`/api/tools/${id}`).send({
      link: "newlink.com",
    });

    expect(response.body.link).toEqual("newlink.com");
  });

  // Update description
  test("UPDATE one Tool should return 'new description'", async () => {
    const response = await request(app).patch(`/api/tools/${id}`).send({
      description: "new description",
    });

    expect(response.body.description).toEqual("new description");
  });

  // Update description fail
  test("UPDATE one Tool should block by length", async () => {
    const response = await request(app).patch(`/api/tools/${idToFail}`).send({
      description:
        "new descriptionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });

    expect(response.body).toEqual({
      error:
        "Validation failed: description: Path `description` (`new descriptionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`) is longer than the maximum allowed length (256).",
    });
  });

  // Update tags
  test("UPDATE tags should return `[new tags]`", async () => {
    const response = await request(app)
      .patch(`/api/tools/${id}`)
      .send({
        tags: ["new tags"],
      });

    expect(response.body.tags).toEqual(["new tags"]);
  });

  // Update tags fail
  test("UPDATE tags should block by array length", async () => {
    const response = await request(app)
      .patch(`/api/tools/${idToFail}`)
      .send({
        tags: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      });

    expect(response.body).toEqual({
      error: "Validation failed: tags: tags elements exceeds the limit(8)",
    });
  });

  // Close connection
  afterAll(async () => {
    const deleteTool = await Tool.findOneAndDelete({ title: "newtitle" });

    const deleteAtool = await Tool.findOneAndDelete({
      title: "testoneupdatetofailcreated",
    });

    mongoose.disconnect();
    return;
  });
});
