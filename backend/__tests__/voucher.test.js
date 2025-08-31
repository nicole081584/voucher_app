const request = require("supertest");

// Mock the service manager so we control behavior
jest.mock("../libraries/voucherServiceManager", () => {
  const defaultMock = {
    addVoucher: jest.fn().mockResolvedValue(true),
    deletVoucher: jest.fn().mockResolvedValue(true),
    mailVoucher: jest.fn().mockResolvedValue(true),
  };

  return {
    voucherServiceManager: jest.fn(() => defaultMock),
    __mock__: defaultMock, // expose for test overrides
  };
});


const { __mock__ } = require("../libraries/voucherServiceManager");
const app = require("../app");


  it("should create a voucher successfully", async () => {
    const res = await request(app)
      .post("/vouchers")
      .send({
        title: "Mr.",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "07700900123",
        email: "john@example.com",
        value: 50,
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("voucherNumber");
  });

  it("should return error if addVoucher fails", async () => {
    __mock__.addVoucher.mockResolvedValue(false);

    const app = require("../app"); // reload with new mock

    const res = await request(app).post("/vouchers").send({
      title: "Mr.",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "07700900123",
      email: "john@example.com",
      value: 50,
    });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Purchase unsuccessful");
  });

  it("should return error if email fails", async () => {
  __mock__.addVoucher.mockResolvedValue(true);
  __mock__.mailVoucher.mockRejectedValue(new Error("Email failed"));

  const res = await request(app).post("/vouchers").send({
    title: "Mr.",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "07700900123",
    email: "john@example.com",
    value: 50,
  });

  expect(res.status).toBe(400);
  expect(res.body.status).toBe("error");
  expect(res.body.message).toBe("Failed to send voucher");
});


  it("should return 500 on server error", async () => {

    __mock__.addVoucher.mockRejectedValue(new Error("DB crashed"));

    const app = require("../app");

    const res = await request(app).post("/vouchers").send({
      title: "Mr.",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "07700900123",
      email: "john@example.com",
      value: 50,
    });

    expect(res.status).toBe(500);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Server error");
  });

// Ensure DB closes after tests
afterAll(async () => {
  const { vouchersdb } = require("../libraries/prepareDatabases");
  if (vouchersdb && vouchersdb.close) {
    vouchersdb.close();
  }
});
