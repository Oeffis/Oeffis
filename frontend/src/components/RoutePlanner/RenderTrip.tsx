import {
  IonItem,
  IonLabel
} from "@ionic/react";
import {
  Journey,
  TransportationLeg,
  TransportationLegTypeEnum
} from "../../api";
import "./RoutePlanner.css";

export function RenderTrip(props: { journey: Journey }): JSX.Element {
  const { journey } = props;

  return (
    <IonItem>
      <IonLabel>
        <ol>
          {
            journey.legs.map((leg, idx) => (
              <li key={idx}>
                {
                  leg.type === TransportationLegTypeEnum.Transportation
                    ? (leg as TransportationLeg).transportation.name
                    : "Footpath"
                }
                {leg.details.duration}
              </li>
            ))
          }
        </ol>
      </IonLabel>
    </IonItem>
  );
}
