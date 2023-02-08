import { FeatureGroup, LayersControl, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { openStreetMap } from '@/utils/tile-layer';

export function OpenStreetLayer() {
    return (
        <>
            <LayersControl.Overlay name="open street map">
                <FeatureGroup>
                    <TileLayer {...openStreetMap} />
                </FeatureGroup>
            </LayersControl.Overlay>
        </>
    );
}
