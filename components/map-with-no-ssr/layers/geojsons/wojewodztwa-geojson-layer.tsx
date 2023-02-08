import { FeatureGroup, LayersControl, GeoJSON, Popup, TileLayer, useMap } from 'react-leaflet';
import type { Feature, Geometry } from 'geojson';
import { wojewodztwa } from '@/data/geojson';
import { usePointerState } from '@/context/pointer-context';
import type { Map } from 'leaflet';

function bindPopupWithGeoJsonProperty(feature: Feature<Geometry, any>, layer: L.Layer) {
    if (feature.properties && feature.properties.nazwa) {
        // layer.bindPopup(`województwo: ${feature.properties.nazwa}`);
        // layer.off;
    }
}

type WojewodztwaGeojsonProps = { map: Map };

export function WojewodztwaGeojson({ map }: WojewodztwaGeojsonProps) {
    const pointerState = usePointerState();

    function onEachFeature(feature: Feature<Geometry, any>, layer: L.Path) {
        layer.setStyle({ fillColor: 'black', color: 'red', weight: 2, fillOpacity: 0.1 });

        layer.on('click', function (e) {
            pointerState.addPosition(e.latlng);
        });

        layer.on('mousemove', function (e) {
            if (map.getZoom() >= 9) {
                bindPopupWithGeoJsonProperty(feature, layer);
                layer.setStyle({ fillColor: 'black', color: 'red', weight: 2, fillOpacity: 0.1 });
            }
        });

        layer.on('mouseover', function (e) {
            if (map.getZoom() < 9) {
                bindPopupWithGeoJsonProperty(feature, layer);
                layer.setStyle({ fillColor: 'red', fillOpacity: 0.2 });
            }
        });
        layer.on('mouseout', function (e) {
            bindPopupWithGeoJsonProperty(feature, layer);

            layer.setStyle({ fillColor: 'black', fillOpacity: 0.1 });
        });
    }

    return (
        <>
            <LayersControl.Overlay name="wojewodzta">
                <FeatureGroup>
                    <GeoJSON data={wojewodztwa} onEachFeature={onEachFeature} />;
                </FeatureGroup>
            </LayersControl.Overlay>
        </>
    );
}
