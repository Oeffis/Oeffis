import { LatLngBoundsLiteral, LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ReactElement, useEffect, useState } from "react";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import { Location } from "../../api";
import "./LeafletMapContainer.css";
import MapController from "./MapController";
import MapMarker from "./MapMarker";


export type MapProps = {
  currentLocation: Location,
  origin?: Location,
  destination?: Location,
  locations: Location[],
  showLines: boolean,
  onItemClicked?: (location: Location) => void
};

const LeafletMapContainer = ({ currentLocation, origin, destination, locations, showLines, onItemClicked }: MapProps): JSX.Element => {

  const [zoom, setZoom] = useState<number>();

  const getBounds = (): LatLngBoundsLiteral => {

    const bounds: LatLngTuple[] = [];

    if (locations.length !== 0) {
      locations.map((location) => {
        bounds.push([location.details.latitude ?? 0, location.details.longitude ?? 0]);
      });
    } else {
      bounds.push([currentLocation.details.latitude ?? 0, currentLocation.details.longitude ?? 0]);
    }

    return bounds;
  };

  const renderMarker = (): ReactElement[] =>
    locations.map((location, index) =>
      <MapMarker key={"marker" + index} currentLocation={currentLocation} origin={origin} destination={destination} location={location} onItemClicked={onItemClicked} />
    );


  const getPolygonPositions = (): LatLngExpression[] => {
    const positions: LatLngExpression[] = [];
    locations.map(location => {
      if (location !== currentLocation) {
        positions.push([location.details.latitude ?? 0, location.details.longitude ?? 0]);
      }
    });
    return positions;
  };

  useEffect(() => {
    setZoom(15);
  }, []);

  return zoom ? (
    <MapContainer id="map" center={[currentLocation.details.latitude ?? 0, currentLocation.details.longitude ?? 0]} zoom={zoom} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController bounds={getBounds()} />
      {renderMarker()}
      {showLines
        ? <Polygon color={"rgb(77, 77, 77)"} opacity={1} dashArray={"20,15"} weight={2} positions={getPolygonPositions()} />
        : <></>}

    </MapContainer>
  ) : <div />;
};

export default LeafletMapContainer;
