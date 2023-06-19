import { useState } from "react";
import { AppService, HelloWorld } from "../api";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonList } from "@ionic/react";

interface ContainerProps { }

const UserContianer: React.FC<ContainerProps> = () => {

    const [helloWorld, setHelloWorld] = useState<Array<HelloWorld>>();

    const fetchHelloWorld = async () => {
        setHelloWorld(await AppService.appControllerGetHello());
    }

    return (
        <div className="UserContianer">
            <IonList>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Hello World!</IonCardTitle>
                        <IonCardSubtitle>Displays a "Hello World!" message received from backend.</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className="message">Response: {helloWorld?.toString()}</IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonButton onClick={fetchHelloWorld}>SEND REQUEST</IonButton>
                        </IonItem>
                    </IonList>
                </IonCard>

            </IonList>
        </div>
    );

};

export default UserContianer;