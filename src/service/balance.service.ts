import { Injectable } from "@nestjs/common";
import { MerchantMapping } from "../utils/merchant.mapping";

@Injectable()
export class BalanceService {
  private balance: Map<string, number>;
  private readonly merchantMapping: MerchantMapping;

  constructor(merchantMapping: MerchantMapping) {
    this.balance = new Map<string, number>();
    this.merchantMapping = merchantMapping;
  }

  public debitTransaction(
    mcc: string,
    amount: number,
    totalAmount: number
  ): boolean {
    const category = this.merchantMapping.returnCategoryFromMCC(mcc);
    this.balance.set(category, amount);

    try {
      const balance = this.balance.get(category) || 0.0;
      if (balance >= amount && totalAmount >= amount) {
        this.balance.set(category, totalAmount - balance);
        return true;
      }
      return false;
    } finally {
    }
  }

  public getAvailableBalance(category: string): number {
    return this.balance.get(category) || 0.0;
  }
}
