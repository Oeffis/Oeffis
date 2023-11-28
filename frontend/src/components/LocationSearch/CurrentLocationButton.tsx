import { IonButton } from "@ionic/react";
import "leaflet/dist/leaflet.css";
import { Location, LocationWithAssignedStops } from "../../api";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useLocationFinderApi } from "../../services/apiClients/ApiClientsContext";

export interface CurrentLocationButtonProps {
  onButtonClicked: (location: Location) => void;
}

export function CurrentLocationButton(props: CurrentLocationButtonProps): JSX.Element {

  const currentLocation = useCurrentLocation();
  const api = useLocationFinderApi();

  const setCurrentLocationAsInputValue = async (): Promise<void> => {

    if (currentLocation.state !== "located") {
      alert("No current location detected!");
      return;
    }

    try {
      const locationWithAssinedStops: LocationWithAssignedStops = await api.locationFinderControllerFindLocationsAtCoordinates({
        latitude: currentLocation.location.coords.latitude,
        longitude: currentLocation.location.coords.longitude
      });

      props.onButtonClicked({
        id: locationWithAssinedStops.id,
        name: locationWithAssinedStops.name,
        details: locationWithAssinedStops.details,
        type: locationWithAssinedStops.type
      });
    } catch (error) {
      alert("Location for current position could not be found.");
    }
  };

  return <IonButton onClick={setCurrentLocationAsInputValue} />;

}
