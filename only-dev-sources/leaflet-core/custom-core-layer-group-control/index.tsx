import { FeatureGroup } from 'react-leaflet';

import { CustomLayersControl } from './custom-layer-control';
import { OpenStreetLayer } from '@/components/leaflet/layers/tiles/openstreet-tile-layer';
import { MaptilerLayer } from '@/components/leaflet/layers/tiles/maptiler-tile-layer';

import { useEffect } from 'react';
import L from 'leaflet';

export default function CustomGroupControlLayer_v2() {
    return (
        <CustomLayersControl sortLayers={true} position="topleft" collapsed={false}>
            {/* {addLayerToControl(layer, 'OpenStreetMap')} */}

            <CustomLayersControl.Group checked name="grouped layer" group="test-group">
                <MaptilerLayer />
            </CustomLayersControl.Group>
        </CustomLayersControl>
    );
}
