import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const GeoJsonLayer = ({ data }: { data: any }) => {
  const map = useMap();

  useEffect(() => {
    const layer = L.geoJSON(data);
    map.fitBounds(layer.getBounds()); // recadre la carte automatiquement
  }, [data, map]);

  return (
    <GeoJSON
      data={data}
      style={(feature) =>
        feature.geometry.type === 'LineString'
          ? { color: 'blue', weight: 4 }
          : undefined
      }
      pointToLayer={(feature, latlng) => {
        return L.marker(latlng).bindPopup(feature.properties.name || 'Point');
      }}
    />
  );
};

interface Props {
  geojsonFile: string | undefined;
}

const MapWithGeoJson = ({geojsonFile}:Props) => {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/uploads/${geojsonFile}`)
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }} keyboard={true}>
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData && <GeoJsonLayer data={geoData} />}
    </MapContainer>
  );
};

export default MapWithGeoJson;
