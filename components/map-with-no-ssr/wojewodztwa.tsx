import { wojewodztwa } from '@/data/geojson';
import { GeoJSON, useMap, useMapEvents } from 'react-leaflet';
import type L from 'leaflet';
import type { Feature, Geometry } from 'geojson';
import { usePointerState } from '@/context/pointer-context';

function bindPopupWithGeoJsonProperty(feature: Feature<Geometry, any>, layer: L.Layer) {
    if (feature.properties && feature.properties.nazwa) {
        layer.bindPopup(`województwo: ${feature.properties.nazwa}`);
    }
}

export const Wojewodztwa = () => {
    const pointerState = usePointerState();
    const map = useMap();

    function onEachFeature(feature: Feature<Geometry, any>, layer: L.Path) {
        layer.setStyle({ fillColor: 'black', color: 'red', weight: 2, fillOpacity: 0.1 });

        layer.on('click', function (e) {
            pointerState.addPosition(e.latlng);
        });

        layer.on('mouseover', function (e) {
            bindPopupWithGeoJsonProperty(feature, layer);

            layer.setStyle({ fillColor: 'red', fillOpacity: 0.2 });
        });
        layer.on('mouseout', function (e) {
            bindPopupWithGeoJsonProperty(feature, layer);

            layer.setStyle({ fillColor: 'black', fillOpacity: 0.1 });
        });
    }

    if (!map) return null;
    return <GeoJSON data={wojewodztwa} onEachFeature={onEachFeature} />;
};
