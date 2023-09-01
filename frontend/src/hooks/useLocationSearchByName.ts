import { useEffect, useState } from "react";
import { Location } from "../api";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";

export type UseLocationSearchByNameResult = UseLocationSearchByNameSuccess
  | UseLocationSearchByNameError
  | UseLocationSearchByNameEmpty
  | UseLocationSearchByNameOutdated;

export type UseLocationSearchByNameError = {
  type: "error";
  error: Error;
};

export type UseLocationSearchByNameSuccess = {
  type: "success";
  searchResults: Location[];
};

export type UseLocationSearchByNameEmpty = {
  type: "empty";
  searchResults: null;
};

export type UseLocationSearchByNameOutdated = {
  type: "outdated";
  searchResults: Location[];
};

export const useLocationSearchByName = (searchInput: string): UseLocationSearchByNameResult => {
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
      const pendingRequest = locationFinderApi.locationFinderControllerFindLocationsByName({ name: searchInput }, { signal: abortController.signal });
      pendingRequest
        .then((searchResults) => {
          if (abortController.signal.aborted) {
            return;
          }
          setSearchResultsOrError({ type: "success", searchResults });
        })
        .catch((error) => {
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
