import { LatLngBoundsLiteral } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export type MapControllerProps = {
  bounds: LatLngBoundsLiteral
};

const MapController = (props: MapControllerProps): JSX.Element => {
  const map = useMap();
  const flyToDuration = 1.5;

  /* const flyTo = (): void => {
    map.flyTo(props.center, 15, {
      animate: true,
      duration: flyToDuration
    });
  }; */

  /* const flyToCenter = (): void => {
    map.flyTo([59.914, 10.734], 13, {
      animate: true,
      duration: flyToDuration
    });
  }; */

  useEffect(() => {

    /* if (props) {
      flyTo();
    } else {
      flyToCenter();
    } */

    if (props) {
      map.flyToBounds(props.bounds, {
        duration: flyToDuration
      });

    }

  }, [props]);

  return <></>;
};

export { MapController };

