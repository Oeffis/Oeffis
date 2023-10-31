import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ReactElement, useEffect, useState } from "react";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import { Location } from "../../api";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useMultipleLocationsByIdOrNull } from "../../hooks/useMultipleLocationsByIdOrNull";
import "./LeafletMapContainer.css";
import MapMarker, { CurrentLocationMapMarker } from "./MapMarker";

export interface MapProps {
  origin?: Location,
  destination?: Location,
  locationIds: string[],
  showLines: boolean,
  onItemClicked?: (location: Location) => void
}

const LeafletMapContainer = ({ origin, destination, locationIds, showLines, onItemClicked }: MapProps): JSX.Element => {
  const locations = useMultipleLocationsByIdOrNull(locationIds);
  const usersPosition = useCurrentLocation();
  const [zoom, setZoom] = useState<number>();

  const lat = usersPosition.state === "located" ? usersPosition.location.coords.latitude : 51.183334;
  const lng = usersPosition.state === "located" ? usersPosition.location.coords.longitude : 7.200000;

  const getLocationsCoords = (): LatLngTuple[] => locations
    .map((location) => [location.details.coordinates.latitude, location.details.coordinates.longitude]);

  /* const getBounds = (): LatLngTuple[] => {
    const bounds = getLocationsCoords();
    if (bounds.length <= 0) {
      return [[currentLocation.details.latitude ?? 51.183334, currentLocation.details.longitude ?? 7.200000]];
    }
    return bounds;
  }; */

  const renderMarker = (): ReactElement[] => locations.map((location, index) => <MapMarker key={"marker" + index} origin={origin} destination={destination} location={location} onItemClicked={onItemClicked} />);

  const getPolygonPositions = getLocationsCoords;

  useEffect(() => {
    setZoom(15);
  }, []);

  return zoom ? (
    <MapContainer id="map"
      center={[lat, lng]}
      zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <MapController bounds={getBounds()} /> */}
      {renderMarker()}
      {<CurrentLocationMapMarker />}
      {showLines
        ? <Polygon color={"rgb(77, 77, 77)"} opacity={1} dashArray={"20,15"} weight={2} positions={getPolygonPositions()} />
        : <></>}
    </MapContainer>
  ) : <div />;
};

export default LeafletMapContainer;
