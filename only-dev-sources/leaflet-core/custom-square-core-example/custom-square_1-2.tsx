import { useLeafletContext } from '@react-leaflet/core';
import type { LatLngExpression, Rectangle } from 'leaflet';
import L from 'leaflet';
import { useCallback, useEffect, useRef } from 'react';

/**
 *
 * instruction: https://react-leaflet.js.org/docs/core-architecture/
 *
 */
type SquareProps = { center: LatLngExpression; size: number };

function getBounds(props: SquareProps) {
    return L.latLng(props.center).toBounds(props.size);
}

export function CustomSquare(props: SquareProps) {
    /**
     *
     * First, we need to access the context created by the MapContainer component,
     * by calling the useLeafletContext hook exported by the core APIs:
     *
     */

    const context = useLeafletContext();
    const squareRef = useRef<Rectangle<unknown>>();
    const propsRef = useRef(props);

    // const getBounds = useCallback(
    //     (props: SquareProps) => {
    //         return L.latLng(props.center).toBounds(props.size);
    //     },
    //     [props.center, props.size],
    // );

    useEffect(() => {
        // dodanie elementu do mapy

        /**
         *
         * Then, we use React's useEffect hook to create the square instance,
         * using the props to calculate the bounds to provide to Leaflet's Rectangle constructor:
         *
         * https://leafletjs.com/reference.html#rectangle
         *
         */
        const bounds = L.latLng(props.center).toBounds(props.size);

        squareRef.current = new L.Rectangle(bounds, { color: '#ff7800', weight: 1 });

        /**
         *
         * The created layer needs to be added to a container provided in the context,
         * either a parent container such as a LayerGroup, or the Map instance created with the context:
         *
         */

        const container = context.layerContainer || context.map;
        container.addLayer(squareRef.current);

        return () => {
            /**
             *
             * We also need to return the cleaning up function for the useEffect hook,
             * that removes the layer from the container:
             *
             */

            if (squareRef.current) {
                container.removeLayer(squareRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // zmiana położenia

        if (!squareRef.current) {
            return;
        }

        if (props.center !== propsRef.current.center || props.size !== propsRef.current.size) {
            const bounds = getBounds(props);
            squareRef.current.setBounds(bounds);
        }

        propsRef.current = props;
    }, [props.center, props.size]);

    return null;
}
