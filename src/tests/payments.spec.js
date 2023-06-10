const { addPayment } = require("../api/payments.api");

const PaymentMock = {};

jest.mock("../models/Payment", () => {
  PaymentMock.save = jest.fn();

  return {
    Payment: jest.fn().mockImplementation(() => ({
      save: PaymentMock.save,
    }))
  }
})

describe("Payment", () => {
  describe("addPayment", () => {
    it("should be status code 400 when insert in db was failed", async () => {
      const req = { body: { amount: 100, currency: "usd", description: "aaaaa", status: "completed" } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      }

      PaymentMock.save.mockImplementationOnce(async () => { throw new Error() });

      await addPayment(req, res);

      expect(res.status).toBeCalledTimes(2);
      expect(res.status).toBeCalledWith(400);
    })

    it("should be status code 201 when insert in db was success", async () => {
      const req = { body: { amount: 100, currency: "usd", description: "aaaaa", status: "completed" } };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        send: jest.fn(),
      }

      PaymentMock.save.mockImplementationOnce(async () => { return {} })

      await addPayment(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(201);
    })
  })
})