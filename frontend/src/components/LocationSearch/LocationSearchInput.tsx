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
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Location } from "../../api";
import { useLocationSearchByName } from "../../hooks/useLocationSearchByName";
import { LocationIcon } from "./LocationIcon";

export type LocationSearchInputProps = {
  onSelectedLocationChanged: (location: Location) => void;
  selectedLocation: Location | null;
  inputLabel: string;
  prefixDataTestId?: string;
};

export const LocationSearchInput = (props: LocationSearchInputProps): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const setSelectedLocationAndCloseModal = (location: Location): void => {
    props.onSelectedLocationChanged(location);
    setModalOpen(false);
  };

  const closeModalWithoutSelection = (): void => {
    setModalOpen(false);
  };

  const [debouncedSearchInput] = useDebounce(searchInput, 500);
  const foundLocations = useLocationSearchByName(debouncedSearchInput);

  const inputStillInDebounce = debouncedSearchInput !== searchInput;
  const showLoadingIndicator = foundLocations.type === "outdated" || inputStillInDebounce;
  const showResults = foundLocations.type === "success" || foundLocations.type === "outdated";

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
            onInput={(e) => setSearchInput(e.currentTarget.value as string ?? "")}
            type="text"
            animated={true}
            placeholder={"Enter " + props.inputLabel}
            data-testid={"location-search-input"}
            autocomplete="street-address"
          />
          {showLoadingIndicator && <IonProgressBar type="indeterminate" />}
        </IonHeader>
        <IonContent>
          <IonList>
            {
              <>
                {foundLocations.type === "error" && <div>Error: {foundLocations.error.message}</div>}
                {showResults &&
                  foundLocations.searchResults.map((location) => (
                    <IonItem
                      key={location.id}
                      button
                      onClick={(): void => setSelectedLocationAndCloseModal(location)}
                    >
                      <LocationIcon type={location.type} />
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
