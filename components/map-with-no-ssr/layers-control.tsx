import type { ControlledLayerProps, LayersControlProps } from 'react-leaflet';
import { LayerGroup, LayersControl, useMap } from 'react-leaflet';

import { MarkersA } from './layers/markers/a-marker-layer';
import { MarkersB } from './layers/markers/b-marker-layer';
import { OpenStreetLayer } from './layers/tiles/openstreet-tile-layer';
import { WojewodztwaGeojson } from './layers/geojsons/wojewodztwa-geojson-layer';
import { MaptilerLayer } from './layers/tiles/maptiler-tile-layer';
import type { FunctionComponent } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { Control, Layer } from 'leaflet';

export function LayerControl() {
    const map = useMap();

    // const [section, setSection] = useState<HTMLDivElement | null>(null);

    // const containerRef = useRef(null);

    // useEffect(() => {
    //     if (containerRef.current !== null) {
    //         const sectionRef = containerRef.current['_section'];
    //         setSection(sectionRef);

    //         if (section) {
    //             const labels = section.querySelectorAll('.leaflet-control-layers-overlays label');

    //             section.prepend('title:');

    //             if (labels) {
    //                 Array.from(labels).forEach((item) => {
    //                     item.append('@#$%--');
    //                 });
    //             }
    //         }
    //     }
    // }, [containerRef, section]);

    if (!map) return null;

    function handleSortFunction(e: Layer): number {
        // console.log('🚀 ~ file: layers-control.tsx:43 ~ handleSortFunction ~ e', e);

        // throw new Error('Function not implemented.');

        return 2;
    }

    return (
        <>
            <LayersControl
                sortFunction={handleSortFunction}
                // ref={containerRef}
                sortLayers={true}
                position="topleft"
                collapsed={false}>
                <LayersControl.Overlay name="Marker with popup">
                    <MaptilerLayer />
                    <OpenStreetLayer />
                    <WojewodztwaGeojson map={map} />

                    <MarkersA />
                    <MarkersB />
                </LayersControl.Overlay>
            </LayersControl>
        </>
    );
}
