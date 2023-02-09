import { LayersControl, useMap } from 'react-leaflet';

import { MarkersA } from './markers/a-marker-layer';
import { MarkersB } from './markers/b-marker-layer';
import { OpenStreetLayer } from './tiles/openstreet-tile-layer';
import { WojewodztwaGeojson } from './geojsons/wojewodztwa-geojson-layer';
import { MaptilerLayer } from './tiles/maptiler-tile-layer';
import { StanemLayer } from './tiles/stanem-tile-layer';

// const ControllingGroup = () => {
//     const map = useMapEvent('overlayadd', (e) => {
//         const bounds = new L.LatLngBounds([]);

//         map.eachLayer(function (layer) {
//             if (layer instanceof L.FeatureGroup) {
//                 bounds.extend(layer.getBounds());
//             }
//         });

//         if (bounds.isValid()) {
//             map.flyToBounds(bounds);
//         }
//     });

//     return null;
// };

export function LayerControl() {
    const map = useMap();

    if (!map) return null;
    return (
        <>
            <LayersControl position="topleft" collapsed={false}>
                <MaptilerLayer />
                <OpenStreetLayer />
                {/* <StanemLayer /> */}
                <WojewodztwaGeojson map={map} />
                <MarkersA />
                <MarkersB />
            </LayersControl>
            {/* <ControllingGroup /> */}
        </>
    );
}
