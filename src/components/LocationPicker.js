'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon (leaflet assets don't bundle correctly in Next.js)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const DEFAULT_CENTER = [24.7136, 46.6753]; // Riyadh, adjust as needed

function DraggableMarker({ position, onPositionChange }) {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker) {
        const { lat, lng } = marker.getLatLng();
        onPositionChange({ lat, lng });
      }
    },
  }), [onPositionChange]);

  useMapEvents({
    click(e) {
      onPositionChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}

export default function LocationPicker({ onLocationChange }) {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [locating, setLocating] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const mapRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const resultsRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-detect location on mount — but don't prompt, just use default
  useEffect(() => {
    setPosition(DEFAULT_CENTER);
  }, []);

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      const addr = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      setAddress(addr);
      onLocationChange({ lat, lng, address: addr });
    } catch {
      const addr = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      setAddress(addr);
      onLocationChange({ lat, lng, address: addr });
    }
  };

  const handlePositionChange = useCallback(({ lat, lng }) => {
    setPosition([lat, lng]);
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], mapRef.current.getZoom());
    }
    reverseGeocode(lat, lng);
  }, []);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition([loc.lat, loc.lng]);
        if (mapRef.current) {
          mapRef.current.flyTo([loc.lat, loc.lng], 16);
        }
        reverseGeocode(loc.lat, loc.lng);
        setLocating(false);
      },
      () => {
        setLocating(false);
        alert('Could not detect your location. Please allow location access or search manually.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (query.trim().length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        setSearchResults(data);
        setShowResults(data.length > 0);
      } catch {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);
  };

  const handleSelectResult = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setPosition([lat, lng]);
    setSearchQuery(result.display_name);
    setAddress(result.display_name);
    setShowResults(false);
    setSearchResults([]);
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], 16);
    }
    onLocationChange({ lat, lng, address: result.display_name });
  };

  if (!position) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: 400, background: '#f0faf4', borderRadius: 16,
        border: '1.5px solid rgba(45,106,79,0.11)',
        fontSize: 14, color: '#6b7280', gap: 8,
      }}>
        Loading map...
      </div>
    );
  }

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />

      {/* Search box + Use My Location button */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'stretch' }}>
        <div style={{ flex: 1, position: 'relative' }} ref={resultsRef}>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
              color: '#6b7280', pointerEvents: 'none', display: 'flex',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInput}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
              placeholder="Search for an address..."
              style={{
                width: '100%', padding: '12px 16px 12px 38px',
                border: '1.5px solid rgba(45,106,79,0.11)', borderRadius: 12,
                fontFamily: "'Outfit', sans-serif", fontSize: 14,
                color: '#1c1c1e', background: '#faf8f3', outline: 'none',
                boxSizing: 'border-box', transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            {searching && (
              <span style={{
                position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)',
                width: 16, height: 16, border: '2px solid rgba(45,106,79,0.2)',
                borderTopColor: '#2d6a4f', borderRadius: '50%',
                animation: 'cospin 0.7s linear infinite', display: 'inline-block',
              }} />
            )}
          </div>

          {/* Search results dropdown */}
          {showResults && searchResults.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000,
              marginTop: 4, background: 'white', borderRadius: 12,
              border: '1.5px solid rgba(45,106,79,0.11)',
              boxShadow: '0 12px 32px rgba(13,43,31,0.12)',
              overflow: 'hidden',
            }}>
              {searchResults.map((result, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectResult(result)}
                  style={{
                    padding: '12px 16px', cursor: 'pointer',
                    fontSize: 13, color: '#1c1c1e', lineHeight: 1.45,
                    borderBottom: i < searchResults.length - 1 ? '1px solid rgba(45,106,79,0.08)' : 'none',
                    transition: 'background 0.15s',
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f0faf4'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  <span style={{ color: '#2d6a4f', marginTop: 2, flexShrink: 0 }}>📍</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{result.display_name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Use My Location button */}
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={locating}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0 18px', whiteSpace: 'nowrap',
            background: locating ? '#e2e8f0' : 'linear-gradient(135deg, #2d6a4f, #0d2b1f)',
            color: locating ? '#6b7280' : 'white',
            border: 'none', borderRadius: 12, cursor: locating ? 'not-allowed' : 'pointer',
            fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
            transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: locating ? 'none' : '0 3px 12px rgba(45,106,79,0.28)',
          }}
        >
          {locating ? (
            <>
              <span style={{
                width: 14, height: 14, border: '2px solid rgba(107,114,128,0.3)',
                borderTopColor: '#6b7280', borderRadius: '50%',
                animation: 'cospin 0.7s linear infinite', display: 'inline-block',
              }} />
              Detecting...
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
              </svg>
              Use My Location
            </>
          )}
        </button>
      </div>

      {/* Map */}
      <div style={{ borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(45,106,79,0.11)' }}>
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: 400, width: '100%' }}
          ref={mapRef}
          whenReady={() => setMapReady(true)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapReady && (
            <DraggableMarker
              position={position}
              onPositionChange={handlePositionChange}
            />
          )}
        </MapContainer>
      </div>

      {/* Address display */}
      {address && (
        <div style={{
          marginTop: 10, padding: '10px 14px',
          background: '#f0faf4', borderRadius: 10,
          border: '1px solid rgba(45,106,79,0.11)',
          fontSize: 12, color: '#1c1c1e', lineHeight: 1.5,
          display: 'flex', alignItems: 'flex-start', gap: 8,
        }}>
          <span style={{ color: '#2d6a4f', fontSize: 14, marginTop: 1, flexShrink: 0 }}>📍</span>
          <span>{address}</span>
        </div>
      )}
      <p style={{ margin: '8px 0 0', fontSize: 11, color: '#6b7280' }}>
        Search an address, use your GPS location, or drag the pin / click the map.
      </p>
    </div>
  );
}
