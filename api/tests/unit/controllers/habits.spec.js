const habitsController = require("../../../controllers/habits");
const Habit = require("../../../models/Habit");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe("habits controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("___", () => {
    test("it returns habits with a 200 status code", async () => {
      jest.spyOn(Habit, "all", "get").mockResolvedValue(["habit1", "habit2"]);
      await Habit.___(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["habit1", "habit2"]);
    });
  });
});
