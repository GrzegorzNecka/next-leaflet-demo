import { wojewodztwa } from '@/data/geojson';
// import { onEachFeature } from '@/utils/geo-json';
import { GeoJSON, useMap, useMapEvents } from 'react-leaflet';
import type L from 'leaflet';
import type { Feature, Geometry } from 'geojson';
import { useRef } from 'react';

function getVoivodeshipName(feature: Feature<Geometry, any>, layer: L.Layer) {
    console.log('layer', layer);
    console.log('layer', feature);

    if (feature.properties && feature.properties.nazwa) {
        layer.bindPopup(feature.properties.nazwa);
    }
}

export const Wojewodztwa = () => {
    const map = useMap();
    console.log('map center:', map.getCenter());

    const wojRef = useRef();

    function onEachFeature(feature: Feature<Geometry, any>, layer: L.Layer) {
        layer.on('mouseover', function (e) {
            getVoivodeshipName(feature, layer);

            layer.setStyle({ fillColor: 'yellow', weight: 2, fillOpacity: 5 });

            // wojRef.current.setStyle({
            //     fillColor: '#eb4034',
            //     weight: 2,
            //     color: '#eb4034',
            //     fillOpacity: 0.7,
            // });
            // console.log(map);
        });
    }

    const mapEvents = useMapEvents({
        click: (e) => {
            console.log('🚀 ~ file: wojewodztwa.tsx:37 ~ Wojewodztwa ~ e', e);
            // console.log('🚀 ~ file: wojewodztwa.tsx:24 ~ wojRef.current;', wojRef.current);
        },
        locationfound: (location) => {
            console.log('location found:', location);
        },
    });

    if (!map) return null;
    return <GeoJSON ref={wojRef} data={wojewodztwa} onEachFeature={onEachFeature} />;
};
