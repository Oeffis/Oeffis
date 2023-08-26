import { useEffect, useState } from "react";
import { CancelablePromise, StopFinderByNameResponseDto, StopFinderService } from "../api";

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

export const useStopSearchbyName = (searchInput: string): UseStopSearchByNameResult => {
  const [searchResultsOrError, setSearchResultsOrError] = useState<UseStopSearchByNameResult>(({ type: "pending", searchResults: null }));
  let pendingRequest: CancelablePromise<StopFinderByNameResponseDto> | null = null;

  useEffect(
    () => {
      if (pendingRequest) {
        pendingRequest.cancel();
        pendingRequest = null;
      }

      if (searchInput.length < 2) {
        setSearchResultsOrError({ type: "pending", searchResults: null });
        return;
      }

      pendingRequest = StopFinderService.stopFinderControllerFindStopByName({ name: searchInput });
      pendingRequest
        .then((searchResults) => {
          setSearchResultsOrError({ type: "success", searchResults });
        })
        .catch((error) => {
          setSearchResultsOrError({ "type": "error", error });
        });
    },
    [
      searchInput,
      setSearchResultsOrError
    ]
  );

  return searchResultsOrError;
};
