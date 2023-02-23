import {
    createElementHook,
    createElementObject,
    useLeafletContext,
    useLayerLifecycle,
    extendContext,
} from '@react-leaflet/core';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

function getBounds(props) {
    return L.latLng(props.center).toBounds(props.size);
}

//tworzę instancję kwadratu
function createSquare(props, context) {
    /**
     *
     * https://react-leaflet.js.org/docs/core-api/#createelementhook
     *
     */

    return createElementObject(
        new L.Rectangle(getBounds(props), { color: '#ff7800', weight: 1 }),
        context,
    );
}

//aktualizuję jego parametry, w tym położenie
function updateSquare(instance, props, prevProps) {
    if (props.center !== prevProps.center || props.size !== prevProps.size) {
        instance.setBounds(getBounds(props));
    }
}

//tworzę hook
const useSquareElement = createElementHook(createSquare, updateSquare);

type SquareProps = { center: LatLngExpression; size: number };

export function CustomSquare(props: SquareProps) {
    const context = useLeafletContext();
    // odbieram element z hooka
    const elementRef = useSquareElement(props, context);

    // useEffect(() => {
    //     const container = context.layerContainer || context.map;
    //     container.addLayer(elementRef.current.instance);

    //     return () => {
    //         container.removeLayer(elementRef.current.instance);
    //     };
    // }, []);

    /**
     *
     *       zamiast useEffect -  https://react-leaflet.js.org/docs/core-api/#uselayerlifecycle
     */

    useLayerLifecycle(elementRef.current, context);
    return null;
}
