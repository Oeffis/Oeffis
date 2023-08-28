import { useEffect, useState } from "react";
import { Location, LocationFinderService } from "../api";

export type UseLocationSearchByNameResult = UseLocationSearchByNameSuccess | UseLocationSearchByNameError | UseLocationSearchByNamePending;
export type UseLocationSearchByNameError = {
  type: "error";
  error: Error;
};

export type UseLocationSearchByNameSuccess = {
  type: "success";
  searchResults: Location[];
};

export type UseLocationSearchByNamePending = {
  type: "pending";
  searchResults: null;
};

export const useLocationSearchByName = (searchInput: string): UseLocationSearchByNameResult => {
  const [searchResultsOrError, setSearchResultsOrError] = useState<UseLocationSearchByNameResult>(({ type: "pending", searchResults: null }));

  useEffect(
    () => {
      if (searchInput.length < 2) {
        setSearchResultsOrError({ type: "pending", searchResults: null });
        return;
      }

      const pendingRequest = LocationFinderService.locationFinderControllerFindStopByName({ name: searchInput });
      pendingRequest
        .then((searchResults) => {
          setSearchResultsOrError({ type: "success", searchResults });
        })
        .catch((error) => {
          setSearchResultsOrError({ type: "error", error });
        });

      return () => {
        if (pendingRequest) {
          pendingRequest.cancel();
        }
      };
    },
    [
      searchInput,
      setSearchResultsOrError
    ]
  );

  return searchResultsOrError;
};
