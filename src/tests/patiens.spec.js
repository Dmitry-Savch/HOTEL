const { getPatient, addPatient, updatePatient } = require("../api/patients.api");

const PatientMock = {};

jest.mock("../models/Patient", () => {
  PatientMock.save = jest.fn();
  PatientMock.findById = jest.fn();
  PatientMock.findByIdAndUpdate = jest.fn();

  return {
    Patient: jest.fn().mockImplementation(() => ({
      save: PatientMock.save,
      findById: PatientMock.findById,
      findByIdAndUpdate: PatientMock.findByIdAndUpdate,
    }))
  }
})

describe("Patient", () => {
  describe("getPatient", () => {
    it("should be status code 404 when result not found", async () => {
      const req = { params: { _id: "123456789" } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      }

      PatientMock.findById.mockImplementationOnce(null);

      await getPatient(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(404);
    })
    describe("addPatient", () => {
      it("should be status code 201 when insert in db was success", async () => {
        const req = {
          body: {
            name: "Test Patient",
            species: "Dog",
            breed: "Labrador Retriever",
            dateOfBirth: "2020-01-01",
            gender: "Male",
            weight: 20
          }
        };
        const res = {
          status: jest.fn().mockImplementation(() => res),
          send: jest.fn(),
        };

        PatientMock.save.mockImplementationOnce(async () => { return {} });

        await addPatient(req, res);

        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(201);
      });
    })
    describe("updatePatient", () => {
      it("should be status code 404 when result not found", async () => {
        const req = {
          params: { _id: "123456789" },
          body: {
            name: "Updated Patient",
            species: "Cat",
            breed: "Persian",
            dateOfBirth: "2019-05-10",
            gender: "Female",
            weight: 10
          }
        };
        const res = {
          status: jest.fn().mockImplementation(() => res),
          send: jest.fn(),
        }

        PatientMock.findById.mockImplementationOnce(null);

        await updatePatient(req, res);

        expect(res.status).toBeCalledTimes(2);
        expect(res.status).toBeCalledWith(404);
      })
      it("should update patient and return status code 200", async () => {
        const req = {
          params: { _id: "123456789" },
          body: {
            name: "Updated Patient",
            species: "Cat",
            breed: "Persian",
            dateOfBirth: "2019-05-10",
            gender: "Female",
            weight: 10
          }
        };
        const res = {
          status: jest.fn().mockImplementation(() => res),
          send: jest.fn(),
        };

        const mockUpdatedPatient = {};
        PatientMock.findByIdAndUpdate.mockImplementationOnce(mockUpdatedPatient);

        await updatePatient(req, res);

        expect(res.status).toBeCalledTimes(2);
        expect(res.status).toBeCalledWith(200);
      });
    })
  })
})