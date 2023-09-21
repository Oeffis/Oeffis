import { IonButton } from "@ionic/react";
import { LatLngBoundsLiteral, LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ReactElement, useEffect, useState } from "react";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import { Location } from "../api";
import "./LeafletMapContainer.css";
import { MapController } from "./MapController";


export type MapProps = {
  currentLocation: Location,
  locations: Location[],
  showLines: boolean,
  onItemClicked?: (location: Location) => void
};

const LeafletMapContainer = ({ currentLocation, locations, showLines, onItemClicked }: MapProps): JSX.Element => {

  const [center, setCenter] = useState<LatLngTuple>([currentLocation.details.latitude, currentLocation.details.longitude]);
  const [zoom, setZoom] = useState<number>();
  //const [bounds, setBounds] = useState<LatLngBoundsLiteral>([]);

  const getBounds = (): LatLngBoundsLiteral => {

    const bounds: LatLngTuple[] = [];

    if (locations.length !== 0) {
      locations.map((location) => {
        bounds.push([location.details.latitude, location.details.longitude]);
      });
    } else {
      bounds.push(center);
    }

    return bounds;
  };

  const renderMarker = (): ReactElement[] => {

    const marker: ReactElement[] = [];

    if (currentLocation !== undefined) {
      marker.push(
        <Marker key={"currentPosition-m"} position={[currentLocation.details.latitude, currentLocation.details.longitude]}>
          <Popup key={"currentPosition-p"} className="popup">
            <IonButton key={"currentPosition-ib"}>{"You"}</IonButton>
          </Popup>
        </Marker>
      );
    }

    locations.map((location, index) => {
      marker.push(
        <Marker key={"marker" + index} position={[location.details.latitude, location.details.longitude]}>
          <Popup key={"popup" + index} className="popup">
            {onItemClicked !== undefined
              ? <IonButton key={"btn" + index} onClick={() => onItemClicked(location)}>{location.details.shortName}</IonButton>
              : <IonButton key={"btn" + index}>{location.details.shortName}</IonButton>}
          </Popup>
        </Marker>
      );
    });

    return marker;
  };

  const getPolygonPositions = (): LatLngExpression[] => {
    const positions: LatLngExpression[] = [];
    locations.map(location => {
      positions.push([location.details.latitude, location.details.longitude]);
    });
    return positions;
  };

  useEffect(() => {

    setZoom(15);

    console.log("Center: " + center);
    console.log("CurrentLocation: " + currentLocation);
    console.log("Locations: ");
    console.log(locations);

  }, []);

  return zoom && center.length > 0 ? (
    <MapContainer id="map" center={center} zoom={zoom} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController bounds={getBounds()} />
      {renderMarker()}
      {showLines
        ? <Polygon color={"blue"} dashArray={"20,15"} weight={2} positions={getPolygonPositions()} />
        : <></>}

    </MapContainer>
  ) : <div />;
};

export default LeafletMapContainer;
