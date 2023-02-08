import { FeatureGroup, LayersControl, Marker, Popup, useMap } from 'react-leaflet';

import { pointsA } from '@/data/points';

export function MarkersA() {
    return (
        <>
            <LayersControl.Overlay name="point A">
                <FeatureGroup>
                    {pointsA.map(({ lat, lng, title }, index) => (
                        <Marker key={index} position={[lat, lng]}>
                            <Popup>{title}</Popup>
                        </Marker>
                    ))}
                </FeatureGroup>
            </LayersControl.Overlay>
        </>
    );
}
