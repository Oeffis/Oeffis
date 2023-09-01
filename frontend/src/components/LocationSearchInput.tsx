import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonProgressBar,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Location } from "../api";
import { useLocationSearchByName } from "../hooks/useLocationSearchByName";

export type LocationSearchInputProps = {
  onSelectedLocationChanged: (location: Location) => void;
  selectedLocation: Location | null;
  inputLabel: string;
  prefixDataTestId?: string;
};

export const LocationSearchInput = (props: LocationSearchInputProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const updateQuery = (query: string): void => {
    setSearchInput(query);
    setLoading(true);
  };

  const setSelectedLocationAndCloseModal = (location: Location): void => {
    props.onSelectedLocationChanged(location);
    setModalOpen(false);
  };

  const closeModalWithoutSelection = (): void => {
    setModalOpen(false);
  };

  const [debouncedSearchInput] = useDebounce(searchInput, 500);
  const foundLocations = useLocationSearchByName(debouncedSearchInput);

  useEffect(() => {
    if (foundLocations.type !== "pending") {
      setLoading(false);
    }
  }, [foundLocations]);

  return (
    <>
      <IonInput
        onClick={(): void => setModalOpen(true)}
        readonly
        placeholder={props.inputLabel}
        data-testid={props.prefixDataTestId + "-clickable"}
        value={props.selectedLocation?.name ?? ""}
        label={props.inputLabel}
        labelPlacement="floating"
      />

      <IonModal isOpen={modalOpen} onWillDismiss={closeModalWithoutSelection}>
        <IonHeader>
          <IonToolbar>
            <IonTitle> Search for {props.inputLabel}</IonTitle>
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
            onInput={(e) => updateQuery(e.currentTarget.value as string ?? "")}
            type="text"
            animated={true}
            placeholder={"Enter " + props.inputLabel}
            data-testid={"location-search-input"}
          />
          {loading && <IonProgressBar type="indeterminate" />}
        </IonHeader>
        <IonContent>
          <IonList>
            {
              <>
                {foundLocations.type === "error" && <div>Error: {foundLocations.error.message}</div>}
                {foundLocations.type === "success" &&
                  foundLocations.searchResults.map((location) => (
                    <IonItem
                      key={location.id}
                      button
                      onClick={(): void => setSelectedLocationAndCloseModal(location)}
                    >
                      <IonLabel
                        data-testid="locationName"
                      >
                        {location.name}
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
