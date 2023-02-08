import { FeatureGroup, LayersControl, Marker, Popup, useMap } from 'react-leaflet';

import { pointsB } from '@/data/points';

export function MarkersB() {
    return (
        <>
            <LayersControl.Overlay name="point B">
                <FeatureGroup>
                    {pointsB.map(({ lat, lng, title }, index) => (
                        <Marker key={index} position={[lat, lng]}>
                            <Popup>{title}</Popup>
                        </Marker>
                    ))}
                </FeatureGroup>
            </LayersControl.Overlay>
        </>
    );
}
