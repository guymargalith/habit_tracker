// const app = require("../../server");


describe("habits endpoints", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(async () => {
    api = app.listen(port, () =>
    console.log(`Test server running on port ${port}`)
    )});

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    api.close(done);
  });

  it("should return a list of all habits in the database", async () => {
    const res = await request(api).get("/habits");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });

  // not sure if this is right - habits/id ? or habits/1
  it("should return a specific habit with id 1", async () => {
    const res = await request(api).get("/habits/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(1);
  });

  it("should return a list of habits for user with id 1", async () => {
    const res = await request(api).get("/habits/specific/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
  });

  it("should return the streak of habit with id 1", async () => {
    const res = await request(api).get("/habits/1/streak");
    expect(res.statusCode).toEqual(200);
    expect(res.body.streak).toEqual(0);
  });

  it("should create a new habit", async () => {
    const res = await request(api).post("/habits").send({
      name: "New Habit", frequency: 3, userId: 1
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");

    const habitRes = await request(api).get("/habits");
    expect(habitRes.body.length).toEqual(3);
  });

  it("should patch a habit", async () => {
    const res = await request(api).patch("/habits").send({
      name: "Newest Habit", frequency: 1, id: 1
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("Newest Habit");
    expect(res.body.frequency).toEqual(1);
  });
  

  it("should delete a habit", async () => {
    const res = await request(api).delete("/habits/2");
    expect(res.statusCode).toEqual(204);

    const habitRes = await request(api).get("/habits/2");
    expect(habitRes.statusCode).toEqual(404);
    expect(habitRes.body).toHaveProperty("err");
  });

  it("should return the weekly logs of habit with id 1", async () => {
    const res = await request(api).get("/habits/1/weekly");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("logs");
  });
  });
