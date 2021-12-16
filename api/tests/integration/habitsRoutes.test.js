/ error: app is not defined
const app = require("../../server");
describe("habits endpoints", () => {
  let api = app.listen(5000, () =>
    console.log("Test server running on port 5000")
  );
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(async () => {
    api;
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    api.close(done);
  });

  it("should return a list of all habits in the database", async () => {
    const res = await request(api).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(3);
  });

  // not sure if this is right - habits/id ? or habits/1
  it("should return a list of habits from a specific user", async () => {
    const res = await request(api).get("/:id");
    expect(res.statusCode).toEqual(200);
    expect(res.body.books.length).toEqual(2);
  });
  it("should create a new habit", async () => {
    const res = await request(api).post("/").send({
      name: "New Habit",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");

    const habitRes = await request(api).get("/1");
    expect(habitRes.body.habits.length).toEqual(3);
  });

  it("should delete a habit", async () => {
    const res = await request(api).delete("/1");
    expect(res.statusCode).toEqual(204);

    const habitRes = await request(api).get("/1");
    expect(habitRes.statusCode).toEqual(404);
    expect(habitRes.body).toHaveProperty("err");
  });
});
