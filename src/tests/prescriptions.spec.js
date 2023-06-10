const {
  getPrescription,
  addPrescription,
  updatePrescription
} = require("../api/prescriptions.api");

const PrescriptionMock = {};

jest.mock("../models/Prescription", () => {
  PrescriptionMock.save = jest.fn();
  PrescriptionMock.findById = jest.fn();
  PrescriptionMock.findByIdAndUpdate = jest.fn();

  return {
    Prescription: jest.fn().mockImplementation(() => ({
      save: PrescriptionMock.save,
      findById: PrescriptionMock.findById,
      findByIdAndUpdate: PrescriptionMock.findByIdAndUpdate,
    }))
  }
})

describe("Prescription", () => {
  describe('getPrescription', () => {
    it("should be status code 404 when result not found", async () => {
      const req = { params: { _id: "123456789" } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      }

      PrescriptionMock.findById.mockImplementationOnce(null);

      await getPrescription(req, res);

      expect(res.status).toBeCalledTimes(2);
      expect(res.status).toBeCalledWith(404);
    })
  })
  describe("addPrescription", () => {
    it("should be status code 201 when insert in db was success", async () => {
      const req = {
        body: {
          patient: "123",
          medication: "Med A",
          dosage: "10mg",
          endDate: "2023-06-30",
          instructions: "Take once daily",
          status: "active"
        }
      };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      PrescriptionMock.save.mockImplementationOnce(async () => { return {} });

      await addPrescription(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(201);
    });
  })
  describe("updatePrescription", () => {
    it("should update prescription and return status code 200", async () => {
      const req = {
        params: { _id: "123456789" },
        body: {
          patient: "456",
          medication: "Med B",
          dosage: "20mg",
          endDate: "2023-07-31",
          instructions: "Take twice daily",
          status: "active"
        }
      };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      PrescriptionMock.findByIdAndUpdate.mockImplementationOnce(async () => { return {} });

      await updatePrescription(req, res);

      expect(res.status).toBeCalledTimes(2);
      expect(res.status).toBeCalledWith(200);
    });
  })
})