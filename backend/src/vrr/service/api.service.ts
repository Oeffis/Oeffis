import { Injectable } from "@nestjs/common";
import { StopFinderClient, TripRequestClient, VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client/dist/";

@Injectable()
export class ApiService {
  private readonly baseUrl = process.env.VRR_API_BASE_URL ?? VRR_TEST_API_BASE_URL;
  private readonly _tripRequestClient: TripRequestClient = new TripRequestClient(this.baseUrl);
  private readonly _stoppFinderClient: StopFinderClient = new StopFinderClient(this.baseUrl);

  tripRequestClient(): TripRequestClient {
    return this._tripRequestClient;
  }

  stopFinderClient(): StopFinderClient {
    return this._stoppFinderClient;
  }
}
