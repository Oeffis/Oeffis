import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonItem,
  IonLabel,
  IonList,
  IonModal
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Location, LocationFinderService } from "../api";
import { useStateParams } from "../hooks/useStateParams";
import { LocationSearchInput } from "./LocationSearchInput";

const RoutePlanner: React.FC = () => {
  const [originLocationId, setOriginLocationId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationLocationId, setDestinationLocationId] = useStateParams<string | null>(null, "destination", String, String);

  const [originLocation, setOriginLocation] = useInitialLocationFromLocationIdAndThenAsState(originLocationId);
  const [destinationLocation, setDestinationLocation] = useInitialLocationFromLocationIdAndThenAsState(destinationLocationId);

  const setOrigin = (location: Location | null): void => {
    setOriginLocation(location);
    setOriginLocationId(location?.id ?? null);
  };

  const setDestination = (location: Location | null): void => {
    setDestinationLocation(location);
    setDestinationLocationId(location?.id ?? null);
  };

  return (
    <IonList inset={true}>
      <IonItem lines="inset">
        {/* Date-Time-Picker, allowing the user to select dates in the present aswell as the future */}
        <IonLabel>Date and Time</IonLabel>
        <IonDatetimeButton aria-label="Date and Time" datetime="datetime" />
        <IonModal keepContentsMounted={true}>
          <IonDatetime name="date_time" id="datetime" min={new Date().toISOString()} />
        </IonModal>
      </IonItem>
      <IonItem>
        <LocationSearchInput
          inputLabel="Origin"
          selectedLocation={originLocation}
          onSelectedLocationChanged={(location): void => setOrigin(location)}
          prefixDataTestId="origin-input"
        />
      </IonItem>
      <IonItem>
        <LocationSearchInput
          inputLabel="Destination"
          selectedLocation={destinationLocation}
          onSelectedLocationChanged={(location): void => setDestination(location)}
          prefixDataTestId="destination-input"
        />
      </IonItem>
      <IonButton type="submit" size="default" expand="block" onClick={submitInput}>Search routes</IonButton>
    </IonList>
  );

};

{/* TODO later: As discussed in the design structure meeting, an input field is needed, which opens up a modal on focus, where the user can
                input the text. There should then a list be shown (viable stations to the input text). Upon selecting a station from the list and confirming
                the modal, the modal should close and transfer the chosen station to the original input field. */}

function submitInput(): void {
  {/* Empty dummy function to do something after submitting all inputs. */ }
}

export default RoutePlanner;


export function useInitialLocationFromLocationIdAndThenAsState(locationId: string | null): [Location | null, (location: Location | null) => void] {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (locationId !== null && location === null && locationId !== "") {
      LocationFinderService.locationFinderControllerFindStopByName({ name: locationId })
        .then((locations) => {
          if (locations.length > 0 && !cancelled) {
            setLocation(locations[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (): void => {
      cancelled = true;
    };
  }, [locationId]);

  return [location, setLocation];
}
