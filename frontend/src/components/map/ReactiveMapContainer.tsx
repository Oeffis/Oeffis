import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { CSSProperties, PropsWithChildren, useEffect, useRef } from "react";
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

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const view = props.view;
    if (isCenterZoomView(view)) {
      map.setView(view.center, view.zoom);
    } else {
      map.fitBounds(view.bounds);
    }

    setTimeout(() => map.invalidateSize(), 0);
  }, [mapRef.current]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const view = props.view;
    if (isCenterZoomView(view)) {
      //setTimeout(() => map.flyTo(view.center, view.zoom, { animate: true, duration: 0.5 }), 250);
      map.flyTo(view.center, view.zoom, { animate: true, duration: 0.5 });
    } else {
      map.flyToBounds(view.bounds);
    }
  }, [props.view]);

  return (
    <MapContainer
      style={props.style}
      ref={mapRef}
      maxZoom={15}
    >
      {props.children}
    </MapContainer>
  );
};

export default ReactiveMapContainer;
