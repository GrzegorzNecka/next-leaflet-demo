import { pointsA } from '@/data/points';
import { createControlComponent, createControlHook, useLeafletContext } from '@react-leaflet/core';
import { Control, ControlOptions } from 'leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import type { RefAttributes } from 'react';
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

export function CustomRawControlLayer_v1() {
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

        const overlayMaps = {
            Cities: cities,
        };

        const layerControl = L.control.layers(baseMaps, overlayMaps);
        layerControl.addTo(context.map);

        return () => {
            isLayers.current = true;
            layerControl.remove;
        };
    }, []);

    /**
     *
     * Extend Control:  https://leafletjs.com/examples/extending/extending-3-controls.html#controls
     *
     */

    useEffect(() => {
        if (isLayers.current === true) {
            return;
        }

        const Watermark = L.Control.extend({
            onAdd: function (map: L.Map) {
                const img = L.DomUtil.create('img');

                img.src = 'next.svg';
                img.style.width = '100px';

                return img;
            },

            onRemove: function (map: L.Map) {
                // Nothing to do here
            },
        });
        //@ts-ignore
        const createWatermark = function (opts) {
            return new Watermark(opts);
        };

        // createWatermark({ position: 'topleft' }).addTo(context.map);

        const watermark = createWatermark({ position: 'topleft' });

        context.map.addControl(watermark);

        return () => {
            isLayers.current = true;
            // context.map.removeControl(watermark);
        };
    }, []);

    /**
     *
     * https://medium.com/trabe/creating-a-react-leaflet-custom-component-using-hooks-5b5b905d5a01
     *
     */

    const title = 'legend';
    const description = 'bla bla bla bla';

    const legendHtmlFor = (title: string, description: string) =>
        [
            '<h1>Galician Unesco world heritage sites</h1>',
            title && `<h3>${title}</h3>`,
            description && `<p>${description}</p>`,
        ].join('\n');

    useEffect(() => {
        const legend = (L.control as any)({ position: 'topleft' });

        legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'legend');
            div.innerHTML = legendHtmlFor(title, description);
            return div;
        };

        // legend.addTo(context.map);

        context.map.addControl(legend);

        return () => legend.remove();
    }, [context.map, title, description]);

    /**
     *
     *  https://react-leaflet.js.org/docs/core-api/#extendcontext
     *
     * - https://react-leaflet.js.org/docs/core-architecture/#higher-level-component-factory
     *
     *  1 createElementObject
     *  2 createControlHook,
     *  3 createControlComponent
     *
     */
    function test() {
        const props: L.ControlOptions = {
            position: 'topleft',
        };
    }

    return null;
}
