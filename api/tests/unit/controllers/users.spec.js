const usersControllers = require("../../../controllers/users");
const User = require("../../../models/User");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe("user controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("get", () => {
    test("it returns users with a 200 status code", async () => {
      jest.spyOn(User, "all", "get").mockResolvedValue(["user1", "user2"]);
      await usersControllers.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["user1", "user2"]);
    });
  });
  describe("show", () => {
    test("it returns a user with a 200 status code", async () => {
      jest
        .spyOn(User, "findById")
        .mockResolvedValue(new User({ id: 1, name: "Test User" }));

      const mockReq = { params: { id: 1 } };
      await authorsController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        id: 1,
        name: "Test User",
      });
    });
  });
});
