import { LayerGroup, LayersControl, useMap, useMapEvents } from 'react-leaflet';

import { MarkersA } from './layers/markers/a-marker-layer';
import { MarkersB } from './layers/markers/b-marker-layer';
import { OpenStreetLayer } from './layers/tiles/openstreet-tile-layer';
import { WojewodztwaGeojson } from './layers/geojsons/wojewodztwa-geojson-layer';
import { MaptilerLayer } from './layers/tiles/maptiler-tile-layer';
import type { FunctionComponent } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { Control, Layer, Path } from 'leaflet';
import { GroupedLayersV1 } from '../../only-dev-sources/leaflet-core/grouped-layers-v1';

export function LayerControl() {
    // const refLayerGroup = useRef(null)

    const map = useMap();

    // const map = useMapEvents({
    //     overlayadd: (e) => {
    //         console.log(e);
    //         // refLayerGroup.current.(getLayerId)
    //     },
    //     overlayremove: (e) => {
    //         console.log(e);
    //     },
    // });

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
        <LayersControl
            sortFunction={handleSortFunction}
            sortLayers={true}
            position="topleft"
            collapsed={false}>
            <LayersControl.Overlay name="open street map">
                <OpenStreetLayer />
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="maptiler composition">
                <MaptilerLayer />
            </LayersControl.Overlay>

            <LayersControl.Overlay name="wojewodzta">
                <WojewodztwaGeojson map={map} />
            </LayersControl.Overlay>

            {/* <FeatureGroup ref={refMarkers}> */}
            <LayerGroup>
                <LayersControl.Overlay name="marker 1">
                    <LayerGroup>
                        <MarkersA />
                        <MarkersB />
                    </LayerGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="marker 2 ">
                    <MarkersB />
                </LayersControl.Overlay>
            </LayerGroup>

            {/* </FeatureGroup> */}
        </LayersControl>
    );
}
