import { useMap, useMapEvents } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import { useCallback, useEffect, useState } from 'react';
import { POSITION_CONTROLS } from '@/utils/position-controls';

type DisplayCoordinatesProps = { center: LatLngTuple; zoom: number };

export function DisplayCoordinates({ center, zoom }: DisplayCoordinatesProps) {
    const map = useMap();
    const [position, setPosition] = useState(() => map.getCenter());
    const [mapZoom, setMapZoom] = useState(() => map.getZoom());

    const handleOnClick = useCallback(() => {
        map.setView(center, zoom);
    }, [map]);

    const onMove = useCallback(() => {
        setPosition(map.getCenter());
    }, [map]);

    useEffect(() => {
        map.on('move', onMove);
        return () => {
            map.off('move', onMove);
        };
    }, [map, onMove]);

    const mapEvents = useMapEvents({
        zoomend: () => {
            setMapZoom(map.getZoom());
        },
    });

    if (!map) return null;
    return (
        <div className={POSITION_CONTROLS.topright}>
            <div className="leaflet-control leaflet-bar bg-slate-50 p-2">
                <p>
                    latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
                    <button type="button" className="bg-slate-200 p-2" onClick={handleOnClick}>
                        reset
                    </button>
                </p>
                <p>zoom: {mapZoom}</p>
            </div>
        </div>
    );
}
