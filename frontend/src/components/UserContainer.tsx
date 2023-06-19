import { useState } from "react";
import { AppService, HelloWorld, UserService } from "../api";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonItem, IonList } from "@ionic/react";

interface ContainerProps { }

const UserContianer: React.FC<ContainerProps> = () => {

    const [helloWorld, setHelloWorld] = useState<Array<HelloWorld>>();

    const [createUserName, setCreateUserName] = useState<string>("");
    const [createUserAge, setCreateUserAge] = useState<number>(0);
    const [createUserCity, setCreateUserCity] = useState<string>("");

    const fetchHelloWorld = async () => {
        setHelloWorld(await AppService.appControllerGetHello());
    }

    const createUser = async () => {
        let user = {
            name: createUserName,
            age: createUserAge,
            city: createUserCity
        }
        await UserService.userControllerCreate(user);
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

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Create User</IonCardTitle>
                    </IonCardHeader>
                    <IonList>
                        <IonItem>
                            <IonInput onIonChange={e => setCreateUserName(e.detail.value!)} label="User name" placeholder="Enter user name"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput onIonChange={e => setCreateUserAge(Number.parseInt(e.detail.value!))} label="Age" type="number" placeholder="0"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput onIonChange={e => setCreateUserCity(e.detail.value!)} label="City" placeholder="Enter city name"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonButton onClick={createUser}>CREATE USER</IonButton>
                        </IonItem>
                    </IonList>
                </IonCard>

            </IonList>
        </div>
    );

};

export default UserContianer;