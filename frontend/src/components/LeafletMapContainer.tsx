import { IonButton } from "@ionic/react";
import "leaflet/dist/leaflet.css";
import { ReactElement, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Location } from "../api";
import "./LeafletMapContainer.css";

export type LocationSearchListProps = {
  locations: Location[];
  onItemClicked: (location: Location) => void;
};

const LeafletMapContainer = ({ locations, onItemClicked }: LocationSearchListProps): JSX.Element => {
  const [center, setCenter] = useState<[number, number]>([51.5743061234828, 7.0272808779967315]);
  const [zoom, setZoom] = useState<number>();

  const select = (): void => {
    console.log("Selected");
  };

  const renderMarker = (): ReactElement[] => {

    const marker: ReactElement[] = [];

    locations.map(location => {
      marker.push(
        <Marker key={"m" + location.id} position={[location.details.latitude, location.details.longitude]}>
          <Popup key={"p" + location.id} className="popup">
            <IonButton key={"ib" + location.id} onClick={select}>{location.name}</IonButton>
          </Popup>
        </Marker>
      );
    });

    return marker;
  };

  const calculateCenter = (): [number, number] => {

    let result: [number, number] = [51.5743061234828, 7.0272808779967315];

    if (locations.length !== 0) {
      let latitude = 0;
      let longitude = 0;
      locations.map(location => {
        latitude = latitude + location.details.latitude;
        longitude = longitude + location.details.longitude;
      });

      result = [latitude / locations.length, longitude / locations.length];
    }

    return result;
  };

  useEffect(() => {
    setCenter(calculateCenter());
    setZoom(15);
  }, []);

  return zoom && center.length > 0 ? (
    <MapContainer id="map" center={center} zoom={zoom} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {renderMarker()}
    </MapContainer>
  ) : <div />;
};

export default LeafletMapContainer;
