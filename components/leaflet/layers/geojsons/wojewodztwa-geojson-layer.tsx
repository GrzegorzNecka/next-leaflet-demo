import { FeatureGroup, LayersControl, GeoJSON, Popup, TileLayer, useMap } from 'react-leaflet';
import type { Feature, Geometry } from 'geojson';
import { wojewodztwa } from '@/data/geojson';

import type { Map } from 'leaflet';

function bindPopupWithGeoJsonProperty(feature: Feature<Geometry, any>, layer: L.Layer) {
    if (feature.properties && feature.properties.nazwa) {
        layer.bindPopup(`województwo: ${feature.properties.nazwa}`);
        layer.off;
    }
}

type WojewodztwaGeojsonProps = { map: Map };

export function WojewodztwaGeojson({ map }: WojewodztwaGeojsonProps) {
    function onEachFeature(feature: Feature<Geometry, any>, layer: L.Path) {
        // layer.setStyle({ fillColor: 'white', color: 'rgb(37 99 235)', weight: 2, fillOpacity: 0 });
        // layer.on('click', function (e) {
        //     pointerState.addPosition(e.latlng);
        // });
        layer.on('mousemove', function (e) {
            if (map.getZoom() >= 9) {
                bindPopupWithGeoJsonProperty(feature, layer);
                layer.setStyle({ fillOpacity: 0 });
            }
        });
        layer.on('mouseover', function (e) {
            if (map.getZoom() < 9) {
                bindPopupWithGeoJsonProperty(feature, layer);
                layer.setStyle({ fillColor: 'rgb(147 197 253)', fillOpacity: 0.1 });
            }
        });
        layer.on('mouseout', function (e) {
            bindPopupWithGeoJsonProperty(feature, layer);
            layer.setStyle({ fillColor: 'rgb(147 197 253)', fillOpacity: 0 });
        });
    }

    return (
        <>
            <FeatureGroup>
                <GeoJSON data={wojewodztwa} />;
                {/* <GeoJSON data={wojewodztwa} onEachFeature={onEachFeature} />; */}
            </FeatureGroup>
        </>
    );
}
