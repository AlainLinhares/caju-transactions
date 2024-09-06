import { Module } from "@nestjs/common";
import { TransactionController } from "./transaction.controller";
import { AuthorizerService } from "../../service/authorizer.service";
import { BalanceService } from "../../service/balance.service";
import { MerchantMapping } from "../../utils/merchant.mapping";

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [AuthorizerService, BalanceService, MerchantMapping],
})
export class TransactionModule {}
