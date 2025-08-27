export async function addElevationToGeoJSON(geojson) {
  const coords = [];

  // Get all coordinates (only Point and LineString)
  if (geojson.type === "FeatureCollection") {
    geojson.features.forEach((f) => {
      if (f.geometry.type === "Point") {
        coords.push(f.geometry.coordinates);
      } else if (f.geometry.type === "LineString") {
        coords.push(...f.geometry.coordinates);
      }
    });
  }

  // Build batch request to Open-Elevation
  const locations = coords.map((c) => `${c[1]},${c[0]}`).join("|");
  const url = `https://api.open-elevation.com/api/v1/lookup?locations=${locations}`;

  const response = await fetch(url);
  const data = await response.json();

  const elevations = data.results.map((r) => r.elevation);

  // Add elevations in geojson
  let idx = 0;
  geojson.features.forEach((f) => {
    if (f.geometry.type === "Point") {
      const [lon, lat] = f.geometry.coordinates;
      f.geometry.coordinates = [lon, lat, elevations[idx++]];
    } else if (f.geometry.type === "LineString") {
      f.geometry.coordinates = f.geometry.coordinates.map(([lon, lat]) => {
        return [lon, lat, elevations[idx++]];
      });
    }
  });

  return geojson;
}


export function getEndElevation(geojson){
  for (const f of geojson.features) {   
    if (f.geometry.type === "Point" && f.properties?.name === "end") {
      const [, , ele] = f.geometry.coordinates;
      return ele;
    }
  }
  return null;
}


export function getStartElevation(geojson){
  for (const f of geojson.features) {   
    if (f.geometry.type === "Point" && f.properties?.name === "start") {
      const [, , ele] = f.geometry.coordinates;
      return ele;
    }
  }
  return null;
}