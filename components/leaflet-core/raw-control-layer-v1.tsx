import { pointsA } from '@/data/points';
import { useLeafletContext } from '@react-leaflet/core';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

let ignore = false;
export function ControlledLayerV2() {
    const context = useLeafletContext();

    useEffect(() => {
        if (!ignore) {
            // points

            const littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.');
            const denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.');
            const aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.');
            const golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

            const cities = L.layerGroup([littleton, denver, aurora, golden]);
            // tiles
            const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap',
            });

            // layers
            const baseMaps = {
                OpenStreetMap: osm,
            };

            const overlayMaps = {
                Cities: cities,
            };

            const layerControl = L.control.layers(baseMaps, overlayMaps);
            layerControl.addTo(context.map);
        }
        return () => {
            ignore = true;
        };
    });

    return null;
}
