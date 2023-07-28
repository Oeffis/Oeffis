import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import { JSX, useState } from "react";
import { AppService, HelloWorld, User, UsersService } from "../api";

const UserPage: React.FC = () => {
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

  const fetchHelloWorld = async (): Promise<void> => {
    setHelloWorld(await AppService.appControllerGetHello());
  };

  const createUser = async (): Promise<void> => {
    const user = {
      name: createUserName,
      age: createUserAge,
      city: createUserCity
    };
    await UsersService.usersControllerCreate(user);
  };

  const loadUser = async (index: string): Promise<void> => {
    setUpdateUserIndex(index);
    const user = await UsersService.usersControllerFindOne(index);
    console.log(user);
    setUpdateUserName(user.name);
    setUpdateUserAge(user.age);
    setUpdateUserCity(user.city);
  };

  const updateUser = async (): Promise<void> => {
    const user = {
      name: updateUserName,
      age: updateUserAge,
      city: updateUserCity
    };
    await UsersService.usersControllerUpdate(updateUserIndex, user);
  };

  const deleteUser = async (): Promise<void> => {
    console.log(deleteUserByIndex);
    await UsersService.usersControllerRemove(deleteUserByIndex);
  };

  const getUser = async (): Promise<void> => {
    const user = await UsersService.usersControllerFindOne(getUserByIndex);
    setUserInfo(JSON.stringify(user));
  };

  const fetchUsers = async (): Promise<void> => {
    setUsers(await UsersService.usersControllerFindAll());
    console.log(users);
  };

  const getAllUsers = (): JSX.Element => (
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

  /* useEffect(() => {
        fetchUsers();
    }, [users]); */

  return (
    <IonContent>
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
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
                <IonInput onIonChange={e => setCreateUserName(e.detail.value!)} label="User name" placeholder="Enter user name" />
              </IonItem>
              <IonItem>
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
                <IonInput onIonChange={e => setCreateUserAge(Number.parseInt(e.detail.value!))} label="Age" type="number" placeholder="0" />
              </IonItem>
              <IonItem>
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
                <IonInput onIonChange={e => setCreateUserCity(e.detail.value!)} label="City" placeholder="Enter city name" />
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
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
                <IonInput onIonChange={e => loadUser(e.detail.value!)} label="User index" placeholder="Enter user index" />
              </IonItem>
              <IonItem>
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
                <IonInput onIonChange={e => setUpdateUserName(e.detail.value!)} id="uun" value={updateUserName} label="User name" placeholder="Enter user name" />
              </IonItem>
              <IonItem>
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
                <IonInput onIonChange={e => setUpdateUserAge(Number.parseInt(e.detail.value!))} id="uua" value={updateUserAge} label="Age" type="number" placeholder="0" />
              </IonItem>
              <IonItem>
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
                <IonInput onIonChange={e => setUpdateUserCity(e.detail.value!)} id="uuc" value={updateUserCity} label="City" placeholder="Enter city name" />
              </IonItem>
              <IonItem>
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
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
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
                <IonInput onIonChange={e => setDeleteUserByIndex(e.detail.value!)} label="Index" type="number" placeholder="0" />
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
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/explicit-function-return-type */}
                <IonInput onIonChange={e => setGetUserByIndex(e.detail.value!)} label="Index" type="number" placeholder="0" />
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
    </IonContent>
  );

};

export default UserPage;
