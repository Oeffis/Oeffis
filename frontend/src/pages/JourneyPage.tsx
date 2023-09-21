import { Geolocation } from "@capacitor/geolocation";
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Location } from "../api";
import LeafletMapContainer from "../components/LeafletMapContainer";
import Menu from "../components/Menu";
import RoutePlanner from "../components/RoutePlanner";
import "./JourneyPage.css";

const JourneyPage: React.FC = () => {

  const [currentLocation, setCurrentLocation] = useState<Location>();
  const [origin, setOrigin] = useState<Location>();
  const [destination, setDestination] = useState<Location>();

  const getLocations = (): Location[] => {

    const locations: Location[] = [];

    if (origin !== undefined) {
      locations.push(origin);
    }
    if (destination !== undefined) {
      locations.push(destination);
    }

    return locations;
  };

  useEffect(() => {
    Geolocation.getCurrentPosition()
      .then(position =>
        setCurrentLocation({
          id: "",
          name: "You",
          type: "locality",
          details: {
            shortName: "You",
            matchQuality: 0,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      )
      .catch(error => console.log(error));
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Menu />
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Oeffies</IonTitle>
            </IonToolbar>
          </IonHeader>
          {currentLocation !== undefined
            ? <IonContent className="journeyContent">
              <IonContent className="map">
                <LeafletMapContainer
                  currentLocation={currentLocation}
                  locations={getLocations()}
                  showLines={true}
                />
              </IonContent>
              <IonContent className="planner">
                <RoutePlanner currentLocation={currentLocation} setSelectedOriginLocation={setOrigin} setSelectedDestinationLocation={setDestination} />
              </IonContent>
            </IonContent>
            : <></>}
        </IonPage>
      </IonContent>
    </IonPage>
  );
};

export default JourneyPage;
