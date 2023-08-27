import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Stop } from "../api";
import { useStopSearchByName } from "../hooks/useStopSearchByName";

export type StopSearchInputProps = {
  onSelectedStopChanged: (stop: Stop) => void;
  selectedStop: Stop | null;
  inputLabel: string;
  prefixDataTestId?: string;
};

export const StopSearchInput = (props: StopSearchInputProps): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const setSelectedStopAndCloseModal = (stop: Stop): void => {
    props.onSelectedStopChanged(stop);
    setModalOpen(false);
  };

  const closeModalWithoutSelection = (): void => {
    setModalOpen(false);
  };

  const [debouncedSearchInput] = useDebounce(searchInput, 500);
  const foundStops = useStopSearchByName(debouncedSearchInput);

  return (
    <>
      <IonInput
        onClick={(): void => setModalOpen(true)}
        readonly
        placeholder={props.inputLabel}
        data-testid={props.prefixDataTestId + "-clickable"}
        value={props.selectedStop?.name ?? ""}
        label={props.inputLabel}
        labelPlacement="floating"
      />

      <IonModal isOpen={modalOpen} onWillDismiss={closeModalWithoutSelection}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Search for {props.inputLabel}</IonTitle>
            <IonButtons slot="end">
              <IonButton
                color={"danger"}
                onClick={closeModalWithoutSelection}
              >
                Cancel
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonSearchbar
            value={searchInput}
            onInput={(e) => setSearchInput(e.currentTarget.value as string ?? "")}
            type="text"
            animated={true}
            placeholder={"Enter " + props.inputLabel}
            data-testid={"location-search-input"}
          />
        </IonHeader>
        <IonContent>
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
                      onClick={(): void => setSelectedStopAndCloseModal(stop)}
                    >
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
        </IonContent>
      </IonModal>
    </>
  );
};
