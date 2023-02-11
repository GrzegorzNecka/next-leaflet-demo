import { LayersControl, useMap } from 'react-leaflet';

import { MarkersA } from './layers/markers/a-marker-layer';
import { MarkersB } from './layers/markers/b-marker-layer';
import { OpenStreetLayer } from './layers/tiles/openstreet-tile-layer';
import { WojewodztwaGeojson } from './layers/geojsons/wojewodztwa-geojson-layer';
import { MaptilerLayer } from './layers/tiles/maptiler-tile-layer';

export function LayerControl() {
    const map = useMap();

    if (!map) return null;
    return (
        <>
            <LayersControl position="topleft" collapsed={false}>
                <MaptilerLayer />
                <OpenStreetLayer />
                <WojewodztwaGeojson map={map} />
                <MarkersA />
                <MarkersB />
            </LayersControl>
        </>
    );
}
