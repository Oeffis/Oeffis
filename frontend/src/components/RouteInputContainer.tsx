import React from "react";
import { IonDatetime, IonDatetimeButton, IonModal, IonItem, IonLabel } from "@ionic/react";

const RouteInputContainer: React.FC = () => (

    <div>
        <form style={{ marginBottom: 20 }}>
            <div>
                <div style={{ alignContent: "start" }}>
                    <IonDatetimeButton datetime="datetime" />

                    <IonModal keepContentsMounted={true}>
                        <IonDatetime id="datetime" />
                    </IonModal>
                </div>
            </div>
            <div>
                <div>
                    <label>Start</label>
                </div>
                <div style={{ height: 50, width: 200 }}>
                    <input type="text" name="Start" />
                </div>
                <div>
                    {/* Have to insert IonItems with results into IonList based on input search. Will be inserted into a separate input modal later on. */}
                </div>
            </div>
            <div>
                <div>
                    <label>Ziel</label>
                </div>
                <div style={{ height: 50, width: 200 }}>
                    <input type="text" name="Ziel" />
                </div>
                <div>
                    {/* Have to insert IonItems with results into IonList based on input search. Will be inserted into a separate input modal later on. */}
                </div>
            </div>
            <div>
                <input type="submit" value="Route Planen" onClick={fetchInputs} />
            </div>
        </form>
    </div>

);

function fetchInputs(): void {
    {/* do something*/ }
}

export default RouteInputContainer;
