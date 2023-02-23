import type { ControlPosition } from 'leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet.control.layers.tree';
import L from 'leaflet';
import { useLeafletContext } from '@react-leaflet/core';

/**
 *
 * @docs https://github.com/jjimenezshaw/Leaflet.Control.Layers.Tree
 *
 */

type ControlLayersTreeProps = {
    position: ControlPosition;
};

/**
 *
 * layers
 *
 */

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
});
const thunderAttr = { attribution: '© OpenStreetMap contributors. Tiles courtesy of Andy Allan' };
const transport = L.tileLayer(
    '//{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
    thunderAttr,
);

const maptitler = L.tileLayer(
    'https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=WkCD73XaamNJAsOYL0Y4',
    {
        maxZoom: 19,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    },
);

// points

const pointsA = [
    { lat: 52.230020586193795, lng: 21.01083755493164, title: 'point A1' },
    { lat: 52.22924516170657, lng: 21.011320352554325, title: 'point A2' },
    { lat: 52.229511304688444, lng: 21.01270973682404, title: 'point A3' },
    { lat: 52.23040500771883, lng: 21.012146472930908, title: 'point A4' },
];
const pointsB = [
    { lat: 52.229314161892106, lng: 21.012055277824405, title: 'point B1' },
    { lat: 52.22950144756943, lng: 21.01193726062775, title: 'point B2' },
    { lat: 52.22966573260081, lng: 21.011829972267154, title: 'point B3' },
    { lat: 52.2298333027065, lng: 21.011744141578678, title: 'point B4' },
    { lat: 52.2299680154701, lng: 21.01164758205414, title: 'point B5' },
    { lat: 52.23012572745442, lng: 21.011583209037784, title: 'point B6' },
    { lat: 52.230276867580336, lng: 21.01143836975098, title: 'point B7' },
    { lat: 52.23046414919644, lng: 21.011341810226444, title: 'point B8' },
];

/**
 *
 * helpers
 *
 */

type Marker = {
    lat: number;
    lng: number;
    title: string;
};

const createMarkerGroup = (marker: Marker[]) => {
    const createLayers = pointsA.map((marker) => {
        return L.marker([marker.lat, marker.lng]).bindPopup(marker.title);
    });

    return L.layerGroup([...createLayers]);
};

/**
 *
 * component
 *
 */

export function ControlLayersTree({ position }: ControlLayersTreeProps) {
    const context = useLeafletContext();
    const isLayers = useRef(false);

    useEffect(() => {
        if (isLayers.current === true) {
            return;
        }

        const options = {
            position,
            collapsed: false,
            closedSymbol: '<span>+</span',
            openedSymbol: '<span style="color:blue">-</span>',
            spaceSymbol: ' ',
            selectorBack: true,
            namedToggle: true,
            // collapseAll: 'Collapse all',
            // expandAll: 'Expand all',
            labelIsSelector: 'both',
        };

        const baseTree = {
            label: '<span style="color:red;" >WARSTWY PODKŁADOWE</span>',
            noShow: true,
            children: [
                {
                    label: '<span style="color:red;">Open Street Map</span>',
                    layer: osm,
                },
                { label: '<span style="color:red;">Transport</span>', layer: transport },
            ],
        };

        const overlayTree = {
            label: '<span style="color:red;">punkty</span>',
            selectAllCheckbox: true,
            noShow: true,

            children: [
                baseTree,
                {
                    label: 'PUNKTY 1',
                    // selectAllCheckbox: true,
                    children: [
                        {
                            label: '<span id="w-2">warszawa punkty 1 </span>',
                            layer: createMarkerGroup(pointsA),
                        },
                        {
                            label: '<span id="w-1">warszawa punkty 2</span>',
                            layer: createMarkerGroup(pointsB),
                        },
                    ],
                },
                {
                    label: 'PUNKTY 2',
                    // selectAllCheckbox: true,
                    children: [
                        {
                            label: '<span id="w-2">warszawa punkty 1 </span>',
                            layer: createMarkerGroup(pointsA),
                        },
                        {
                            label: '<span id="w-1">warszawa punkty 2</span>',
                            layer: createMarkerGroup(pointsB),
                        },
                    ],
                },
            ],
        };

        const layerControl = L.control.layers
            .tree(undefined, undefined, options)
            .addTo(context.map);

        // layerControl.setBaseTree(baseTree).collapseTree(true).expandSelected(true);
        layerControl.setOverlayTree(overlayTree).collapseTree(true).expandSelected(true);
        // layerControl.collapseTree(true);
        // layerControl.expandTree(false);

        return () => {
            isLayers.current = true;
            layerControl.remove;
        };
    }, []);

    return null;
}
