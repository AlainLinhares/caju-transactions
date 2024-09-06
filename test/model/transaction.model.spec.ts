import { validate } from "class-validator";
import { Transaction } from "../../src/model/transaction";

describe("TransactionModel", () => {
  it("should be valid with correct properties", async () => {
    const transaction = new Transaction();
    transaction.accountId = ""; // Should be empty
    transaction.amount = 100;
    transaction.totalAmount = 500;
    transaction.merchant = ""; // Should be empty
    transaction.mcc = "1234";

    const errors = await validate(transaction);

    expect(errors.length).toBe(0);
  });

  it("should be invalid if amount is missing", async () => {
    const transaction = new Transaction();
    transaction.accountId = "";
    transaction.totalAmount = 500;
    transaction.merchant = "";
    transaction.mcc = "1234";

    const errors = await validate(transaction);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((err) => err.property === "amount")).toBe(true);
    expect(errors.some((err) => err.constraints?.isNotEmpty)).toBe(true);
  });

  it("should be invalid if totalAmount is missing", async () => {
    const transaction = new Transaction();
    transaction.accountId = "";
    transaction.amount = 100;
    transaction.merchant = "";
    transaction.mcc = "1234";

    const errors = await validate(transaction);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((err) => err.property === "totalAmount")).toBe(true);
    expect(errors.some((err) => err.constraints?.isNotEmpty)).toBe(true);
  });

  it("should be invalid if mcc is missing", async () => {
    const transaction = new Transaction();
    transaction.accountId = "";
    transaction.amount = 100;
    transaction.totalAmount = 500;
    transaction.merchant = "";

    const errors = await validate(transaction);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((err) => err.property === "mcc")).toBe(true);
    expect(errors.some((err) => err.constraints?.isNotEmpty)).toBe(true);
  });

  it("should be invalid if mcc is not a string", async () => {
    const transaction = new Transaction();
    transaction.accountId = "";
    transaction.amount = 100;
    transaction.totalAmount = 500;
    transaction.merchant = "";
    (transaction as any).mcc = 1234; // Invalid type

    const errors = await validate(transaction);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((err) => err.property === "mcc")).toBe(true);
    expect(errors.some((err) => err.constraints?.isString)).toBe(true);
  });

  it("should be invalid if accountId is not empty", async () => {
    const transaction = new Transaction();
    transaction.accountId = "non-empty"; // Should be empty
    transaction.amount = 100;
    transaction.totalAmount = 500;
    transaction.merchant = "";
    transaction.mcc = "1234";

    const errors = await validate(transaction);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((err) => err.property === "accountId")).toBe(true);
    expect(errors.some((err) => err.constraints?.isEmpty)).toBe(true);
  });

  it("should be invalid if merchant is not empty", async () => {
    const transaction = new Transaction();
    transaction.accountId = "";
    transaction.amount = 100;
    transaction.totalAmount = 500;
    transaction.merchant = "non-empty"; // Should be empty
    transaction.mcc = "1234";

    const errors = await validate(transaction);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((err) => err.property === "merchant")).toBe(true);
    expect(errors.some((err) => err.constraints?.isEmpty)).toBe(true);
  });
});
