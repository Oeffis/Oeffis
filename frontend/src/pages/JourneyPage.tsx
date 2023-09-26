import { Geolocation } from "@capacitor/geolocation";
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Location } from "../api";
import Menu from "../components/Menu";
import RoutePlanner from "../components/RoutePlanner";
import LeafletMapContainer from "../components/map/LeafletMapContainer";
import "./JourneyPage.css";

const JourneyPage: React.FC = () => {

  const [currentLocation, setCurrentLocation] = useState<Location>();
  const [origin, setOrigin] = useState<Location>();
  const [destination, setDestination] = useState<Location>();

  const getLocations = (): Location[] => {

    const locations: Location[] = [];

    if (currentLocation !== undefined) {
      locations.push(currentLocation);
    }
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
          name: "Aktuelle Position",
          type: "locality",
          details: {
            shortName: "Aktuelle Position",
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
                  origin={origin}
                  destination={destination}
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
