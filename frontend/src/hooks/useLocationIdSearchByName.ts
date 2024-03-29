import { useEffect, useState } from "react";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";

export type UseLocationSearchByNameResult = UseLocationSearchByNameSuccess
  | UseLocationSearchByNameError
  | UseLocationSearchByNameEmpty
  | UseLocationSearchByNameOutdated;

export interface UseLocationSearchByNameError {
  type: "error";
  error: Error;
}

export interface UseLocationSearchByNameSuccess {
  type: "success";
  searchResults: string[];
}

export interface UseLocationSearchByNameEmpty {
  type: "empty";
  searchResults: null;
}

export interface UseLocationSearchByNameOutdated {
  type: "outdated";
  searchResults: string[];
}

export const useLocationIdSearchByName = (searchInput: string, limit?: number): UseLocationSearchByNameResult => {
  const locationFinderApi = useLocationFinderApi();
  const [searchResultsOrError, setSearchResultsOrError] = useState<UseLocationSearchByNameResult>(({ type: "empty", searchResults: null }));

  useEffect(
    () => {
      if (searchInput === "") {
        setSearchResultsOrError({ type: "empty", searchResults: null });
        return;
      }

      const previousSearchResultLocations = searchResultsOrError.type === "success" ? searchResultsOrError.searchResults : [];
      setSearchResultsOrError({ type: "outdated", searchResults: previousSearchResultLocations });

      const abortController = new AbortController();
      const pendingRequest = locationFinderApi.locationFinderControllerFindLocationIdsByName({ name: searchInput, limit }, { signal: abortController.signal });
      pendingRequest
        .then((searchResults) => {
          if (abortController.signal.aborted) {
            return;
          }
          setSearchResultsOrError({ type: "success", searchResults });
        })
        .catch((error: Error) => {
          if (abortController.signal.aborted) {
            return;
          }
          setSearchResultsOrError({ type: "error", error });
        });

      return () => {
        abortController.abort();
      };
    },
    [
      searchInput,
      setSearchResultsOrError
    ]
  );

  return searchResultsOrError;
};
