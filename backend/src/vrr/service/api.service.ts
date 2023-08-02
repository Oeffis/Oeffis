import { Injectable } from "@nestjs/common";
import { VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client";
import { VrrClientBase } from "@oeffis/vrr_client/dist/VrrClientBase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UrlConstructorType<T extends VrrClientBase> = new (baseUrl: string, ...args: unknown[]) => T;

@Injectable()
export class ApiService {
  private baseUrl = process.env.VRR_BASE_URL || VRR_TEST_API_BASE_URL;

  getInstanceOf<T extends VrrClientBase>(clientClass: UrlConstructorType<T>, ...args: unknown[]): T {
    return new clientClass(this.baseUrl, ...args);
  }
}
