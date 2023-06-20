import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./LeafletMapContainer.css";

const LeafletMapContainer: React.FC = () => {
    const [center, setCenter] = useState<[number, number]>([51.5743061234828, 7.0272808779967315]);
    const [zoom, setZoom] = useState<number>();

    useEffect(() => {
        setCenter([51.5743061234828, 7.0272808779967315]);
        setZoom(20);
    }, []);

    return zoom && center.length > 0 ? (
        <MapContainer id="map" center={center} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.5743061234828, 7.0272808779967315]}>
                <Popup>
                    Westfälische Hochschule
                </Popup>
            </Marker>
        </MapContainer>
    ) : <div />;
};

export default LeafletMapContainer;
