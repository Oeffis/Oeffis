import React from "react";
import { IonDatetime, IonDatetimeButton, IonModal } from "@ionic/react";

const RouteInputContainer: React.FC = () => (

    <div>
        <form style={{ marginBottom: 20 }}>
            <div>
                {/* Datetime-Picker basic Ionic-Component */}
                <div style={{ alignContent: "start" }}>
                    <IonDatetimeButton datetime="datetime" />

                    <IonModal keepContentsMounted={true}>
                        <IonDatetime id="datetime" />
                    </IonModal>
                </div>
            </div>
            <div>
                {/* Generic Input for Start-Position */}
                <div>
                    <label>Start</label>
                </div>
                <div style={{ height: 50, width: 200 }}>
                    <input type="text" name="Start" />
                </div>
                <div>
                    {/* TODO: Have to insert IonItems with results into IonList based on input search. Will be inserted into a separate input modal later on. */}
                </div>
            </div>
            <div>
                {/* Generic Input for Destination-Position */}
                <div>
                    <label>Ziel</label>
                </div>
                <div style={{ height: 50, width: 200 }}>
                    <input type="text" name="Ziel" />
                </div>
                <div>
                    {/* TODO: Have to insert IonItems with results into IonList based on input search. Will be inserted into a separate input modal later on. */}
                </div>
            </div>
            <div>
                {/* Generic Submit-Button for pushing the inputs into the URL-Params */}
                <input type="submit" value="Route Planen" onClick={fetchInputs} />
            </div>
        </form>
    </div>

);

function fetchInputs(): void {
    {/* Empty dummy function to later on fetch the input values and put into persistent memory when refreshing the page. */ }
}

export default RouteInputContainer;
