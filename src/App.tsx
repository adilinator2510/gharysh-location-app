import React, { useState, useEffect } from 'react';
import MapView from './components/MapView';
import FriendsList from './components/FriendsList';
import { Friend, Position } from './types';
import './styles/App.css';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  const [userPosition, setUserPosition] = useState<Position | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    setFriends([
      { id: '1', name: 'Alice', position: { lat: 51.505, lng: -0.09 }, isOnline: true },
      { id: '2', name: 'Bob', position: { lat: 51.51, lng: -0.1 }, isOnline: false },
    ]);
  }, []);

// src/App.tsx
const toggleSharing = () => {
  if (isSharing) {
    setUserPosition(null); // Stop sharing
  } else {
    // Request location access
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Location access denied. Using default coordinates.");
          setUserPosition({ lat: 51.505, lng: -0.09 }); // Fallback
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }
  setIsSharing(!isSharing);
};

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gharysh Location Sharing</h1>
      </header>
      
      <main className="map-container">
        <MapView userPosition={userPosition} friends={friends} />
      </main>
      
      <div className="controls">
        <button
          onClick={toggleSharing}
          className={`share-button ${isSharing ? 'stop-sharing' : 'start-sharing'}`}
        >
          {isSharing ? 'Stop Sharing' : 'Share My Location'}
        </button>
      </div>
      
      <FriendsList friends={friends} />
    </div>
  );
};

export default App;
