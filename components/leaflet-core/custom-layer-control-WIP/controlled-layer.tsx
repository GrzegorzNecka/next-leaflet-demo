import { LeafletProvider, useLeafletContext } from '@react-leaflet/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLayerControlContext } from '../../../context/custom-layer-control-context';
import type { Layer } from 'leaflet';
import type { CreateControlledLayerProps, LayerObject } from './types';

/**
 *
 * ControlledLayer: https://react-leaflet.js.org/docs/core-api/#controlledlayer
 * LeafletContextInterface: https://react-leaflet.js.org/docs/core-api/#leafletcontextinterface
 *
 */

let stopReRender = true;

export default function ControlledLayer({ ...props }: CreateControlledLayerProps) {
    //------------

    //-
    const context = useLeafletContext();
    const layerContext = useLayerControlContext();
    const propsRef = useRef(props);

    const [layer, setLayer] = useState<Layer | null>(null);

    //------------

    const addLayer = useCallback(
        (layer: Layer) => {
            if (stopReRender === false) {
                return;
            }

            if (propsRef.current.checked === true) {
                context.map.addLayer(layer);
            }

            layerContext.addGroup({
                layer: layer,
                name: propsRef.current.name,
                group: propsRef.current.group,
            });

            setLayer(layer);
            // return () => {
            //     stopReRender = false;
            // };
        },

        [],
    );

    //------------

    const removeLayer = useCallback(
        (layer: Layer) => {
            if (context.layersControl === null) {
                return;
            }

            context.map.removeLayer(layer);
        },
        [context],
    );

    //------------

    const newContext = useMemo(() => {
        if (!context) {
            return null;
        }

        return Object.assign({}, context, {
            layerContainer: {
                addLayer,
                removeLayer,
            },
        });
    }, [context, addLayer, removeLayer]);

    //------------

    useEffect(() => {
        if (stopReRender === false) {
            return;
        }
        if (layer !== null && propsRef.current !== props) {
            if (
                props.checked === true &&
                (propsRef.current.checked === null || propsRef.current.checked === false)
            ) {
                context.map.addLayer(layer);
            } else if (
                propsRef.current.checked === true &&
                (props.checked === null || props.checked === false)
            ) {
                context.map.removeLayer(layer);
            }

            propsRef.current = props;
        }

        // return () => {
        //     if (layer !== null) {
        //         if (!context.layersControl) {
        //             return;
        //         }

        //         context.map.removeLayer(layer);
        //     }
        // };

        return () => {
            stopReRender = false;
        };
    }, [stopReRender]);

    if (props.children) {
        return <LeafletProvider value={newContext}>{props.children}</LeafletProvider>;
    }
    return null;
}
