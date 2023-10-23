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
import React, { useState } from "react";
import { Journey, JourneyRequestDto, Location, TransportationLeg, TransportationLegTypeEnum } from "../api";
import { useJourneyApi, useLocationFinderApi } from "../services/apiClients/ApiClientsContext";

/**
 * Container of elements related to journeys.
 */
// TODO Is this page even used in some place anymore?
const JourneysPage: React.FC = () => {
  const locationFinderService = useLocationFinderApi();
  const journeyService = useJourneyApi();

  const [locations, setLocations] = useState<Location[]>([]);
  const [journeys, setJourneys] = useState<Journey[]>([]);

  const [searchLocationsQuery, setSearchLocationsQuery] = useState<string>("");

  const [planJourneyStart, setPlanJourneyStart] = useState<string>("");
  const [useLocationAsStart, setUseLocationAsStart] = useState<boolean>(false);
  const [planJourneyDestination, setPlanJourneyDestination] = useState<string>("");
  const [useLocationAsDestination, setUseLocationAsDestination] = useState<boolean>(false);

  /**
   * Searches for locations with given query.
   */
  const searchLocations = async (): Promise<void> => {
    setLocations(await locationFinderService.locationFinderControllerFindLocationsByName({ name: searchLocationsQuery }));
    console.log(locations);
  };

  /**
   * Plans a journey with given start and destination.
   */
  const planJourney = async (): Promise<void> => {
    const journeyParameters: JourneyRequestDto = {
      originId: planJourneyStart,
      destinationId: planJourneyDestination,
      departure: new Date(Date.now()),
      asArrival: false
    };

    const journeyVariants =
      await journeyService.journeyControllerQueryJourney(journeyParameters);
    setJourneys(journeyVariants);
    console.log(journeyVariants);
  };

  /**
   * Generates a short description of given journey.
   *
   * @param journey journey
   */
  const getJourneyShortDescr = (journey: Journey): string => (
    journey.legs.map(leg =>
      leg.type === TransportationLegTypeEnum.Transportation
        ? (leg as TransportationLeg).transportation.name
        + " (" + (leg as TransportationLeg).transportation.destination.name + ") "
        : "footpath"
    )
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
        .map((location, index) => (
          <IonItem key={index}>
            <IonLabel>{index}</IonLabel>
            <IonLabel class="ion-text-wrap" data-testid="locationName">{location.name}</IonLabel>
            <IonLabel>unsupported</IonLabel>
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
          <IonLabel class="ion-text-wrap">{getJourneyShortDescr(journey)}</IonLabel>
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
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              <IonInput onIonInput={e => setSearchLocationsQuery(e.detail.value!)}
                label="Location query"
                placeholder="Enter location query." data-testid="stopQuery" />
              <IonButton onClick={() => void searchLocations()}
                data-testid="stopQuerySubmit"
                disabled={searchLocationsQuery.length === 0}
              >SEARCH LOCATIONS</IonButton>
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
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion*/}
              <IonInput onIonChange={e => setPlanJourneyStart(e.detail.value!)}
                disabled={useLocationAsStart}
                label="Start (id)"
                placeholder="Enter start location (id)." />

              <IonCheckbox onIonChange={e => setUseLocationAsStart(e.detail.checked)}
                disabled={useLocationAsDestination}
                checked={useLocationAsStart}
                justify="end">USE LOCATION</IonCheckbox>
            </IonItem>

            {/* Input for destination location. */}
            <IonLabel>DESTINATION</IonLabel>
            <IonItem>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              <IonInput onIonChange={e => setPlanJourneyDestination(e.detail.value!)}
                disabled={useLocationAsDestination}
                label="Destination (id)"
                placeholder="Enter destination location (id)." />
              <IonCheckbox onIonChange={e => setUseLocationAsDestination(e.detail.checked)}
                disabled={useLocationAsStart}
                checked={useLocationAsDestination}
                justify="end">USE LOCATION</IonCheckbox>
            </IonItem>

            {/* Button to trigger planning the journey. */}
            <IonItem>
              <IonButton onClick={() => void planJourney()}>PLAN JOURNEY</IonButton>
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
