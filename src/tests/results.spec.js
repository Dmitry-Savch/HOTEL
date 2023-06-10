const { getResult, addResult } = require("../api/laboratoryResults.api");

const ResultMock = {};

jest.mock("../models/LaboratoryResult", () => {
  ResultMock.save = jest.fn();
  ResultMock.findById = jest.fn();

  return {
    LaboratoryResult: jest.fn().mockImplementation(() => ({
      save: ResultMock.save,
      findById: ResultMock.findById
    }))
  }
})

describe("Result", () => {
  describe("getResult", () => {
    it("should be status code 404 when result not found", async () => {
      const req = { params: { _id: "result-id" } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      }

      ResultMock.findById.mockImplementationOnce(null);

      await getResult(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(404);
    })

    it("should be status code 201 when insert in db was success", async () => {
      const req = { body: { patient: "123", testName: "aaaa", result: "asdasd" } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      }

      ResultMock.save.mockImplementationOnce(async () => { return {} })

      await addResult(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(201);
    })
  })
})