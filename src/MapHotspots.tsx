import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';

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
  return (
  <MapContainer center={[52.4862, -1.8904] as LatLngExpression} zoom={12} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {hotspots.map((h, idx) => (
        <Marker key={idx} position={[h.lat, h.lng]}>
          <Popup>
            <strong>{h.area}</strong><br />
            {h.count} cases
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
