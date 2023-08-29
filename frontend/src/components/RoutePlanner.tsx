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
import { Stop, StopFinderService } from "../api";
import { useStateParams } from "../hooks/useStateParams";
import { StopSearchInput } from "./StopSearchInput";

const RoutePlanner: React.FC = () => {
  const [originStopId, setOriginStopId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationStopId, setDestinationStopId] = useStateParams<string | null>(null, "destination", String, String);

  const [originStop, setOriginStop] = useState<Stop | null>(null);
  const [destinationStop, setDestinationStop] = useState<Stop | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (originStopId !== null && originStop === null && originStopId !== "") {
      StopFinderService.stopFinderControllerFindStopByName({ name: originStopId })
        .then(({ stops }) => {
          if (stops.length > 0 && !cancelled) {
            setOriginStop(stops[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (): void => {
      cancelled = true;
    };
  }, [originStopId]);

  useEffect(() => {
    let cancelled = false;
    if (destinationStopId !== null && destinationStop === null && destinationStopId !== "") {
      StopFinderService.stopFinderControllerFindStopByName({ name: destinationStopId })
        .then(({ stops }) => {
          if (stops.length > 0 && !cancelled) {
            setDestinationStop(stops[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (): void => {
      cancelled = true;
    };
  }, [destinationStopId]);

  const setOrigin = (stop: Stop | null): void => {
    setOriginStop(stop);
    setOriginStopId(stop?.id ?? null);
  };

  const setDestination = (stop: Stop | null): void => {
    setDestinationStop(stop);
    setDestinationStopId(stop?.id ?? null);
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
        <StopSearchInput
          inputLabel="Origin"
          selectedStop={originStop}
          onSelectedStopChanged={(stop): void => setOrigin(stop)}
          prefixDataTestId="origin-input"
        />
      </IonItem>
      <IonItem>
        <StopSearchInput
          inputLabel="Destination"
          selectedStop={destinationStop}
          onSelectedStopChanged={(stop): void => setDestination(stop)}
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
