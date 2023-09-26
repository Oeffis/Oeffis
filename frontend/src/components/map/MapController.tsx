import { LatLngBoundsLiteral } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export type MapControllerProps = {
  bounds: LatLngBoundsLiteral
};

const MapController = (props: MapControllerProps): JSX.Element => {

  const map = useMap();
  const flyToDuration = 1.5;

  useEffect(() => {

    if (props) {
      map.flyToBounds(props.bounds, {
        duration: flyToDuration
      });
    }

  }, [props]);

  return <></>;
};

export default MapController;

