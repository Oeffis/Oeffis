import { IonButton, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonLabel, IonList, IonModal } from "@ionic/react";
import React from "react";

const RoutePlanner: React.FC = () => (
    <>
        <form name="search_routes" onSubmit={submitInput} aria-label="route_planner_input">
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
                    {/* Generic Input for Start-Position */}
                    <IonInput name="start" label="Start position" labelPlacement="floating" placeholder="Enter start position" data-testid="origin-input" />
                </IonItem>
                <IonItem>
                    {/* Generic Input for Destination */}
                    <IonInput name="destination" label="Destination" labelPlacement="floating" placeholder="Enter destination" data-testid="destination-input" />
                </IonItem>
                <IonButton type="submit" size="default" expand="block">Search routes</IonButton>
            </IonList>
        </form>
    </>

);

{/* TODO later: As discussed in the design structure meeting, an input field is needed, which opens up a modal on focus, where the user can
                input the text. There should then a list be shown (viable stations to the input text). Upon selecting a station from the list and confirming
                the modal, the modal should close and transfer the chosen station to the original input field. */}

function submitInput(): void {
    {/* Empty dummy function to do something after submitting all inputs. */ }
}

export default RoutePlanner;
