import { FeatureGroup, LayersControl, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { stamenTonerLite, mapTilerMapStreet } from '@/utils/tile-layer';

/**
 *
 * @mstanem: http://maps.stamen.com/
 *
 */

export function StanemLayer() {
    return (
        <>
            <LayersControl.Overlay checked name="stanem map composition">
                <FeatureGroup>
                    <TileLayer {...stamenTonerLite} />
                </FeatureGroup>
            </LayersControl.Overlay>
        </>
    );
}
