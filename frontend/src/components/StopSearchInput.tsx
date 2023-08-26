import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { Stop } from "../api";
import { useStopSearchByName } from "../hooks/useStopSearchbyName";

export type StopSearchInputProps = {
  onSelectedStopChanged: (stop: Stop) => void;
  selectedStop: Stop | null;
  inputLabel: string;
  prefixDataTestId?: string;
};

export const StopSearchInput = (props: StopSearchInputProps): JSX.Element => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  const setSelectedStopAndCloseModal = (stop: Stop): Promise<boolean> | undefined => {
    props.onSelectedStopChanged(stop);
    return modal.current?.dismiss();
  };

  const [debouncedSearchInput] = useDebounce(searchInput, 500);
  const foundStops = useStopSearchByName(debouncedSearchInput);

  return (
    <>
      <IonInput
        id={props.inputLabel + "input"}
        readonly
        placeholder={props.inputLabel}
        data-testid={props.prefixDataTestId + "-clickable"}
        value={props.selectedStop?.name ?? ""}
        label={props.inputLabel}
        labelPlacement="floating"
      />

      <IonModal ref={modal} trigger={props.inputLabel + "input"}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Search for {props.inputLabel}</IonTitle>
            <IonButtons slot="end">
              <IonButton
                color={"danger"}
                onClick={() => modal.current?.dismiss()}
              >
                Cancel
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonSearchbar
            value={searchInput}
            onInput={(e) => setSearchInput(e.currentTarget.value as string ?? "")}
            type="text"
            animated={true}
            placeholder={"Enter " + props.inputLabel}
            data-testid={"location-search-input"}
          />
        </IonHeader>
        <IonContent>
          <IonList>
            {
              <>
                {foundStops.type === "error" && <div>Error: {foundStops.error.message}</div>}
                {foundStops.type === "pending" && searchInput !== "" && <div>Searching...</div>}
                {foundStops.type === "success" &&
                  foundStops.searchResults.stops.map((stop) => (
                    <IonItem
                      key={stop.id}
                      button
                      onClick={(): Promise<boolean> | undefined => setSelectedStopAndCloseModal(stop)}>
                      <IonLabel
                        data-testid="locationName"
                      >
                        {stop.name}
                      </IonLabel>
                    </IonItem>
                  ))
                }
              </>
            }
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};
