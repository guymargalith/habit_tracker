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
  
    it("should return a list of all logs in the database", async () => {
      const res = await request(api).get("/logs");
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
    });
  
    it("should create a new log", async () => {
      const res = await request(api).post("/logs").send({
        date: 1639267200, habitId: 1
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id");
  
      const habitRes = await request(api).get("/logs");
      expect(habitRes.body.length).toEqual(3);
    });
  
    it("should delete a log", async () => {
      const res = await request(api).delete("/logs/1");
      expect(res.statusCode).toEqual(204);
  
      const habitRes = await request(api).get("/logs");
      expect(habitRes.body.length).toEqual(1);
    });
    });
  