import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";
import "./LeafletMapContainer.css";

export interface CenterZoomView {
  center: LatLngTuple,
  zoom: number
}

export interface BoundsView {
  bounds: LatLngTuple[]
}

function isCenterZoomView(view: View): view is CenterZoomView {
  return Object.hasOwnProperty.call(view, "center") && Object.hasOwnProperty.call(view, "zoom");
}

export type View = CenterZoomView | BoundsView;

interface ReactiveContainerProps {
  view: View;
  style?: CSSProperties;
}

const ReactiveMapContainer: React.FC<PropsWithChildren<ReactiveContainerProps>> = (props) => {
  const mapRef = useRef<L.Map>(null);
  const [isFirstView, setIsFirstView] = useState(true);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    applyView(map, props.view);
  }, [mapRef.current]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    applyView(map, props.view);
  }, [props.view]);

  const applyView = (map: L.Map, view: View): void => {
    if (isFirstView) {
      setIsFirstView(false);
      if (isCenterZoomView(view)) {
        map.setView(view.center, view.zoom);
        return;
      }
      map.fitBounds(view.bounds);
      return;
    }

    if (isCenterZoomView(view)) {
      map.flyTo(view.center, view.zoom);
    } else {
      map.flyToBounds(view.bounds);
    }
  };

  return (<MapContainer
    style={props.style}
    ref={mapRef}
    maxZoom={15}>
    {props.children}
  </MapContainer>);
};

export default ReactiveMapContainer;
