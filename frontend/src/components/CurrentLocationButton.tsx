import { IonButton } from "@ionic/react";
import "leaflet/dist/leaflet.css";
import { Location } from "../api";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";

export interface CurrentLocationButtonProps {
  onButtonClicked: (location: Location) => void;
}

export function CurrnetLocationButton(props: CurrentLocationButtonProps): JSX.Element {

  const currentLocation = useCurrentLocation();
  const api = useLocationFinderApi();

  const setCurrentLocationAsInputValue = async (): Promise<void> => {
    if (currentLocation.state !== "located") {
      alert("No current location detected!");
      return;
    }

    const locationWithAssinedStops = await api.locationFinderControllerFindLocationsAtCoordinates({ latitude: currentLocation.location.coords.latitude, longitude: currentLocation.location.coords.longitude });

    console.log(locationWithAssinedStops.details.shortName);

    props.onButtonClicked({
      id: locationWithAssinedStops.id,
      name: locationWithAssinedStops.name,
      details: { ...locationWithAssinedStops.details },
      type: locationWithAssinedStops.type
    });
  }

  return <IonButton onClick={setCurrentLocationAsInputValue}></IonButton>

}
