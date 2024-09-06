import { Injectable } from "@nestjs/common";

@Injectable()
export class MerchantMapping {
  private readonly merchantMap: Map<string, string>;

  constructor() {
    this.merchantMap = new Map<string, string>([
      ["UBER TRIP SAO PAULO BR", "5811"],
      ["UBER EATS SAO PAULO BR", "5812"],
      ["PAG*JoseDaSilva RIO DE JANEI BR", "5411"],
      ["PICPAY*BILHETEUNICO GOIANIA BR", "5412"],
    ]);
  }

  public getMCC(merchant: string, defaultMCC: string): string {
    return this.merchantMap.get(merchant) || defaultMCC;
  }

  public returnCategoryFromMCC(mcc: string): string {
    switch (mcc) {
      case "5411":
      case "5412":
        return TransactionCategory.FOOD;
      case "5811":
      case "5812":
        return TransactionCategory.MEAL;
      default:
        return TransactionCategory.CASH;
    }
  }

  public validateIfCategoryIsCach(category: string): boolean {
    return TransactionCategory.CASH === category;
  }
}

export enum TransactionCategory {
  FOOD = "FOOD",
  MEAL = "MEAL",
  CASH = "CASH",
}
