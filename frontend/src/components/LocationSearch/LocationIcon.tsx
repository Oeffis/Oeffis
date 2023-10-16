import { IonIcon } from "@ionic/react";
import { bus, business, car, compass, help, home, location, pin, shareSocial } from "ionicons/icons";
import { LocationTypeEnum } from "../../api";

// See in vrr_client: LocationType
const ICON_MAP: Record<LocationTypeEnum, { icon: string; text: string }> = {
  "address": { icon: home, text: "Address" },
  "crossing": { icon: location, text: "Crossing" },
  "gis": { icon: compass, text: "Geo Information System" },
  "locality": { icon: business, text: "Locality" },
  "parking": { icon: car, text: "Parking" },
  "platform": { icon: bus, text: "Platform" },
  "poi": { icon: pin, text: "Point of Interest" },
  "poiHierarchy": { icon: pin, text: "Point of Interest" },
  "sharing": { icon: shareSocial, text: "Sharing" },
  "stop": { icon: bus, text: "Stop" },
  "street": { icon: location, text: "Street" },
  "suburb": { icon: business, text: "Suburb" },

  // not present in vrr spec
  "singlehouse": { icon: home, text: "Single House" },
  "unknown": { icon: help, text: "Unknown" }
};

export interface LocationIconProps {
  type: keyof typeof ICON_MAP;
}

export function LocationIcon({ type }: LocationIconProps): JSX.Element {
  const iconInfo = ICON_MAP[type];

  return (
    <>
      <IonIcon
        icon={iconInfo.icon}
        title={iconInfo.text}
        size="small"
      />
    </>
  );
}
