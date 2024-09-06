import { Test, TestingModule } from "@nestjs/testing";
import { BalanceService } from "../../src/service/balance.service";
import { MerchantMapping } from "../../src/utils/merchant.mapping";

describe("BalanceService", () => {
  let balanceService: BalanceService;
  let merchantMCCMapping: MerchantMapping;

  beforeEach(async () => {
    merchantMCCMapping = {
      mapMCCToCategory: jest.fn(),
    } as any; // Mocking MerchantMapping

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceService,
        {
          provide: MerchantMapping,
          useValue: merchantMCCMapping,
        },
      ],
    }).compile();

    balanceService = module.get<BalanceService>(BalanceService);
  });

  it("should debit successfully when balance and totalAmount are sufficient", () => {
    const category = "CategoryA";
    const amount = 100;
    const totalAmount = 200;

    merchantMCCMapping.returnCategoryFromMCC = jest.fn().mockReturnValue(category);

    balanceService.getAvailableBalance = jest.fn().mockReturnValue(totalAmount);

    const result = balanceService.debitTransaction(
      category,
      amount,
      totalAmount
    );

    expect(result).toBe(true);
    expect(balanceService.getAvailableBalance(category)).toBe(totalAmount);
  });

  it("should fail to debit when balance is insufficient", () => {
    const category = "CategoryB";
    const amount = 50;
    const totalAmount = 100;

    merchantMCCMapping.returnCategoryFromMCC = jest.fn().mockReturnValue(category);

    balanceService.getAvailableBalance = jest.fn().mockReturnValue(50);

    const result = balanceService.debitTransaction(
      category,
      amount,
      totalAmount
    );

    expect(result).toBe(true);
    expect(balanceService.getAvailableBalance(category)).toBe(50);
  });

  it("should fail to debit when totalAmount is insufficient", () => {
    const category = "CategoryC";
    const amount = 100;
    const totalAmount = 50;

    merchantMCCMapping.returnCategoryFromMCC = jest.fn().mockReturnValue(category);

    balanceService.getAvailableBalance = jest.fn().mockReturnValue(150);

    const result = balanceService.debitTransaction(
      category,
      amount,
      totalAmount
    );

    expect(result).toBe(false);
    expect(balanceService.getAvailableBalance(category)).toBe(150);
  });

  it("should return balance for existing category", () => {
    const category = "CategoryD";
    const balance = 300;

    balanceService["balance"].set(category, balance);

    const result = balanceService.getAvailableBalance(category);

    expect(result).toBe(balance);
  });

  it("should return 0 balance for non-existing category", () => {
    const category = "NonExistingCategory";

    const result = balanceService.getAvailableBalance(category);

    expect(result).toBe(0);
  });
});
