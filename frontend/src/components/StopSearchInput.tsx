import { IonInput, IonItem, IonLabel, IonList, IonModal } from "@ionic/react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Stop } from "../api";
import { useStopSearchByName } from "../hooks/useStopSearchbyName";

export type StopSearchInputProps = {
  onSelectedStopChanged: (stop: Stop) => void;
  selectedStop: Stop | null;
  inputLabel: string;
  prefixDataTestId?: string;
};

export const StopSearchInput = (props: StopSearchInputProps): JSX.Element => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const setSelectedStopAndCloseModal = (stop: Stop): void => {
    props.onSelectedStopChanged(stop);
    setModalOpen(false);
  };

  const openModal = (): void => {
    setModalOpen(true);
  };

  const [debouncedSearchInput] = useDebounce(searchInput, 500);
  const foundStops = useStopSearchByName(debouncedSearchInput);

  return (
    <>
      <IonItem
        button
        onClick={(): void => openModal()}
        data-testid={props.prefixDataTestId + "-clickable"}
      >
        <IonLabel>{props.inputLabel}: {props.selectedStop?.name}</IonLabel>
      </IonItem>

      <IonModal isOpen={modalOpen} onWillDismiss={(): void => setModalOpen(false)}>
        <IonInput
          value={searchInput}
          onInput={(e): void => setSearchInput(e.currentTarget.value as string ?? "")}
          type="text"
          name="start"
          label={props.inputLabel}
          labelPlacement="floating"
          placeholder={"Enter " + props.inputLabel}
          data-testid={props.prefixDataTestId + "-search-input"}
        />
        <IonList>
          {
            <>
              {foundStops.type === "error" && <div>Error: {foundStops.error.message}</div>}
              {foundStops.type === "pending" && searchInput !== "" && <div>Searching...</div>}
              {foundStops.type === "success" &&
                foundStops.searchResults.stops.map((stop) => (
                  <IonItem
                    key={stop.id}
                    button
                    onClick={(): void => setSelectedStopAndCloseModal(stop)}>
                    <IonLabel
                      data-testid="locationName"
                    >
                      {stop.name}
                    </IonLabel>
                  </IonItem>
                ))
              }
            </>
          }
        </IonList>

      </IonModal>
    </>
  );
};
