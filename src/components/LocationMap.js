'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function LocationMap({ lat, lng, address, height = 200 }) {
  const position = [lat, lng];
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div style={{ borderRadius: 12, overflow: 'hidden', border: '1.5px solid rgba(45,106,79,0.11)' }}>
        <MapContainer
          center={position}
          zoom={15}
          style={{ height, width: '100%' }}
          scrollWheelZoom={false}
          dragging={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            {address && <Popup>{address}</Popup>}
          </Marker>
        </MapContainer>
      </div>
      {address && (
        <p style={{
          margin: '8px 0 0', fontSize: 12, color: '#1c1c1e',
          lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 6,
        }}>
          <span style={{ flexShrink: 0 }}>📍</span>
          <span>{address}</span>
        </p>
      )}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          marginTop: 10, padding: '9px 16px',
          background: 'linear-gradient(135deg, #2d6a4f, #0d2b1f)',
          color: 'white', fontSize: 12, fontWeight: 600,
          borderRadius: 10, textDecoration: 'none',
          transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '0 3px 12px rgba(45,106,79,0.28)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        Open in Google Maps
      </a>
    </div>
  );
}
