import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ReactElement, useEffect, useState } from "react";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import { Location } from "../../api";
import { useMultipleLocationsByIdOrNull } from "../../hooks/useMultipleLocationsByIdOrNull";
import "./LeafletMapContainer.css";
import MapController from "./MapController";
import MapMarker, { CurrentLocationMapMarker } from "./MapMarker";


export type MapProps = {
  currentLocation: Location,
  origin?: Location,
  destination?: Location,
  locationIds: string[],
  showLines: boolean,
  onItemClicked?: (location: Location) => void
};

const LeafletMapContainer = ({ currentLocation, origin, destination, locationIds, showLines, onItemClicked }: MapProps): JSX.Element => {
  const locations = useMultipleLocationsByIdOrNull(locationIds);

  const [zoom, setZoom] = useState<number>();

  const getLocationsCoords = (): LatLngTuple[] => locations
    .map((location) => {
      if (location.details.latitude === undefined) return;
      if (location.details.longitude === undefined) return;
      return [location.details.latitude, location.details.longitude];
    })
    .filter(tupel => tupel !== undefined) as LatLngTuple[];

  const getBounds = (): LatLngTuple[] => {
    const bounds = getLocationsCoords();
    if (bounds.length <= 0) {
      return [[currentLocation.details.latitude ?? 51.183334, currentLocation.details.longitude ?? 7.200000]];
    }
    return bounds;
  };

  const renderMarker = (): ReactElement[] => locations.map((location, index) => {
    if (location === null) return <></>;
    return <MapMarker key={"marker" + index} origin={origin} destination={destination} location={location} onItemClicked={onItemClicked} />;
  });

  const getPolygonPositions = getLocationsCoords;

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
      {currentLocation ? <CurrentLocationMapMarker currentLocation={currentLocation} /> : <></>}
      {showLines
        ? <Polygon color={"rgb(77, 77, 77)"} opacity={1} dashArray={"20,15"} weight={2} positions={getPolygonPositions()} />
        : <></>}
    </MapContainer>
  ) : <div />;
};

export default LeafletMapContainer;
