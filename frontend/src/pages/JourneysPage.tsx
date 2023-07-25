import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList
} from "@ionic/react";
import { Journey, Location, Station, Stop } from "hafas-client";
import React, { useState } from "react";
import {
  JourneyLocation,
  JourneysService,
  JourneyStopStationIdDto,
  JourneyUserLocationDto,
  JourneyVariant,
  PlanJourneyDto
} from "../api";

/**
 * Container of elements related to journeys.
 */
const JourneysPage: React.FC = () => {

  const [locations, setLocations] = useState<JourneyLocation[]>([]);
  const [journeys, setJourneys] = useState<JourneyVariant[]>([]);

  const [searchLocationsQuery, setSearchLocationsQuery] = useState<string>("");

  const [planJourneyStart, setPlanJourneyStart] = useState<string>("");
  const [useLocationAsStart, setUseLocationAsStart] = useState<boolean>(false);
  const [planJourneyDestination, setPlanJourneyDestination] = useState<string>("");
  const [useLocationAsDestination, setUseLocationAsDestination] = useState<boolean>(false);

  /**
   * Searches for locations with given query.
   */
  const searchLocations = async (): Promise<void> => {
    setLocations(await JourneysService.journeysControllerSearchLocation(searchLocationsQuery));
    console.log(locations);
  };

  /**
   * Plans a journey with given start and destination.
   */
  const planJourney = async (): Promise<void> => {
    // Mock for the user location (uses "Westfälische Hochschule Gelsenkirchen" as user location).
    // TODO Determine real user location.
    const userLocation: JourneyUserLocationDto = {
      address: "Neidenburger Str. 43, 45897 Gelsenkirchen",
      latitude: 51.574272755490284,
      longitude: 7.027275510766967
    };

    const startLocation = !useLocationAsStart
      ? { stopStationId: planJourneyStart } as JourneyStopStationIdDto
      : userLocation;
    const destinationLocation = !useLocationAsDestination
      ? { stopStationId: planJourneyDestination } as JourneyStopStationIdDto
      : userLocation;

    const journeyParameters: PlanJourneyDto = {
      from: startLocation,
      to: destinationLocation
    };

    const journeyVariants: JourneyVariant[] =
      await JourneysService.journeysControllerPlanJourney(journeyParameters);
    setJourneys(journeyVariants);
    console.log(journeyVariants);
  };

  /**
   * Generates a short description of given journey.
   *
   * @param journey journey
   */
  const getJourneyShortDescr = (journey: Journey): string => (
    journey.legs
      .filter(leg => !leg.walking)
      .map(leg => (
        leg.line?.name + " (" + leg.direction + ")"
      ))
      .join(" -> ")
  );

  /**
   * Returns the results of the location search as a JSX element.
   */
  const getLocationResults = (): JSX.Element => (
    <IonList>
      <IonItem>
        <IonLabel>index</IonLabel>
        <IonLabel>name</IonLabel>
        <IonLabel>type</IonLabel>
        <IonLabel>id</IonLabel>
      </IonItem>
      {locations
        .map(journeyLocation => journeyLocation.location as (Station | Stop | Location))
        .map((location, index) => (
          <IonItem key={index}>
            <IonLabel>{index}</IonLabel>
            <IonLabel class="ion-text-wrap">{location.name}</IonLabel>
            <IonLabel>{location.type}</IonLabel>
            <IonLabel>{location.id}</IonLabel>
          </IonItem>
        ))}
    </IonList>
  );

  /**
   * Returns the planned journeys as a JSX element containing the string representation of the journeys.
   */
  const getPlannedJourneys = (): JSX.Element => (
    <IonList>
      <IonItem>journeys</IonItem>
      {journeys.map((journey, index) => (
        <IonItem key={index}>
          <IonLabel>{index}</IonLabel>
          <IonLabel class="ion-text-wrap">{getJourneyShortDescr(journey.journey as Journey)}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );

  return (
    <IonContent>
      <div className="JourneysContainer">

        {/* Element to search for locations. */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Search locations</IonCardTitle>
          </IonCardHeader>
          <IonList>
            {/* Input for query string. */}
            <IonItem>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
              <IonInput onIonChange={e => setSearchLocationsQuery(e.detail.value!)}
                label="Location query"
                placeholder="Enter location query." />
              <IonButton onClick={searchLocations}>SEARCH LOCATIONS</IonButton>
            </IonItem>
          </IonList>
          {/* Output of locations search. */}
          {getLocationResults()}
        </IonCard>

        {/* Element to plan a journey */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Plan journey</IonCardTitle>
            <IonCardSubtitle>Use searched locations to plan a journey.</IonCardSubtitle>
          </IonCardHeader>
          <IonList>
            {/* Input for start location. */}
            <IonLabel>START</IonLabel>
            <IonItem>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
              <IonInput onIonChange={e => setPlanJourneyStart(e.detail.value!)}
                        disabled={useLocationAsStart}
                        label="Start (id)"
                        placeholder="Enter start location (id)."/>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
              <IonCheckbox onIonChange={e => setUseLocationAsStart(e.detail.checked)}
                           disabled={useLocationAsDestination}
                           checked={useLocationAsStart}
                           justify="end">USE LOCATION</IonCheckbox>
            </IonItem>

            {/* Input for destination location. */}
            <IonLabel>DESTINATION</IonLabel>
            <IonItem>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
              <IonInput onIonChange={e => setPlanJourneyDestination(e.detail.value!)}
                        disabled={useLocationAsDestination}
                        label="Destination (id)"
                        placeholder="Enter destination location (id)."/>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
              <IonCheckbox onIonChange={e => setUseLocationAsDestination(e.detail.checked)}
                           disabled={useLocationAsStart}
                           checked={useLocationAsDestination}
                           justify="end">USE LOCATION</IonCheckbox>
            </IonItem>

            {/* Button to trigger planning the journey. */}
            <IonItem>
              <IonButton onClick={planJourney}>PLAN JOURNEY</IonButton>
            </IonItem>
          </IonList>

          {/* Area to show planned journeys. */}
          {getPlannedJourneys()}
        </IonCard>

      </div>
    </IonContent>
  );
};

export default JourneysPage;
