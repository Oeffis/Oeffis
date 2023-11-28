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
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Location } from "../../api";
import { useLocationIdSearchByName } from "../../hooks/useLocationIdSearchByName";
import { useFavoriteLocations } from "../../services/favorites/FavoritesContext";
import LeafletMapContainer from "../map/LeafletMapContainer";
import { CurrentLocationButton } from "./CurrentLocationButton";
import { LocationSearchList } from "./LocationSearchList";

export interface LocationSearchInputProps {
  onSelectedLocationChanged: (location: Location) => void;
  selectedLocation: Location | null;
  inputLabel: string;
  prefixDataTestId?: string;
  locationName?: string;
}

export const LocationSearchInput = (props: LocationSearchInputProps): JSX.Element => {
  const LOCATIONS_LIMIT = 20;
  const [searchInput, setSearchInput] = useState<string>("");

  useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [showMap, setShowMap] = useState<boolean>(false);
  const [isMapBtnDisabled, setIsMapBtnDisabled] = useState<boolean>(true);

  const setSelectedLocationAndCloseModal = (location: Location): void => {
    props.onSelectedLocationChanged(location);
    setModalOpen(false);
    setShowMap(false);
  };

  const closeModalWithoutSelection = (): void => {
    setModalOpen(false);
    setShowMap(false);
  };

  const [debouncedSearchInput] = useDebounce(searchInput, 500);
  const foundLocations = useLocationIdSearchByName(debouncedSearchInput, LOCATIONS_LIMIT);
  const { favoriteLocations } = useFavoriteLocations();

  const inputStillInDebounce = debouncedSearchInput !== searchInput;
  const showLoadingIndicator = searchInput !== "" && (foundLocations.type === "outdated" || inputStillInDebounce);
  const showResults = searchInput !== "" && (foundLocations.type === "success" || foundLocations.type === "outdated");

  const applyLocationName = (): void => {
    setSearchInput(props.locationName ?? "");
    setModalOpen(true);
  };

  useEffect(() => {
    if (searchInput === "") {
      setIsMapBtnDisabled(true);
      setShowMap(false);
    } else {
      setIsMapBtnDisabled(false);
    }
  }, [searchInput]);

  return (
    <>
      <IonInput
        onClick={applyLocationName}
        readonly
        placeholder={props.inputLabel}
        data-testid={props.prefixDataTestId + "-clickable"}
        value={props.selectedLocation?.name}
        label={props.inputLabel}
        labelPlacement="floating"
        clearInput={true}
      />
      <CurrentLocationButton onButtonClicked={props.onSelectedLocationChanged} />

      <IonModal isOpen={modalOpen} onWillDismiss={closeModalWithoutSelection}>
        <IonHeader>
          <IonToolbar>
            <IonTitle> Search for {props.inputLabel}</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => showMap ? setShowMap(false) : setShowMap(true)}
                disabled={isMapBtnDisabled}
              >
                Map
              </IonButton>
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
            onInput={(e) => setSearchInput(e.currentTarget.value ?? "")}
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
          {showResults
            && showMap
            ? <LeafletMapContainer
              locationIds={[...foundLocations.searchResults]}
              showLines={false}
              onItemClicked={setSelectedLocationAndCloseModal}
            />
            : <IonList>
              {searchInput === "" &&
                <LocationSearchList
                  locations={favoriteLocations.map((favoriteLocation) => favoriteLocation.locationId)}
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
            </IonList >}
        </IonContent >
      </IonModal >
    </>
  );
};
