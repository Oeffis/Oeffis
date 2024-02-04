import { IonToast } from "@ionic/react";
import { notificationsCircle } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { Location, LocationCoordinates } from "../../api";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useMultipleLocationsByIdOrNull } from "../../hooks/useMultipleLocationsByIdOrNull";
import { IJourney } from "../../interfaces/IJourney.interface";

export interface StopCheckerComponentProps {
  journey: IJourney | null
}

const StopCheckerComponent: React.FC<StopCheckerComponentProps> = (props) => {

  const intervalId = useRef<NodeJS.Timeout>();

  const [displayArrivedNotification, setDisplayArrivedNotification] = useState<boolean>(false);
  const [arrivedNotificationMessage, setArrivedNotificationMessage] = useState<string>("Sie haben die Haltestelle ... erreicht.");

  const currentLocation = useCurrentLocation();
  let locations: Location[] = [];

  if (props.journey !== null) {
    const stopIds: string[] = [];
    for (let i = 0; i < props.journey.stops.length - 1; i++) {
      const stop = props.journey.stops[i];
      stopIds.push(stop.stopIds[stop.stopIds.length - 1]);
    }
    locations = stopIds.length > 0 && stopIds !== undefined ? useMultipleLocationsByIdOrNull(stopIds) : [];
  }

  const isCurrentLocationArrivedAtStopLocation = (position: LocationCoordinates, destination: LocationCoordinates): boolean => {
    const range = 0.000001;
    return ((destination.latitude + range) >= position.latitude && (destination.latitude - range) <= position.latitude)
      && ((destination.longitude + range) >= position.longitude && (destination.longitude - range) <= position.longitude);
  };

  const watchPosition = (): void => {
    const currentPositionCoordinates: LocationCoordinates = {
      latitude: currentLocation.location?.coords.latitude,
      longitude: currentLocation.location?.coords.longitude
    } as LocationCoordinates;

    locations.map(location => {
      if (isCurrentLocationArrivedAtStopLocation(currentPositionCoordinates, location.details.coordinates)) {
        setDisplayArrivedNotification(true);
        setArrivedNotificationMessage("Sie haben die Haltestelle " + location.name + " erreicht.");
        console.log("Sie haben die Haltestelle " + location.name + " erreicht.");
      }
    });
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      watchPosition();
      console.log("watching position");
    }, 5000);
    return () => clearInterval(intervalId.current);
  }, [props.journey]);

  return (
    <IonToast
      isOpen={displayArrivedNotification}
      message={arrivedNotificationMessage}
      position="bottom"
      duration={3000}
      icon={notificationsCircle} />
  );
};

export default StopCheckerComponent;
