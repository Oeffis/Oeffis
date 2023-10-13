import { IonIcon } from "@ionic/react";
import { bus, business, car, compass, help, home, location, pin, shareSocial } from "ionicons/icons";

// See in vrr_client: LocationType
const ICON_MAP = {
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
  "singlehouse": { icon: home, text: "Single House" }
};

export interface LocationIconProps {
  type: keyof typeof ICON_MAP;
}

export function LocationIcon({ type }: LocationIconProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const iconInfo = ICON_MAP[type] || { icon: help, text: "Unknown" };

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
