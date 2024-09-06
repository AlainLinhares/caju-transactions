import { Test, TestingModule } from "@nestjs/testing";
import { TransactionController } from "../../src/modules/transaction/transaction.controller";
import { AuthorizerService } from "../../src/service/authorizer.service";
import { Transaction } from "../../src/model/transaction";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

describe("TransactionController", () => {
  let app: INestApplication;
  let authorizerService: AuthorizerService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: AuthorizerService,
          useValue: {
            sendTransaction: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    authorizerService = moduleFixture.get<AuthorizerService>(AuthorizerService);
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be return status 200 (OK)", async () => {
    const transaction: Transaction = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      accountId: "123",
      amount: 10,
      totalAmount: 100,
      merchant: "Test Merchant",
      mcc: "5812",
    };

    const mockResponse = { code: "00" };
    jest
      .spyOn(authorizerService, "sendTransaction")
      .mockReturnValue(mockResponse);

    await request(app.getHttpServer())
      .post("/transactions")
      .send(transaction)
      .expect(200)
      .expect(({ body }) => {
        expect(body.code).toBe("00");
      });
  });

  it("should be return status 200 (OK) with in Insufficient Funds", async () => {
    const transaction: Transaction = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      accountId: "123",
      amount: 10,
      totalAmount: 100,
      merchant: "Test Merchant",
      mcc: "5812",
    };

    const mockResponse = { code: "51" };
    jest
      .spyOn(authorizerService, "sendTransaction")
      .mockReturnValue(mockResponse);

    await request(app.getHttpServer())
      .post("/transactions")
      .send(transaction)
      .expect(200)
      .expect(({ body }) => {
        expect(body.code).toBe("51");
      });
  });
});
