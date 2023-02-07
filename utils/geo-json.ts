import type { Feature, Geometry } from 'geojson';

export function onEachFeature(feature: Feature<Geometry, any>, layer: L.Layer) {
    layer.bindPopup(feature.properties.nazwa);
}
