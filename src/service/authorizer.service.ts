import { Injectable } from "@nestjs/common";
import { Transaction } from "../model/transaction";
import {
  MerchantMapping,
  TransactionCategory,
} from "../utils/merchant.mapping";
import { BalanceService } from "../service/balance.service";

@Injectable()
export class AuthorizerService {
  private readonly balanceService: BalanceService;
  private readonly merchantMapping: MerchantMapping;

  constructor(
    balanceService: BalanceService,
    merchantMapping: MerchantMapping
  ) {
    this.balanceService = balanceService;
    this.merchantMapping = merchantMapping;
  }

  public sendTransaction(transaction: Transaction): Record<string, string> {
    const response: Record<string, string> = {};

    const mcc = this.merchantMapping.getMCC(
      transaction.merchant,
      transaction.mcc
    );
    const category = this.merchantMapping.returnCategoryFromMCC(mcc);

    if (
      this.balanceService.debitTransaction(
        mcc,
        transaction.amount,
        transaction.totalAmount
      )
    ) {
      response["code"] = AuthorizationCode.APPROVED;
    } else if (
      this.merchantMapping.validateIfCategoryIsCach(category) ||
      this.balanceService.debitTransaction(
        TransactionCategory.CASH,
        transaction.amount,
        transaction.totalAmount
      )
    ) {
      response["code"] = AuthorizationCode.APPROVED;
    } else {
      response["code"] = AuthorizationCode.INSUFFICIENT_FUNDS;
    }

    return response;
  }
}

enum AuthorizationCode {
  APPROVED = "00",
  INSUFFICIENT_FUNDS = "51",
}
