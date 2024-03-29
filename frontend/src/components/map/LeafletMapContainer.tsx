import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ReactElement, useEffect, useState } from "react";
import { Polygon, TileLayer } from "react-leaflet";
import { Location } from "../../api";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useMultipleLocationsByIdOrNull } from "../../hooks/useMultipleLocationsByIdOrNull";
import "./LeafletMapContainer.css";
import MapMarker, { CurrentLocationMapMarker, DestinationMapMarker, OriginMapMarker } from "./MapMarker";
import ReactiveMapContainer, { View } from "./ReactiveMapContainer";

export interface MapProps {
  originId: string | null,
  destinationId: string | null,
  locationIds?: string[],
  showLines?: boolean,
  isDarkThemeEnabeled: boolean,
  onItemClicked?: (location: Location) => void
}

const NRW_BOUNDS: LatLngTuple[] = [[50.30527, 5.71687], [52.69499, 9.47241]];

const LeafletMapContainer = ({ originId, destinationId, locationIds, showLines, isDarkThemeEnabeled, onItemClicked }: MapProps): JSX.Element => {
  const locations = useMultipleLocationsByIdOrNull(locationIds);
  const usersPosition = useCurrentLocation();
  const [view, setView] = useState<View>({ bounds: NRW_BOUNDS });

  const bounds: LatLngTuple[] = locations.map((location) => [location.details.coordinates.latitude, location.details.coordinates.longitude]);

  const markers: ReactElement[] = [];
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].id !== originId && locations[i].id !== destinationId) {
      markers.push(
        <MapMarker
          key={"marker" + i}
          location={locations[i]}
          onItemClicked={onItemClicked}
        />
      );
    }
  }

  const renderPolygons = (): ReactElement[] => {
    const polygons: ReactElement[] = [];
    for (let i = 0; i < bounds.length - 1; i++) {
      polygons.push(
        <Polygon
          key={"line" + i}
          color={"rgb(0,148,236)"}
          opacity={1}
          dashArray={"30,20"}
          weight={2}
          positions={[bounds[i], bounds[i + 1]]} />
      );
    }
    return polygons;
  };

  useEffect(() => {
    if (usersPosition.state === "located") {
      const lat = usersPosition.location.coords.latitude;
      const lng = usersPosition.location.coords.longitude;

      setView({ center: [lat, lng], zoom: 15 });
    }
  }, []);

  useEffect(() => {
    if (bounds.length > 0) {
      setView({ bounds });
    }
  }, [locations]);

  return <ReactiveMapContainer
    style={{ height: "100%", width: "100%" }}
    view={view}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      className={isDarkThemeEnabeled ? "dark-map" : ""}
    />
    <CurrentLocationMapMarker />
    <OriginMapMarker originId={originId} />
    {markers}
    <DestinationMapMarker destinationId={destinationId} />
    {showLines && renderPolygons()}
  </ReactiveMapContainer>;
};

export default LeafletMapContainer;
