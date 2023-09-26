import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";
import greenBusIcon from "../../src/images/bus-green-map-marker.svg";
import redBusIcon from "../../src/images/bus-red-map-marker.svg";
import whiteBusIcon from "../../src/images/bus-white-map-marker.svg";
import greenLocationIcon from "../../src/images/location-green-map-marker.svg";
import redLocationIcon from "../../src/images/location-red-map-marker.svg";
import whiteLocationIcon from "../../src/images/location-white-map-marker.svg";
import markerShadow from "../../src/images/marker-shadow.png";
import greenPinIcon from "../../src/images/pin-green-map-marker.svg";
import redPinIcon from "../../src/images/pin-red-map-marker.svg";
import whitePinIcon from "../../src/images/pin-white-map-marker.svg";
import currentPostionIcon from "../../src/images/position-map-marker.svg";

import { Location, LocationTypeEnum } from "../api";

export type MarkerProps = {
  currentLocation: Location,
  origin?: Location,
  destination?: Location,
  location: Location,
  onItemClicked?: (location: Location) => void
};

const MapMarker = ({ currentLocation, origin, destination, location, onItemClicked }: MarkerProps): JSX.Element => {

  const getOriginIcon = (type: LocationTypeEnum | undefined): string => {
    let icon: string = currentPostionIcon;

    if (type === LocationTypeEnum.Address) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Crossing) {
      icon = whiteLocationIcon;
    }
    if (type === LocationTypeEnum.Gis) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Locality) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Platform) {
      icon = whiteBusIcon;
    }
    if (type === LocationTypeEnum.Poi) {
      icon = whitePinIcon;
    }
    if (type === LocationTypeEnum.PoiHierarchy) {
      icon = whitePinIcon;
    }
    if (type === LocationTypeEnum.Sharing) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Stop) {
      icon = whiteBusIcon;
    }
    if (type === LocationTypeEnum.Street) {
      icon = whiteLocationIcon;
    }
    if (type === LocationTypeEnum.Suburb) {
      icon = currentPostionIcon;
    }
    // not present in vrr spec
    if (type === LocationTypeEnum.Singlehouse) {
      icon = currentPostionIcon;
    }

    return icon;
  };

  const getDestinationIcon = (type: LocationTypeEnum | undefined): string => {
    let icon: string = currentPostionIcon;

    if (type === LocationTypeEnum.Address) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Crossing) {
      icon = redLocationIcon;
    }
    if (type === LocationTypeEnum.Gis) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Locality) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Platform) {
      icon = redBusIcon;
    }
    if (type === LocationTypeEnum.Poi) {
      icon = redPinIcon;
    }
    if (type === LocationTypeEnum.PoiHierarchy) {
      icon = redPinIcon;
    }
    if (type === LocationTypeEnum.Sharing) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Stop) {
      icon = redBusIcon;
    }
    if (type === LocationTypeEnum.Street) {
      icon = redLocationIcon;
    }
    if (type === LocationTypeEnum.Suburb) {
      icon = currentPostionIcon;
    }
    // not present in vrr spec
    if (type === LocationTypeEnum.Singlehouse) {
      icon = currentPostionIcon;
    }

    return icon;
  };

  const getLocationIcon = (type: LocationTypeEnum | undefined): string => {
    let icon: string = currentPostionIcon;

    if (type === LocationTypeEnum.Address) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Crossing) {
      icon = greenLocationIcon;
    }
    if (type === LocationTypeEnum.Gis) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Locality) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Platform) {
      icon = greenBusIcon;
    }
    if (type === LocationTypeEnum.Poi) {
      icon = greenPinIcon;
    }
    if (type === LocationTypeEnum.PoiHierarchy) {
      icon = greenPinIcon;
    }
    if (type === LocationTypeEnum.Sharing) {
      icon = currentPostionIcon;
    }
    if (type === LocationTypeEnum.Stop) {
      icon = greenBusIcon;
    }
    if (type === LocationTypeEnum.Street) {
      icon = greenLocationIcon;
    }
    if (type === LocationTypeEnum.Suburb) {
      icon = currentPostionIcon;
    }
    // not present in vrr spec
    if (type === LocationTypeEnum.Singlehouse) {
      icon = currentPostionIcon;
    }

    return icon;
  };


  const getDesignation = (type: LocationTypeEnum | undefined): string => {

    let designation = "";

    if (type === LocationTypeEnum.Address) {
      designation = "";
    }
    if (type === LocationTypeEnum.Crossing) {
      designation = "Straße";
    }
    if (type === LocationTypeEnum.Gis) {
      designation = "";
    }
    if (type === LocationTypeEnum.Locality) {
      designation = "";
    }
    if (type === LocationTypeEnum.Platform) {
      designation = "Haltestelle";
    }
    if (type === LocationTypeEnum.Poi) {
      designation = "Ort";
    }
    if (type === LocationTypeEnum.PoiHierarchy) {
      designation = "Ort";
    }
    if (type === LocationTypeEnum.Sharing) {
      designation = "";
    }
    if (type === LocationTypeEnum.Stop) {
      designation = "Haltestelle";
    }
    if (type === LocationTypeEnum.Street) {
      designation = "Straße";
    }
    if (type === LocationTypeEnum.Suburb) {
      designation = "";
    }
    // not present in vrr spec
    if (type === LocationTypeEnum.Singlehouse) {
      designation = "";
    }

    return designation;
  };


  const createMarker = (): JSX.Element => {

    let mapMarker: JSX.Element = <></>;

    if (currentLocation === location) {

      const currentLocationIcon = new Icon({
        iconUrl: currentPostionIcon,
        iconSize: [20, 20],
        iconAnchor: [0, 0],
        shadowUrl: markerShadow,
        shadowAnchor: [0, 20],
        popupAnchor: [10, 0]
      });

      mapMarker = (
        <Marker position={[location.details.latitude ?? 0, location.details.longitude ?? 0]} icon={currentLocationIcon}>
          <Popup className="popup">
            <p className="popupHeadline">{location.name}</p>
          </Popup>
        </Marker>
      );
    } else if (origin === location) {

      const originLocationIcon = new Icon({
        iconUrl: getOriginIcon(location.type),
        iconSize: [25, 41],
        iconAnchor: [12.5, 38],
        shadowUrl: markerShadow,
        shadowAnchor: [12.5, 38],
        popupAnchor: [0, -32]
      });

      mapMarker = (
        <Marker position={[location.details.latitude ?? 0, location.details.longitude ?? 0]} icon={originLocationIcon}>
          <Popup className="popup">
            <p className="popupHeadline">{location.name?.split(",")[0]}</p><br />
            <p className="popupText">{location.details.shortName}</p><br />
            <p className="popupText">
              <i>Ziel</i>
            </p>
            {onItemClicked !== undefined
              ? <p className="selectLocation" onClick={() => onItemClicked(location)}>Select</p>
              : <></>}
          </Popup>
        </Marker>
      );
    } else if (destination === location) {

      const destinatinoLocationIcon = new Icon({
        iconUrl: getDestinationIcon(location.type),
        iconSize: [25, 41],
        iconAnchor: [12.5, 38],
        shadowUrl: markerShadow,
        shadowAnchor: [12.5, 38],
        popupAnchor: [0, -32]
      });

      mapMarker = (
        <Marker position={[location.details.latitude ?? 0, location.details.longitude ?? 0]} icon={destinatinoLocationIcon}>
          <Popup className="popup">
            <p className="popupHeadline">{location.name?.split(",")[0]}</p><br />
            <p className="popupText">{location.details.shortName}</p><br />
            <p className="popupText">
              <i>Start</i>
            </p>
            {onItemClicked !== undefined
              ? <p className="selectLocation" onClick={() => onItemClicked(location)}>Select</p>
              : <></>}
          </Popup>
        </Marker>
      );
    } else {

      const locationIcon = new Icon({
        iconUrl: getLocationIcon(location.type),
        iconSize: [25, 41],
        iconAnchor: [12.5, 38],
        shadowUrl: markerShadow,
        shadowAnchor: [12.5, 38],
        popupAnchor: [0, -32]
      });

      mapMarker = (
        <Marker position={[location.details.latitude ?? 0, location.details.longitude ?? 0]} icon={locationIcon}>
          <Popup className="popup">
            <p className="popupHeadline">{location.name?.split(",")[0]}</p><br />
            <p className="popupText">{location.details.shortName}</p><br />
            <p className="popupText">
              <i>{getDesignation(location.type)}</i>
            </p>
            {onItemClicked !== undefined
              ? <p className="selectLocation" onClick={() => onItemClicked(location)}>Auswählen</p>
              : <></>}
          </Popup>
        </Marker>
      );
    }

    return mapMarker;
  };

  return (createMarker());
};

export default MapMarker;
