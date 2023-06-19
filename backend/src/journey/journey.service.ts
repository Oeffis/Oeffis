import {Injectable} from "@nestjs/common";
import {HafasClient, Journeys, Location, Station, Stop} from "hafas-client";
import {JourneyRequest} from "./entities/journey.request.entity";

const userAgent = "oeffis"; // TODO What string to use?

/**
 * Import of hafas-client (workaround to use ESM inside CommonJS project).
 */
const hafasClientImport: Promise<HafasClient> =
  (async (): Promise<HafasClient> => {
    const {createClient} = await (
      eval("import(\"hafas-client\")") as Promise<typeof import("hafas-client")>);
    const {profile} = await (
      eval("import(\"hafas-client/p/db/index.js\")") as Promise<typeof import("hafas-client/p/db/index.js")>);

    return createClient(profile, userAgent);
  })();

/**
 * Service that uses HAFAS to plan a journey.
 */
@Injectable()
export class JourneyService {

  private hafas: HafasClient;

  constructor() {
    // TODO überall den then-Kontext verwenden oder kann man das hier vernünftig vorher machen?
    hafasClientImport
      .then(value => this.hafas = value)
      .catch(reason => console.log(reason));  // TODO How to handle error?
  }

  searchLocations(locationQuery: string): Promise<ReadonlyArray<Station | Stop | Location>> {
    return hafasClientImport
      .then(hafasClient => hafasClient.locations(
        locationQuery,
        {
          results: null, // Get everything returned by HAFAS.
          language: "de", // TODO using DE testwise.
        }
      ));

    // return this.hafas.locations(
    //   locationRequest.locationQuery,
    //   {
    //     results: null, // Get everything returned by HAFAS.
    //     language: "de", // TODO using DE testwise.
    //   }
    // );
  }

  /**
   * Plans and returns a journey based on the given journey request.
   *
   * @param journeyRequest request for a journey
   * @return all possible plans for the journey
   */
  planJourney(journeyRequest: JourneyRequest): Promise<Journeys> {
    return hafasClientImport
      .then(hafasClient => hafasClient.journeys(
        journeyRequest.from, journeyRequest.to,
        {
          results: 3, // Get everything returned by HAFAS.
          language: "de", // TODO using DE testwise.
        }
      ));

    // return this.hafas.journeys(
    //   journeyRequest.from, journeyRequest.to,
    //   {
    //     results: null, // Get everything returned by HAFAS.
    //     language: "de", // TODO using DE testwise.
    //   });
  }

}
