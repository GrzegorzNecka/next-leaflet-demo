import { useMap, useMapEvents } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import { useCallback, useEffect, useState } from 'react';

type ToolsProps = { position: string; center: LatLngTuple; zoom: number };

export function Tools({ position, center, zoom }: ToolsProps) {
    // const pointerState = usePointerState();
    const map = useMap();
    const [coords, setCoords] = useState(() => map.getCenter());
    const [mapZoom, setMapZoom] = useState(() => map.getZoom());
    const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number }>({
        lat: 0.0,
        lng: 0.0,
    });
    //  Calculations

    const handleSetView = useCallback(() => {
        map.setView(center, zoom);
    }, [map, center, zoom]);

    const handleSetZoom = useCallback(() => {
        map.setZoom(zoom);
    }, [map, zoom]);

    const onMove = useCallback(() => {
        setCoords(map.getCenter());
    }, [map]);

    //  Effects

    useEffect(() => {
        map.on('move', onMove);
        return () => {
            map.off('move', onMove);
        };
    }, [map, onMove]);

    //  Events

    useMapEvents({
        zoomend: () => {
            setMapZoom(map.getZoom());
        },
        mousemove: (e) => {
            setCursorCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });

    if (!map) return null;
    return (
        <div className={position}>
            <div className="leaflet-control rounded-lg flex justify-between items-center gap-2">
                <div className=" shadow-xl px-2 py-2 flex justify-center items-center gap-6 max-w-sm backdrop-blur bg-white/50  rounded-sm border-2 border-gray-400/20">
                    <p className="text-gray-700 text-xs ">
                        lat: {coords.lat.toFixed(4)}, lon: {coords.lng.toFixed(4)}
                        <button
                            type="button"
                            className="inline-block ml-4 px-[6px] py-[3px] bg-blue-500 text-white hover:text-blue-500  text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            onClick={handleSetView}>
                            reset
                        </button>
                    </p>
                </div>
                <div className=" shadow-xl px-2 py-2 flex    justify-center items-center  gap-6 max-w-sm backdrop-blur-sm bg-white/50  rounded-sm border-2 border-gray-400/20">
                    <p className="text-gray-700 text-xs ">
                        zoom: {mapZoom}
                        <button
                            type="button"
                            className="inline-block ml-4 px-[6px] py-[3px]  bg-blue-500 text-white hover:text-blue-500  text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5  focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            onClick={handleSetZoom}>
                            reset
                        </button>
                    </p>
                </div>
                <div className=" shadow-xl px-3 py-2 flex justify-center items-center  gap-6 max-w-sm backdrop-blur-sm  bg-white/50 rounded-sm border-2 border-gray-400/20">
                    <p className="text-gray-700 text-xs ">
                        {`cursor: lat ${cursorCoords.lat.toFixed(
                            4,
                        )}  lon ${cursorCoords.lng.toFixed(4)} `}
                    </p>
                </div>
            </div>
        </div>
    );
}
