import { useEffect, useState } from "react";
import { Journey, JourneyService, Location } from "../api";

export type UseJourneyQueryResult = UseJourneyQuerySuccess | UseJourneyQueryError | UseJourneyQueryPending;
export type UseJourneyQueryError = {
  type: "error";
  error: Error;
};

export type UseJourneyQuerySuccess = {
  type: "success";
  journeyResults: Journey[];
};

export type UseJourneyQueryPending = {
  type: "pending";
  journeyResults: null;
};

export const useJourneyQuery = (origin: Location, destination: Location): UseJourneyQueryResult => {
  const [journeyResultsOrError, setJourneyResultsOrError] = useState<UseJourneyQueryResult>(({ type: "pending", journeyResults: null }));

  useEffect(
    () => {
      const pendingRequest = JourneyService.journeyControllerQueryJourney({
        originId: origin.id,
        destinationId: destination.id,
        departure: new Date().toISOString(),
        asArrival: false
      });
      pendingRequest
        .then((journeyResults) => {
          setJourneyResultsOrError({ type: "success", journeyResults });
        })
        .catch((error) => {
          setJourneyResultsOrError({ type: "error", error });
        });

      return () => {
        if (pendingRequest) {
          pendingRequest.cancel();
        }
      };
    },
    [
      origin.id,
      destination.id,
      setJourneyResultsOrError
    ]
  );

  return journeyResultsOrError;
};
