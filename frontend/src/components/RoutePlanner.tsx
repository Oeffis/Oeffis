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
import { Journey, Location } from "../api";
import { useJourneyQuery } from "../hooks/useJourneyQuery";
import { useStateParams } from "../hooks/useStateParams";
import { IJourney } from "../interfaces/IJourney.interface";
import { IJourneyStep } from "../interfaces/IJourneyStep.interface";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";
import JourneyListComponent from "./JourneyListComponent";
import { LocationSearchInput } from "./LocationSearch/LocationSearchInput";

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
      <IonButton type="submit" size="default" expand="block">Search routes</IonButton>

      {
        originLocation !== null && destinationLocation !== null &&
        <TripOptionsDisplay origin={originLocation} destination={destinationLocation} />
      }
    </IonList>
  );

};

export function TripOptionsDisplay(props: { origin: Location, destination: Location }): JSX.Element {
  const { origin, destination } = props;

  const result = useJourneyQuery(origin, destination);

  const iJourneys: false | IJourney[] = result.type === "success" && result.journeyResults.map((journey): IJourney => {
    const lastLeg = journey.legs[journey.legs.length - 1];
    const firstLeg = journey.legs[0];

    return {
      startStation: firstLeg.origin.name,
      startTime: firstLeg.origin.departure.estimated,
      arrivalStation: lastLeg.destination.name,
      arrivalTime: lastLeg.destination.arrival.estimated,
      stops: journey.legs.map((leg): IJourneyStep => ({
        arrivalTime: leg.destination.arrival.estimated,
        startTime: leg.origin.departure.estimated,
        stationName: leg.origin.name,
        stopName: leg.destination.name,
        track: "",
        travelDurationInMinutes: leg.details.duration / 60
      })),
      travelDurationInMinutes: journey.legs.reduce((acc, leg) => acc + leg.details.duration, 0) / 60
    };
  });

  return (
    <>
      {result.type === "error" && <div>Error: {result.error.message}</div>}
      {result.type === "pending" && <div>Searching...</div>}
      {iJourneys &&
        <JourneyListComponent journeys={iJourneys} />
      }
    </>
  );
}

export function RenderTrip(props: { journey: Journey }): JSX.Element {
  const { journey } = props;

  return (
    <IonItem>
      <IonLabel>
        <ol>
          {
            journey.legs.map((leg, idx) => (
              <li key={idx}>
                {leg.transportation.name} {leg.details.duration}
              </li>
            ))
          }
        </ol>
      </IonLabel>
    </IonItem>
  );
}

export default RoutePlanner;


export function useInitialLocationFromLocationIdAndThenAsState(locationId: string | null): [Location | null, (location: Location | null) => void] {
  const locationFinderApi = useLocationFinderApi();
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();
    if (locationId !== null && location === null && locationId !== "") {
      locationFinderApi.locationFinderControllerFindLocationsByName({ name: locationId }, { signal: abortController.signal })
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
      abortController.abort();
      cancelled = true;
    };
  }, [locationId]);

  return [location, setLocation];
}
