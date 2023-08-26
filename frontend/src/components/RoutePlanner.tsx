import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonItem,
  IonLabel,
  IonList,
  IonModal
} from "@ionic/react";
import React from "react";
import { Stop } from "../api";
import { StopSearchInput } from "./StopSearchInput";

const RoutePlanner: React.FC = () => {
  const [origin, setOrigin] = React.useState<Stop | null>(null);
  const [destination, setDestination] = React.useState<Stop | null>(null);

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
        <StopSearchInput
          inputLabel="Origin"
          selectedStop={origin}
          onSelectedStopChanged={(stop): void => setOrigin(stop)}
        />
      </IonItem>
      <IonItem>
        <StopSearchInput
          inputLabel="Destination"
          selectedStop={destination}
          onSelectedStopChanged={(stop): void => setDestination(stop)}
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
