import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Utils } from "../utils/utils";

export class Transaction {
  @IsString()
  id: string = Utils.generateUUID();

  @IsEmpty()
  accountId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsEmpty()
  merchant: string;

  @IsString()
  @IsNotEmpty()
  mcc: string;
}
