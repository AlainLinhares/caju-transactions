import { Controller, Post, Body, Res } from "@nestjs/common";
import { Response } from "express";
import { Transaction } from "../../model/transaction";
import { AuthorizerService } from "../../service/authorizer.service";

@Controller("transactions")
export class TransactionController {
  constructor(private readonly authorizerService: AuthorizerService) {}

  @Post()
  async authorizeTransaction(
    @Body() transaction: Transaction,
    @Res() response: Response
  ): Promise<Response> {
    const authorizationResult =
      this.authorizerService.sendTransaction(transaction);
    return response.status(200).json(authorizationResult);
  }
}
