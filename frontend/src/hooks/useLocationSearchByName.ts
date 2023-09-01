import { useEffect, useState } from "react";
import { Location } from "../api";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";

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
  const locationFinderApi = useLocationFinderApi();
  const [searchResultsOrError, setSearchResultsOrError] = useState<UseLocationSearchByNameResult>(({ type: "pending", searchResults: null }));

  useEffect(
    () => {
      if (searchInput.length < 2) {
        setSearchResultsOrError({ type: "pending", searchResults: null });
        return;
      }

      const abortController = new AbortController();
      const pendingRequest = locationFinderApi.locationFinderControllerFindLocationsByName({ name: searchInput }, { signal: abortController.signal });
      pendingRequest
        .then((searchResults) => {
          setSearchResultsOrError({ type: "success", searchResults });
        })
        .catch((error) => {
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
