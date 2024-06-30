import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './index.css'
import DesktopHeader from "../Common/Header/Desktop";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const MapPage = () => {
    const location = useLocation();
    const { shops } = location.state || { shops: [] };
    const [markers, setMarkers] = useState(shops.map(shop => ({
        ...shop,
        position: [shop.location.latitude, shop.location.longitude]
    })));

    const updateMarkerPosition = (index, newPosition) => {
        const updatedMarkers = markers.map((marker, i) => 
            i === index ? { ...marker, position: newPosition } : marker
        );
        setMarkers(updatedMarkers);
    };

    return (
        <div className="Explore_main_container">
            <div className="Explore_header_container">
                <DesktopHeader />
            </div>
            <div className="Map_container">
                <MapContainer
                    center={[shops[0]?.location.latitude || 0, shops[0]?.location.longitude || 0]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    className="Leaflet_map"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.position}
                            draggable={true}
                            eventHandlers={{
                                dragend: (event) => {
                                    const newPosition = event.target.getLatLng();
                                    updateMarkerPosition(index, [newPosition.lat, newPosition.lng]);
                                }
                            }}
                        >
                            <Popup>
                                <div>
                                    <h2>{marker.name}</h2>
                                    <p>{marker.description}</p>
                                    <p>Rating: {marker.rating} ({marker.rating_number} reviews)</p>
                                    <a
                                        href={`https://www.google.com/maps/?q=${marker.position[0]},${marker.position[1]}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View on Google Maps
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <div className="Shops_container">

            </div>
        </div>
    );
}

export default MapPage;
