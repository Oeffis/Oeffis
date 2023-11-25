import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../public/images/train_image.png";
import { TripOptionsDisplay } from "../components/RoutePlanner/TripOptionsDisplay";
import { useLocationByIdOrNull } from "../hooks/useLocationByIdOrNull";
import { useStateParams } from "../hooks/useStateParams";

const JourneyOptionsPage: React.FC = () => {

  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [departureTime, setDepartureTime] = useStateParams<string | null>(null, "departureTime", String, String);

  // const { origin, destination, departureTime } = useParams<{ origin: string; destination: string, departureTime: string }>();

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <h3>Öffis</h3>
          </IonTitle>
          <IonButtons slot="end">
            <IonImg className="menuLogo" src={logo} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent id="main-content" className="journeyContent">
        {
          originLocation !== null
          && destinationLocation !== null
          && departureTime !== null
          && <TripOptionsDisplay
            origin={originLocation}
            destination={destinationLocation}
            departure={departureTime}
          />
        }
      </IonContent>
    </IonPage>
  );
};

export default JourneyOptionsPage;
