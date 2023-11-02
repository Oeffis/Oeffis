import { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export interface MapControllerProps {
  bounds: LatLngTuple[]
}

const FlyToBoundsController: React.FC<MapControllerProps> = ({ bounds }): JSX.Element => {
  const map = useMap();
  const flyToDuration = 1.5;

  useEffect(() => {
    console.count("FlyToBoundsController");
    map.flyToBounds(bounds, {
      duration: flyToDuration
    });
  }, [bounds]);

  return <></>;
};

export default FlyToBoundsController;
