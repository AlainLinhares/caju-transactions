import { Test, TestingModule } from "@nestjs/testing";
import {
  MerchantMapping,
  TransactionCategory,
} from "../../src/utils/merchant.mapping";

describe("MerchantMapping", () => {
  let merchantMapping: MerchantMapping;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerchantMapping],
    }).compile();

    merchantMapping = module.get<MerchantMapping>(MerchantMapping);
  });

  it("should return the correct MCC for a known merchant", () => {
    const merchant = "UBER TRIP SAO PAULO BR";
    const defaultMCC = "0000";

    const result = merchantMapping.getMCC(merchant, defaultMCC);

    expect(result).toBe("5811");
  });

  it("should return the default MCC for an unknown merchant", () => {
    const merchant = "UNKNOWN MERCHANT";
    const defaultMCC = "0000";

    const result = merchantMapping.getMCC(merchant, defaultMCC);

    expect(result).toBe(defaultMCC);
  });

  it("should map MCC to the correct category", () => {
    expect(merchantMapping.returnCategoryFromMCC("5411")).toBe(
      TransactionCategory.FOOD
    );
    expect(merchantMapping.returnCategoryFromMCC("5412")).toBe(
      TransactionCategory.FOOD
    );
    expect(merchantMapping.returnCategoryFromMCC("5811")).toBe(
      TransactionCategory.MEAL
    );
    expect(merchantMapping.returnCategoryFromMCC("5812")).toBe(
      TransactionCategory.MEAL
    );
    expect(merchantMapping.returnCategoryFromMCC("1234")).toBe(
      TransactionCategory.CASH
    );
  });

  it("should identify cash category correctly", () => {
    expect(merchantMapping.validateIfCategoryIsCach(TransactionCategory.CASH)).toBe(true);
    expect(merchantMapping.validateIfCategoryIsCach(TransactionCategory.FOOD)).toBe(
      false
    );
    expect(merchantMapping.validateIfCategoryIsCach(TransactionCategory.MEAL)).toBe(
      false
    );
  });
});
