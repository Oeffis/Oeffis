import { useEffect, useState } from "react";
import { AppService, HelloWorld, User, UserService } from "../api";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";

interface ContainerProps { }

const UserContianer: React.FC<ContainerProps> = () => {

    const [helloWorld, setHelloWorld] = useState<Array<HelloWorld>>();
    const [users, setUsers] = useState<Array<User>>([]);

    const [createUserName, setCreateUserName] = useState<string>("");
    const [createUserAge, setCreateUserAge] = useState<number>(0);
    const [createUserCity, setCreateUserCity] = useState<string>("");

    const [updateUserIndex, setUpdateUserIndex] = useState<string>("");
    const [updateUserName, setUpdateUserName] = useState<string>("");
    const [updateUserAge, setUpdateUserAge] = useState<number>(0);
    const [updateUserCity, setUpdateUserCity] = useState<string>("");

    const [deleteUserByIndex, setDeleteUserByIndex] = useState<string>("");
    const [getUserByIndex, setGetUserByIndex] = useState<string>("");

    const [userInfo, setUserInfo] = useState<string>("");

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

    const loadUser = async (index: string) => {
        setUpdateUserIndex(index);
        let user = await UserService.userControllerFindOne(index);
        console.log(user);
        setUpdateUserName(user.name);
        setUpdateUserAge(user.age);
        setUpdateUserCity(user.city);
    }

    const updateUser = async () => {
        let user = {
            name: updateUserName,
            age: updateUserAge,
            city: updateUserCity
        }
        await UserService.userControllerUpdate(updateUserIndex, user);
    }

    const deleteUser = async () => {
        console.log(deleteUserByIndex)
        await UserService.userControllerRemove(deleteUserByIndex);
    }

    const getUser = async () => {
        let user = await UserService.userControllerFindOne(getUserByIndex);
        setUserInfo(JSON.stringify(user));
    }

    const fetchUsers = async () => {
        setUsers(await UserService.userControllerFindAll());
        console.log(users);
    }

    const getAllUsers = () => {
        return (
            <IonList>
                <IonItem>
                    <IonLabel>index</IonLabel>
                    <IonLabel>name</IonLabel>
                    <IonLabel>age</IonLabel>
                    <IonLabel>city</IonLabel>
                </IonItem>
                {users.map((user, index) => (
                    <IonItem key={index}>
                        <IonLabel>
                            {index}
                        </IonLabel>
                        <IonLabel>
                            {user.name}
                        </IonLabel>
                        <IonLabel>
                            {user.age}
                        </IonLabel>
                        <IonLabel>
                            {user.city}
                        </IonLabel>
                    </IonItem>
                ))}
            </IonList>
        );
    }

    /* useEffect(() => {
        fetchUsers();
    }, [users]); */

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

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Update User</IonCardTitle>
                    </IonCardHeader>
                    <IonList>
                        <IonItem>
                            <IonInput onIonChange={e => loadUser(e.detail.value!)} label="User index" placeholder="Enter user index"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput onIonChange={e => setUpdateUserName(e.detail.value!)} id="uun" value={updateUserName} label="User name" placeholder="Enter user name"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput onIonChange={e => setUpdateUserAge(Number.parseInt(e.detail.value!))} id="uua" value={updateUserAge} label="Age" type="number" placeholder="0"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput onIonChange={e => setUpdateUserCity(e.detail.value!)} id="uuc" value={updateUserCity} label="City" placeholder="Enter city name"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonButton onClick={updateUser}>UPDATE USER</IonButton>
                        </IonItem>
                    </IonList>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Delete User</IonCardTitle>
                    </IonCardHeader>
                    <IonList>
                        <IonItem>
                            <IonInput onIonChange={e => setDeleteUserByIndex(e.detail.value!)} label="Index" type="number" placeholder="0"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonButton onClick={deleteUser}>DELETE USER</IonButton>
                        </IonItem>
                    </IonList>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Get User</IonCardTitle>
                        <IonCardSubtitle>{userInfo}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonList>
                        <IonItem>
                            <IonInput onIonChange={e => setGetUserByIndex(e.detail.value!)} label="Index" type="number" placeholder="0"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonButton onClick={getUser}>GET USER</IonButton>
                        </IonItem>
                    </IonList>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Get all User</IonCardTitle>
                    </IonCardHeader>
                    {getAllUsers()}
                    <IonList>
                        <IonItem>
                            <IonButton onClick={fetchUsers}>GET ALL USER</IonButton>
                        </IonItem>
                    </IonList>
                </IonCard>

            </IonList>
        </div>
    );

};

export default UserContianer;