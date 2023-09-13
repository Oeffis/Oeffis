import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonList,
  IonModal,
  IonProgressBar,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Location, LocationDetails } from "../../api";
import { useLocationSearchByName } from "../../hooks/useLocationSearchByName";
import { useFavoriteLocations } from "../../services/favorites/FavoritesContext";
import { LocationSearchList } from "./LocationSearchList";

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
  const { favoriteLocations } = useFavoriteLocations();

  const inputStillInDebounce = debouncedSearchInput !== searchInput;
  const showLoadingIndicator = searchInput !== "" && (foundLocations.type === "outdated" || inputStillInDebounce);
  const showResults = searchInput !== "" && (foundLocations.type === "success" || foundLocations.type === "outdated");

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
            onIonClear={() => setSearchInput("")}
          />
          {showLoadingIndicator && <IonProgressBar type="indeterminate" />}
        </IonHeader>
        <IonContent>
          <IonList>
            {searchInput === "" &&
              <LocationSearchList
                locations={
                  favoriteLocations
                    .map(({ locationId: id, name, type }) => ({ id, name, type, details: {} as unknown as LocationDetails }))
                }
                onItemClicked={setSelectedLocationAndCloseModal}
              />
            }
            {foundLocations.type === "error" && <div>Error: {foundLocations.error.message}</div>}
            {
              showResults &&
              <LocationSearchList
                locations={foundLocations.searchResults}
                onItemClicked={setSelectedLocationAndCloseModal}
              />
            }
          </IonList >
        </IonContent >
      </IonModal >
    </>
  );
};
