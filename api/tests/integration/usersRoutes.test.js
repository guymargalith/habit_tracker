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
  
    it("should return a list of all users in the database", async () => {
      const res = await request(api).get("/users");
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
    });
    });
  