import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonPage } from "@ionic/react";
import { analytics, menu, person } from "ionicons/icons";
import LeafletMapContainer from "../components/LeafletMapContainer";
import { IJourney } from "../interfaces/IJourney.interface";
import JourneyListComponent from "../components/JourneyListComponent";


const journey : IJourney = {
  startTime: "17:00",
  travelDuration: 90,
  arrivalTime: "19:30",
  startStation: "SE4",
  arrivalStation: "SE9",
  stops: [
    {
      stopName: "SE4",
      stationName: "Gladbeck HBF",
      track: "GL.3",
      startTime: "17:00",
      arrivalTime: "17:30",
      travelDuration: 30
    },
    {
      stopName: "RE14",
      stationName: "Endstation HBF",
      track: "GL.3",
      startTime: "17:40",
      arrivalTime: "18:20",
      travelDuration: 50
    },
    {
      stopName: "RE15",
      stationName: "Endstation HBF",
      track: "GL.3",
      startTime: "18:25",
      arrivalTime: "19:30",
      travelDuration: 65
    }
  ]
};

const journey2 : IJourney = {
  startTime: "17:00",
  travelDuration: 90,
  arrivalTime: "19:30",
  startStation: "SE4",
  arrivalStation: "SE9",
  stops: [
    {
      stopName: "SE4",
      stationName: "Gladbeck HBF",
      track: "GL.3",
      startTime: "17:00",
      arrivalTime: "17:30",
      travelDuration: 30
    },
    {
      stopName: "RE14",
      stationName: "Endstation HBF",
      track: "GL.3",
      startTime: "17:40",
      arrivalTime: "18:20",
      travelDuration: 50
    },
    {
      stopName: "RE15",
      stationName: "Endstation HBF",
      track: "GL.3",
      startTime: "18:25",
      arrivalTime: "19:30",
      travelDuration: 65
    }
  ]
};

const journeys = [journey, journey2];
const Home: React.FC = () => (
  <IonPage>
    <IonContent fullscreen>
      <LeafletMapContainer />
      <IonFab slot="fixed" vertical="top" horizontal="end">
        <IonFabButton color="primary">
          <IonIcon icon={menu} />
        </IonFabButton>
        <IonFabList side="bottom">
          <IonFabButton color="secondary" href="/userDemo">
            <IonIcon icon={person} />
          </IonFabButton>
          <IonFabButton color="secondary" href="/journeyDemo">
            <IonIcon icon={analytics} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
            <JourneyListComponent journeys={journeys}/>
    </IonContent>
  </IonPage>
);

export default Home;
