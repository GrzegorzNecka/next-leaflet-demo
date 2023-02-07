import { wojewodztwa } from '@/data/geojson';
import { GeoJSON, useMap, useMapEvents } from 'react-leaflet';
import type L from 'leaflet';
import type { Feature, Geometry } from 'geojson';

function bindPopupWithGeoJsonProperty(feature: Feature<Geometry, any>, layer: L.Layer) {
    if (feature.properties && feature.properties.nazwa) {
        layer.bindPopup(`województwo: ${feature.properties.nazwa}`);
    }
}

export const Wojewodztwa = () => {
    const map = useMap();
    console.log('map center:', map.getCenter());

    function onEachFeature(feature: Feature<Geometry, any>, layer: L.Path) {
        layer.setStyle({ fillColor: 'black', color: 'red', weight: 2, fillOpacity: 0.1 });

        layer.on('mouseover', function (e) {
            bindPopupWithGeoJsonProperty(feature, layer);

            layer.setStyle({ fillColor: 'red', fillOpacity: 0.2 });
        });
        layer.on('mouseout', function (e) {
            bindPopupWithGeoJsonProperty(feature, layer);

            layer.setStyle({ fillColor: 'black', fillOpacity: 0.1 });
        });
    }

    // const mapEvents = useMapEvents({
    //     click: (e) => {
    //         console.log('🚀 ~ file: wojewodztwa.tsx:37 ~ Wojewodztwa ~ e', e);
    //     },
    //     locationfound: (location) => {
    //         console.log('location found:', location);
    //     },
    // });

    if (!map) return null;
    return <GeoJSON data={wojewodztwa} onEachFeature={onEachFeature} />;
};
