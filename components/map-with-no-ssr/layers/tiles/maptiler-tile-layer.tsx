import { FeatureGroup, LayersControl, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { mapTilerMapStreet } from '@/utils/tile-layer';

/**
 *
 * @maptiler: https://cloud.maptiler.com/maps/
 *
 */

export function MaptilerLayer() {
    return (
        <>
            <LayersControl.Overlay checked name="maptiler composition">
                <FeatureGroup>
                    <TileLayer {...mapTilerMapStreet} />
                </FeatureGroup>
            </LayersControl.Overlay>
        </>
    );
}
