import { Test, TestingModule } from "@nestjs/testing";
import { AuthorizerService } from "../../src/service/authorizer.service";
import { BalanceService } from "../../src/service/balance.service";
import {
  MerchantMapping,
  TransactionCategory,
} from "../../src/utils/merchant.mapping";
import { Transaction } from "../../src/model/transaction";

describe("AuthorizerService", () => {
  let authorizerService: AuthorizerService;
  let balanceService: BalanceService;
  let merchantMCCMapping: MerchantMapping;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorizerService,
        {
          provide: BalanceService,
          useValue: {
            debit: jest.fn(),
          },
        },
        {
          provide: MerchantMapping,
          useValue: {
            getMCC: jest.fn(),
            mapMCCToCategory: jest.fn(),
            isCashCategory: jest.fn(),
          },
        },
      ],
    }).compile();

    authorizerService = module.get<AuthorizerService>(AuthorizerService);
    balanceService = module.get<BalanceService>(BalanceService);
    merchantMCCMapping = module.get<MerchantMapping>(MerchantMapping);
  });

  it("should authorize transaction with valid MCC and sufficient funds", () => {
    const transaction: Transaction = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      accountId: "123",
      amount: 10,
      totalAmount: 100,
      merchant: "Test Merchant",
      mcc: "5812",
    };

    merchantMCCMapping.getMCC = jest.fn().mockReturnValue("1234");
    merchantMCCMapping.returnCategoryFromMCC = jest.fn().mockReturnValue("CATEGORY");
    balanceService.debitTransaction = jest.fn().mockReturnValue(true);

    const result = authorizerService.sendTransaction(transaction);

    expect(result).toEqual({ code: "00" });
    expect(balanceService.debitTransaction).toHaveBeenCalledWith(
      "1234",
      transaction.amount,
      transaction.totalAmount
    );
  });

  it("should authorize transaction with cash category and sufficient funds", () => {
    const transaction: Transaction = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      accountId: "123",
      amount: 10,
      totalAmount: 100,
      merchant: "Test Merchant",
      mcc: "5812",
    };

    merchantMCCMapping.getMCC = jest.fn().mockReturnValue("5678");
    merchantMCCMapping.returnCategoryFromMCC = jest
      .fn()
      .mockReturnValue(TransactionCategory.CASH);
    merchantMCCMapping.validateIfCategoryIsCach = jest.fn().mockReturnValue(true);
    balanceService.debitTransaction = jest.fn().mockReturnValue(true);

    const result = authorizerService.sendTransaction(transaction);

    expect(result).toEqual({ code: "00" });
    expect(balanceService.debitTransaction).toHaveBeenCalledWith(
      "5678",
      transaction.amount,
      transaction.totalAmount
    );
  });

  it("should decline transaction due to insufficient funds", () => {
    const transaction: Transaction = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      accountId: "123",
      amount: 10,
      totalAmount: 100,
      merchant: "Test Merchant",
      mcc: "5812",
    };

    merchantMCCMapping.getMCC = jest.fn().mockReturnValue("9101");
    merchantMCCMapping.returnCategoryFromMCC = jest.fn().mockReturnValue("CATEGORY");
    balanceService.debitTransaction = jest.fn().mockReturnValue(false);
    merchantMCCMapping.validateIfCategoryIsCach = jest.fn().mockReturnValue(false);

    const result = authorizerService.sendTransaction(transaction);

    expect(result).toEqual({ code: "51" });
    expect(balanceService.debitTransaction).toHaveBeenCalledWith(
      "9101",
      transaction.amount,
      transaction.totalAmount
    );
    expect(balanceService.debitTransaction).toHaveBeenCalledWith(
      TransactionCategory.CASH,
      transaction.amount,
      transaction.totalAmount
    );
  });
});
