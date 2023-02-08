import { useMap, useMapEvents } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import { useCallback, useEffect, useState } from 'react';
import { POSITION_CONTROLS } from '@/utils/position-controls';
import { usePointerState } from '@/context/pointer-context';

type DisplayCoordinatesProps = { center: LatLngTuple; zoom: number };

export function DisplayCoordinates({ center, zoom }: DisplayCoordinatesProps) {
    const pointerState = usePointerState();
    const map = useMap();
    const [position, setPosition] = useState(() => map.getCenter());
    const [mapZoom, setMapZoom] = useState(() => map.getZoom());

    //  Calculations

    const handleSetView = useCallback(() => {
        map.setView(center, zoom);
    }, [map, center, zoom]);

    const handleSetZoom = useCallback(() => {
        map.setZoom(zoom);
    }, [map, zoom]);

    const onMove = useCallback(() => {
        setPosition(map.getCenter());
    }, [map]);

    //  Effects

    useEffect(() => {
        map.on('move', onMove);
        return () => {
            map.off('move', onMove);
        };
    }, [map, onMove]);

    //  Events

    const mapEvents = useMapEvents({
        zoomend: () => {
            setMapZoom(map.getZoom());
        },
        click: (e) => {
            pointerState.addPosition(e.latlng);
        },
    });

    if (!map) return null;
    return (
        <div className={POSITION_CONTROLS.topright}>
            <div className="leaflet-control leaflet-bar bg-slate-50  ml-4  p-2">
                <p>
                    latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
                    <button type="button" className="bg-slate-200 p-2" onClick={handleSetView}>
                        reset
                    </button>
                </p>
                <p className="pt-4">
                    zoom: {mapZoom}
                    <button type="button" className="bg-slate-200 ml-4 p-2" onClick={handleSetZoom}>
                        reset
                    </button>
                </p>
                <p className="pt-4">
                    {pointerState.position.lat === 0
                        ? 'click on map to set pointer position'
                        : `pointer position lattitude: ${pointerState.position.lat.toFixed(
                              4,
                          )} longitude: ${pointerState.position.lng.toFixed(4)}`}
                </p>
            </div>
        </div>
    );
}
