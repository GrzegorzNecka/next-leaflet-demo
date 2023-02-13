import { LeafletProvider, useLeafletContext } from '@react-leaflet/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLayerControlContext } from './LayerControlContext';
import type { Layer } from 'leaflet';
import type { CreateControlledLayerProps, LayerObject } from './types';

export default function CreateControlledLayer({ ...props }: CreateControlledLayerProps) {
    //------------

    //-
    const context = useLeafletContext();
    const layerContext = useLayerControlContext();
    const propsRef = useRef(props);
    const [layer, setLayer] = useState<Layer | null>(null);

    //------------

    const addLayer = useCallback(
        (layer: Layer) => {
            if (propsRef.current.checked) {
                context.map.addLayer(layer);
            }

            layerContext.addGroup({
                layer: layer,
                name: propsRef.current.name,
                group: propsRef.current.group,
            });

            setLayer(layer);
        },
        [context],
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

    const newContext = useMemo(
        function makeNewContext() {
            if (!context) {
                return null;
            }

            return Object.assign({}, context, {
                layerContainer: {
                    addLayer,
                    removeLayer,
                },
            });
        },
        [context, addLayer, removeLayer],
    );

    //------------

    useEffect(() => {
        if (layer !== null && propsRef.current !== props) {
            if (
                props.checked === true &&
                (propsRef.current.checked == null || propsRef.current.checked === false)
            ) {
                context.map.addLayer(layer);
            } else if (
                propsRef.current.checked === true &&
                (props.checked == null || props.checked === false)
            ) {
                context.map.removeLayer(layer);
            }

            propsRef.current = props;
        }

        return function checker() {
            if (layer !== null) {
                if (!context.layersControl) {
                    return;
                }

                context.map.removeLayer(layer);
            }
        };
    }, [context.layersControl, context.map, layer, props]);

    if (props.children) {
        return <LeafletProvider value={newContext}>{props.children}</LeafletProvider>;
    }
    return null;
}
