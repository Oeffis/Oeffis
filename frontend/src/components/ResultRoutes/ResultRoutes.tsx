import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../../public/images/train_image.png";
import { FootpathLeg, LegOriginLocationTypeEnum, Location, TransportationLeg } from "../../api";
import { useJourneyQuery } from "../../hooks/useJourneyQuery";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useStateParams } from "../../hooks/useStateParams";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";
import JourneyListComponent from "../JourneyListComponent";
import "./ResultRoutes.css";

const ResultRoutes: React.FC = () => {
  const [originId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [departureTime] = useStateParams<string>("now", "departure", String, String);

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <div className="menuBar">
            <IonTitle>Oeffies</IonTitle>
            <IonImg className="menuLogo" src={logo} />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          originLocation !== null && destinationLocation !== null &&
          <TripOptionsDisplay
            origin={originLocation}
            destination={destinationLocation}
            departure={new Date(departureTime)}
          />
        }
      </IonContent>
    </>);
};

export default ResultRoutes;

export function TripOptionsDisplay(props: {
  origin: Location,
  destination: Location,
  departure: Date
}): JSX.Element {
  const { origin, destination, departure } = props;

  // TODO Add user input if datetime should be interpreted as arrival time.
  const result = useJourneyQuery(origin, destination, departure, false);

  const iJourneys: false | IJourney[] = result.type === "success"
    && result.journeyResults
      .map((journey): IJourney => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const legs: (TransportationLeg | FootpathLeg)[] = journey.legs;

        const lastLeg = legs[legs.length - 1];
        const firstLeg = legs[0];

        return {
          startStation: firstLeg.origin.name,
          startTime: firstLeg.origin.departureTimeEstimated,
          arrivalStation: lastLeg.destination.name,
          arrivalTime: lastLeg.destination.arrivalTimeEstimated,
          stops: legs.map((leg): IJourneyStep => ({
            arrivalTime: leg.destination.arrivalTimeEstimated,
            startTime: leg.origin.departureTimeEstimated,
            stationName: leg.origin.name,
            track: leg.origin.type === LegOriginLocationTypeEnum.Platform
              ? leg.origin.details.shortName
              : "",
            stopName: leg.destination.name,
            travelDurationInMinutes: leg.details.duration / 60,
            line: "transportation" in leg ? leg.transportation.line : ""
          })),
          travelDurationInMinutes: legs.reduce((acc, leg) => acc + leg.details.duration, 0) / 60
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
