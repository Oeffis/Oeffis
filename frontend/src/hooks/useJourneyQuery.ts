import { useEffect, useState } from "react";
import { Journey, Location } from "../api";
import { useJourneyApi } from "../services/apiClients/ApiClientsContext";

export type UseJourneyQueryResult = UseJourneyQuerySuccess | UseJourneyQueryError | UseJourneyQueryPending;
export interface UseJourneyQueryError {
  type: "error";
  error: Error;
}

export interface UseJourneyQuerySuccess {
  type: "success";
  journeyResults: Journey[];
}

export interface UseJourneyQueryPending {
  type: "pending";
  journeyResults: null;
}

export const useJourneyQuery = (
  origin: Location,
  destination: Location,
  departure: Date,
  asArrival: boolean
): UseJourneyQueryResult => {

  const journeyApi = useJourneyApi();

  const [journeyResultsOrError, setJourneyResultsOrError] = useState<UseJourneyQueryResult>(({ type: "pending", journeyResults: null }));

  useEffect(
    () => {
      const abortController = new AbortController();

      if (!origin.id || !destination.id) {
        const error: Error = {
          name: "OriginId and/or destinationId missing.",
          message: "At least one of originId or destinationId is missing. Booth are required to query a journey."
        };
        setJourneyResultsOrError({ type: "error", error });

      } else {
        journeyApi.journeyControllerQueryJourney({
          originId: origin.id,
          destinationId: destination.id,
          departure: departure,
          asArrival: asArrival
        }, { signal: abortController.signal })

          .then((journeyResults) => {
            setJourneyResultsOrError({ type: "success", journeyResults });
          })
          .catch((error: Error) => {
            setJourneyResultsOrError({ type: "error", error });
          });

      }

      return () => {
        abortController.abort();
      };
    },
    [
      origin.id,
      destination.id,
      departure.valueOf(),
      setJourneyResultsOrError
    ]
  );

  return journeyResultsOrError;
};
