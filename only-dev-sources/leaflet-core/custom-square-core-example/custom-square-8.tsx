import {
    createElementHook,
    createElementObject,
    useLeafletContext,
    useLayerLifecycle,
    extendContext,
    createPathHook,
    createControlComponent,
    createControlHook,
    createLeafComponent,
    createPathComponent,
} from '@react-leaflet/core';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

function getBounds(props) {
    return L.latLng(props.center).toBounds(props.size);
}

//tworzę instancję kwadratu
function createSquare(props, context) {
    const square = new L.Rectangle(getBounds(props));

    return createElementObject(square, extendContext(context, { overlayContainer: square }));
}

//aktualizuję jego parametry, w tym położenie
function updateSquare(instance, props, prevProps) {
    if (props.center !== prevProps.center || props.size !== prevProps.size) {
        instance.setBounds(getBounds(props));
    }
}

//tworzę hook
// const useSquareElement = createElementHook(createSquare, updateSquare);
// const useSquare = createPathHook(useSquareElement);
export const CustomSquare = createPathComponent(createSquare, updateSquare);

/*

const useSquareElement = createElementHook(createElementObject(), updateSquare()) => 
const useSquare = createPathHook(useSquareElement)
const Square = createContainerComponent(useSquare)

*/
