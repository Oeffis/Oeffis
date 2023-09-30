import { Geolocation } from "@capacitor/geolocation";
import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import logo from "../../public/images/train_image.png";
import { Location } from "../api";
import RoutePlanner from "../components/RoutePlanner";
import LeafletMapContainer from "../components/map/LeafletMapContainer";
import "./JourneyPage.css";

const JourneyPage: React.FC = () => {

  // 51.183334, 7.2
  const [currentLocation, setCurrentLocation] = useState<Location>(
    {
      id: "",
      name: "",
      type: "locality",
      details: {
        shortName: "",
        matchQuality: 0,
        latitude: 51.183334,
        longitude: 7.2
      }
    }
  );
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
      .catch(error => {
        console.log(error);
        setCurrentLocation({
          id: "",
          name: "",
          type: "locality",
          details: {
            shortName: "",
            matchQuality: 0,
            latitude: 51.183334,
            longitude: 7.2
          }
        });
      });
  }, []);

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <div className="menuBar">
            <IonTitle>Oeffies</IonTitle>
            <IonImg className="menuLogo" src={logo} />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent id="main-content" className="journeyContent">
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

    </IonPage>
  );
};

export default JourneyPage;
