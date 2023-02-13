import { useLeafletContext } from '@react-leaflet/core';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

type SquareProps = { center: LatLngExpression; size: number };

export function CustomSquare(props: SquareProps) {
    const context = useLeafletContext();

    useEffect(() => {
        const bounds = L.latLng(props.center).toBounds(props.size);
        const square = new L.Rectangle(bounds);
        const container = context.layerContainer || context.map;
        container.addLayer(square);

        return () => {
            container.removeLayer(square);
        };
    });

    return null;
}
