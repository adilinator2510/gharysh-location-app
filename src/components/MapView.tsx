import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Friend, Position } from '../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapViewProps {
  userPosition: Position | null;
  friends: Friend[];
}

const MapView: React.FC<MapViewProps> = ({ userPosition, friends }) => {
  const defaultCenter = { lat: 51.505, lng: -0.09 };
  
  return (
    <MapContainer
      center={userPosition || defaultCenter}
      zoom={13}
      className="map-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {userPosition && (
        <Marker position={userPosition} icon={defaultIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      )}
      
      {friends.filter(f => f.isOnline).map(friend => (
        <Marker key={friend.id} position={friend.position} icon={defaultIcon}>
          <Popup>{friend.name}'s Location</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};


export default MapView;
