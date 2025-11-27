import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import './MapHotspots.css';

interface Hotspot {
  lat: number;
  lng: number;
  count: number;
  area: string;
}

interface MapHotspotsProps {
  hotspots: Hotspot[];
}

export default function MapHotspots({ hotspots }: MapHotspotsProps) {
  const pulsatingIcon = L.divIcon({
    className: 'pulsating-dot',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  return (
  <MapContainer center={[51.3413, 0.7312] as LatLngExpression} zoom={12} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {hotspots.map((h, idx) => (
        <Marker key={idx} position={[h.lat, h.lng]} icon={pulsatingIcon}>
          <Popup>
            <strong>{h.area}</strong><br />
            {h.count} high risk cases
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
