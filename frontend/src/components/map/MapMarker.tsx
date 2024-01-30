import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import redBusIcon from "../../../src/images/bus-red-map-marker.svg";
import whiteBusIcon from "../../../src/images/bus-white-map-marker.svg";
import redLocationIcon from "../../../src/images/location-red-map-marker.svg";
import whiteLocationIcon from "../../../src/images/location-white-map-marker.svg";
import markerShadow from "../../../src/images/marker-shadow.png";
import redPinIcon from "../../../src/images/pin-red-map-marker.svg";
import whitePinIcon from "../../../src/images/pin-white-map-marker.svg";
import currentPositionIcon from "../../../src/images/position-map-marker.svg";

import { Location, LocationTypeEnum } from "../../api";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { Button } from "../controls/Button";

export interface MarkerProps {
  location: Location,
  onItemClicked?: (location: Location) => void
}

const MapMarker = ({ location, onItemClicked }: MarkerProps): JSX.Element => {

  const icon = new Icon({
    iconUrl: currentPositionIcon,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    shadowUrl: markerShadow,
    shadowAnchor: [0, 3],
    popupAnchor: [0, 0]
  });

  const locationName = location.name.split(",");

  return <Marker position={[location.details.coordinates.latitude, location.details.coordinates.longitude]}
    icon={icon}>
    <Popup className="popup">
      <p className="popupHeadline">{locationName[0]}</p><br />
      <p className="popupText">{locationName[1]}</p><br />
      <p className="popupText">
        <i>Haltestelle</i>
      </p>
      {onItemClicked !== undefined
        ? <Button title="Auswählen" onClick={() => onItemClicked(location)} />
        : <></>}
    </Popup>
  </Marker>;
};

export default MapMarker;

export const OriginMapMarker: React.FC<{
  originId: string | null,
  onItemClicked?: (location: Location) => void
}> = ({ originId, onItemClicked }) => {
  const location = useLocationByIdOrNull(originId);

  if (location === null) {
    return <></>;
  }
  const text = "Start";
  const icon = new Icon({
    iconUrl: getOriginIcon(location.type),
    iconSize: [25, 41],
    iconAnchor: [12.5, 38],
    shadowUrl: markerShadow,
    shadowAnchor: [12.5, 38],
    popupAnchor: [0, -32]
  });

  const locationName = location.name.split(",");
  return (
    <Marker position={[location.details.coordinates.latitude, location.details.coordinates.longitude]}
      icon={icon}>
      <Popup className="popup">
        <p className="popupHeadline">{locationName[0]}</p><br />
        <p className="popupText">{locationName[1]}</p><br />
        <p className="popupText">
          <i>{text}</i>
        </p>
        {onItemClicked !== undefined
          ? <p className="selectLocation" onClick={() => onItemClicked(location)}>Auswählen</p>
          : <></>}
      </Popup>
    </Marker>
  );
};

function getOriginIcon(type: string): string {
  switch (type) {
    case LocationTypeEnum.Address:
      return whiteLocationIcon;
    case LocationTypeEnum.Unknown:
      return whiteLocationIcon;
    case LocationTypeEnum.Street:
      return whiteLocationIcon;
    case LocationTypeEnum.Stop:
      return whiteBusIcon;
    case LocationTypeEnum.PoiHierarchy:
      return whitePinIcon;
    default:
      return whiteLocationIcon;
  }
}

export const DestinationMapMarker: React.FC<{
  destinationId: string | null,
  onItemClicked?: (location: Location) => void
}> = ({ destinationId, onItemClicked }) => {
  const location = useLocationByIdOrNull(destinationId);

  if (location === null) {
    return <></>;
  }
  const text = "Ziel";
  const icon = new Icon({
    iconUrl: getDestinationIcon(location.type),
    iconSize: [25, 41],
    iconAnchor: [12.5, 38],
    shadowUrl: markerShadow,
    shadowAnchor: [12.5, 38],
    popupAnchor: [0, -32]
  });

  const locationName = location.name.split(",");
  return (
    <Marker position={[location.details.coordinates.latitude, location.details.coordinates.longitude]}
      icon={icon}>
      <Popup className="popup">
        <p className="popupHeadline">{locationName[0]}</p><br />
        <p className="popupText">{locationName[1]}</p><br />
        <p className="popupText">
          <i>{text}</i>
        </p>
        {onItemClicked !== undefined
          ? <p className="selectLocation" onClick={() => onItemClicked(location)}>Auswählen</p>
          : <></>}
      </Popup>
    </Marker>
  );
};

function getDestinationIcon(type: string): string {
  switch (type) {
    case LocationTypeEnum.Address:
      return redLocationIcon;
    case LocationTypeEnum.Unknown:
      return redLocationIcon;
    case LocationTypeEnum.Street:
      return redLocationIcon;
    case LocationTypeEnum.Stop:
      return redBusIcon;
    case LocationTypeEnum.PoiHierarchy:
      return redPinIcon;
    default:
      return redLocationIcon;
  }
}

export const CurrentLocationMapMarker: React.FC = () => {
  const currentLocation = useCurrentLocation();
  if (currentLocation.state !== "located") {
    return <></>;
  }

  const currentLocationIcon = new Icon({
    iconUrl: currentPositionIcon,
    iconSize: [20, 20],
    iconAnchor: [0, 0],
    shadowUrl: markerShadow,
    shadowAnchor: [0, 20],
    popupAnchor: [10, 0]
  });

  return (
    <Marker
      position={[currentLocation.location.coords.latitude, currentLocation.location.coords.longitude]}
      icon={currentLocationIcon}>
      <Popup>
        <p className="popupHeadline">Aktuelle Position</p>
      </Popup >
    </Marker >
  );
};
