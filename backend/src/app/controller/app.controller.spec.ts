import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, expect, it, test } from "vitest";
import { AppService } from "../service/app.service";
import { AppController } from "./app.controller";

test("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  test("root", () => {
    it("should return \"Hello World!\"", () => {
      expect(appController.getHello()).toBe("Hello World!");
    });
  });
});
