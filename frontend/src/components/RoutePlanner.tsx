import React from "react";
import { IonDatetime, IonDatetimeButton, IonModal, IonContent, IonList, IonItem, IonInput, IonButton } from "@ionic/react";

const RouteInputContainer: React.FC = () => (
    <IonContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <form name="search_routes" onSubmit={submitInput} aria-label="route_planner_input">
                <IonList style={{ padding: "2%" }}>
                    <IonItem style={{ marginBottom: "2%" }}>
                        {/* Date-Time-Picker, allowing the user to select dates in the present aswell as the future */}
                        <IonDatetimeButton aria-label="Date and Time" datetime="datetime" />
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime name="date_time" id="datetime" min={new Date().toISOString()} />
                        </IonModal>
                    </IonItem>
                    <IonItem style={{ marginBottom: "2%" }}>
                        {/* Generic Input for Start-Position */}
                        <IonInput name="start" aria-label="Start position" fill="outline" placeholder="Enter start position" />
                    </IonItem>
                    <IonItem style={{ marginBottom: "2%" }}>
                        {/* Generic Input for Destination */}
                        <IonInput name="destination" aria-label="Destination" fill="outline" placeholder="Enter destination" />
                    </IonItem>
                    <IonItem style={{ marginBottom: "2%" }}>
                        {/* Generic Button for Submission */}
                        <IonButton type="submit" size="default">Search routes</IonButton>
                    </IonItem>
                </IonList>
            </form>
        </div>
    </IonContent>
);

{/* TODO later: As discussed in the design structure meeting, an input field is needed, which opens up a modal on focus, where the user can
                input the text. There should then a list be shown (viable stations to the input text). Upon selecting a station from the list and confirming
                the modal, the modal should close and transfer the chosen station to the original input field. */}

function submitInput(): void {
    {/* Empty dummy function to do something after submitting all inputs. */ }
}

export default RouteInputContainer;
