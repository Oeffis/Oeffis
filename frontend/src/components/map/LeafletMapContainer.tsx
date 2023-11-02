import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ReactElement, useEffect, useState } from "react";
import { Polygon, TileLayer } from "react-leaflet";
import { Location } from "../../api";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useMultipleLocationsByIdOrNull } from "../../hooks/useMultipleLocationsByIdOrNull";
import "./LeafletMapContainer.css";
import MapMarker, { CurrentLocationMapMarker } from "./MapMarker";
import ReactiveMapContainer, { View } from "./ReactiveMapContainer";

export interface MapProps {
  origin?: Location,
  destination?: Location,
  locationIds: string[],
  showLines: boolean,
  onItemClicked?: (location: Location) => void
}

const NRW_BOUNDS: LatLngTuple[] = [[50.30527, 5.71687], [52.69499, 9.47241]];

const LeafletMapContainer = ({ origin, destination, locationIds, showLines, onItemClicked }: MapProps): JSX.Element => {
  const locations = useMultipleLocationsByIdOrNull(locationIds);
  const usersPosition = useCurrentLocation();
  const [view, setView] = useState<View>({ bounds: NRW_BOUNDS });

  useEffect(() => {
    if (usersPosition.state === "located") {
      const lat = usersPosition.location.coords.latitude;
      const lng = usersPosition.location.coords.longitude;

      setView({ center: [lat, lng], zoom: 15 });
    }
  }, []);

  const getLocationsCoords = (): LatLngTuple[] => locations
    .map((location) => [location.details.coordinates.latitude, location.details.coordinates.longitude]);

  useEffect(() => {
    const bounds = getLocationsCoords();
    if (bounds.length > 0) {
      setView({ bounds });
    }
  }, [locations]);

  const markers = locations.map((location, index) => <MapMarker key={"marker" + index} origin={origin} destination={destination} location={location} onItemClicked={onItemClicked} />);

  const getPolygonPositions = getLocationsCoords;

  return <ReactiveMapContainer
    style={{ height: "100%", width: "100%" }}
    view={view}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {markers}
    <CurrentLocationMapMarker />
    {showLines
      ? <Polygon color={"rgb(77, 77, 77)"} opacity={1} dashArray={"20,15"} weight={2} positions={getPolygonPositions()} />
      : <></>}
  </ReactiveMapContainer>;
};

export default LeafletMapContainer;
