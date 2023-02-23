import { useEffect, useRef } from 'react';
import 'leaflet-groupedlayercontrol';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { useLeafletContext } from '@react-leaflet/core';

/**
 *
 * @docs https://github.com/ismyrnow/leaflet-groupedlayercontrol
 *
 *
 */

export function GroupedLayerControl() {
    const context = useLeafletContext();
    const isLayers = useRef(false);

    useEffect(() => {
        if (isLayers.current === true) {
            return;
        }

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

        const groupedOverlays = {
            Landmarks: {
                Motorways: cities,
                Cities: cities,
            },
            'Points of Interest': {
                Restaurants: cities,
            },
        };

        const options = { position: 'topleft', collapsed: false };

        const layerControl = (L.control as any).groupedLayers(baseMaps, groupedOverlays, options);

        // const layerControl = L.control.layers(baseMaps, overlayMaps);
        layerControl.addTo(context.map);

        // Get the control's container element
        const container = layerControl.getContainer();

        // Disable click propagation on the container element
        L.DomEvent.disableClickPropagation(container);

        return () => {
            isLayers.current = true;
            layerControl.remove;
        };
    }, []);

    return null;
}
