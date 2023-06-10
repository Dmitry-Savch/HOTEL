const {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment } = require("../api/appointments.api")

const AppointmentMock = {};

jest.mock("../models/Appointment", () => {
  AppointmentMock.save = jest.fn();
  AppointmentMock.find = jest.fn();
  AppointmentMock.findByIdAndDelete = jest.fn();
  AppointmentMock.findByIdAndUpdate = jest.fn();

  return {
    Appointment: jest.fn().mockImplementation(() => ({
      save: AppointmentMock.save,
      find: AppointmentMock.find,
      findByIdAndDelete: AppointmentMock.findByIdAndDelete,
      findByIdAndUpdate: AppointmentMock.findByIdAndUpdate,
    }))
  }
})

describe("Appointment", () => {
  describe("getAppointments", () => {
    it("should retrieve appointments and return status code 200", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      const mockAppointments = [];
      AppointmentMock.find.mockImplementationOnce(mockAppointments);

      await getAppointments(req, res);

      expect(res.status).toBeCalledTimes(2);
      expect(res.status).toBeCalledWith(200);
    });
  })
  describe("addAppointment", () => {
    it("should add appointment and return status code 201", async () => {
      const req = {
        body: {
          duration: 60,
          reason: "Check-up",
          status: "scheduled"
        }
      };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      AppointmentMock.save.mockImplementationOnce(async () => { return {} });

      await addAppointment(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(201);
    });
  })
  describe("updateAppointment", () => {
    it("should update appointment and return status code 200", async () => {
      const req = {
        params: { _id: "123456789" },
        body: {
          duration: 30,
          reason: "Follow-up",
          status: "completed"
        }
      };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      AppointmentMock.findByIdAndUpdate.mockImplementationOnce(async () => { return {} });

      await updateAppointment(req, res);

      expect(res.status).toBeCalledTimes(2);
      expect(res.status).toBeCalledWith(200);
    });
  })
  describe("deleteAppointment", () => {
    it("should delete appointment and return status code 200", async () => {
      const req = {
        params: { _id: "123456789" }
      };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      };

      AppointmentMock.findByIdAndDelete.mockImplementationOnce(async () => { return {} });

      await deleteAppointment(req, res);

      expect(res.status).toBeCalledTimes(2);
      expect(res.status).toBeCalledWith(200);
    });
  })
})