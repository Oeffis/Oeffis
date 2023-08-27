import { useEffect, useState } from "react";
import { StopFinderByNameResponseDto, StopFinderService } from "../api";

export type UseStopSearchByNameResult = UseStopSearchByNameSuccess | UseStopSearchByNameError | UseStopSearchByNamePending;
export type UseStopSearchByNameError = {
  type: "error";
  error: Error;
};

export type UseStopSearchByNameSuccess = {
  type: "success";
  searchResults: StopFinderByNameResponseDto;
};

export type UseStopSearchByNamePending = {
  type: "pending";
  searchResults: null;
};

export const useStopSearchByName = (searchInput: string): UseStopSearchByNameResult => {
  const [searchResultsOrError, setSearchResultsOrError] = useState<UseStopSearchByNameResult>(({ type: "pending", searchResults: null }));

  useEffect(
    () => {
      if (searchInput.length < 2) {
        setSearchResultsOrError({ type: "pending", searchResults: null });
        return;
      }

      const pendingRequest = StopFinderService.stopFinderControllerFindStopByName({ name: searchInput });
      pendingRequest
        .then((searchResults) => {
          setSearchResultsOrError({ type: "success", searchResults });
        })
        .catch((error) => {
          setSearchResultsOrError({ "type": "error", error });
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
