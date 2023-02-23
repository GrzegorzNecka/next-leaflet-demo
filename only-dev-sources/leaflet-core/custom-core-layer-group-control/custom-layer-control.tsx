import type { CustomAddGroup, _Layer } from '@/typings/leaflet';
import type { LeafletContextInterface } from '@react-leaflet/core';
import {
    LeafletProvider,
    createContainerComponent,
    createControlHook,
    createElementHook,
    createElementObject,
    extendContext,
    useLeafletContext,
    createLeafletContext,
} from '@react-leaflet/core';
import L from 'leaflet';

import { type Layer, Control, Util } from 'leaflet';
import lodash from 'lodash';
import React, {
    type ForwardRefExoticComponent,
    type FunctionComponent,
    type ReactNode,
    type RefAttributes,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { LayersControlProps } from 'react-leaflet';

/**
 *
 *  @issue
 *  - https://github.com/PaulLeCam/react-leaflet/issues/706#issuecomment-622333829
 *
 *  @source
 *  - https://github.com/PaulLeCam/react-leaflet/blob/next/packages/react-leaflet/src/LayersControl.tsx
 *  - https://github.com/PaulLeCam/react-leaflet/blob/master/packages/core/src/context.ts
 *
 */

/**
 *
 * types
 *
 */

export interface ControlledLayerProps {
    checked?: boolean;
    children: ReactNode;
    name: string;
}

export interface ControlledLayerProps {
    checked?: boolean;
    children: ReactNode;
    name: string;
}

interface ControlledGroupLayerProps extends ControlledLayerProps {
    group: string;
}

export interface ControlledLayerProps {
    checked?: boolean;
    children: ReactNode;
    name: string;
}

type ControlledMixinLayerProps = ControlledLayerProps | ControlledGroupLayerProps;

type CreateContainerComponent = ForwardRefExoticComponent<
    LayersControlProps & RefAttributes<Control.Layers>
> & {
    BaseLayer: FunctionComponent<ControlledLayerProps>;
    Overlay: FunctionComponent<ControlledLayerProps>;
    Group: FunctionComponent<ControlledGroupLayerProps>;
};

type AddLayerFunc = (
    layersControl: Control.Layers,
    layer: Layer,
    name: string,
    group?: string,
) => void;

/**
 *
 *
 * @hook createElementHook
 * responsible for creating and keeping track of the LeafletElement object
 *
 * @method createElementObject
 * return an object satisfying the LeafletElement interface
 *
 */

const createInstance = (options: Control.LayersOptions) => {
    //create control instance
    const control = new Control.Layers(undefined, undefined, {
        ...options,
    });

    //create groupLayers
    const groupLayers = (layer: CustomAddGroup.Layer, name: string, group: string) => {
        let layers: unknown[] = [];

        layers = [
            ...layers,
            {
                layer,
                group,
                name,
                // checked: map?.hasLayer(layer),
                checked: false,
                id: Util.stamp(layer),
            },
        ];

        const groupedLayers = lodash.groupBy(layers, 'group');

        return groupedLayers;
    };
    //@ts-ignore
    control.addGroup = function (layer: CustomAddGroup.Layer, name: string, group = 'test-group') {
        const layersByGroup = groupLayers(layer, name, group);
        console.log('🚀 ~  createInstance ~ layersByGroup', layersByGroup);

        const overlay = true;
        //@ts-ignore
        this._addLayer(layer, name, overlay);
        //@ts-ignore
        return this._map ? this._update() : this;
    };

    return control;
};

const createControlObject = (control: Control.Layers, ctx: LeafletContextInterface) => {
    return createElementObject(control, extendContext(ctx, { layersControl: control }));
};

export const useLayersControlElement = createElementHook<Control.Layers, LayersControlProps>(
    //
    function createLayersControl({ children: _c, ...options }, ctx) {
        // stwórz nową instancję controlera
        const instance = createInstance(options);

        // stwórz obiekt z contextem mapy, kontenerem  oraz nową instancją controlera
        const control = createControlObject(instance, ctx);

        return control;
    },
    function updateLayersControl(instance, props, prevProps) {
        //props -> children | options

        if (props.collapsed !== prevProps.collapsed) {
            if (props.collapsed === true) {
                instance.collapse();
            } else {
                instance.expand();
            }
        }
    },
);

/**
 *
 * @hook useLayersControl
 * hook is responsible for the control lifecycle (adding, updating and removing)
 *
 */

export const useLayersControl = createControlHook(useLayersControlElement);

/**
 *
 * @component CustomLayersControl
 * main component, Provider exporting as 'LayerControl'
 *
 *
 */

export const CustomLayersControl = createContainerComponent(
    useLayersControl,
) as CreateContainerComponent;

/**
 *
 * @method createControlledLayer
 * method specifies how layers are added to layer CustomLayersControl
 *
 */

export function createControlledLayer(addLayerToControl: AddLayerFunc) {
    // returned
    return function ControlledLayer(props: ControlledMixinLayerProps) {
        const parentContext = useLeafletContext();
        // const parentContext = useCustomLeafletContext();
        const propsRef = useRef<ControlledMixinLayerProps>(props);

        const [layer, setLayer] = useState<Layer | null>(null);
        // const { layersControl } = useCustomLayersControl();

        const { map, layersControl } = parentContext;

        //dodaj warstwę do controlera
        const addLayer = useCallback(
            (layerToAdd: Layer) => {
                if (layersControl != null) {
                    if (propsRef.current.checked) {
                        // aktywuj warstwę na mapie
                        map.addLayer(layerToAdd);
                    }
                    // console.log(
                    //     '🚀 ~ file: custom-layer-control.tsx:187 ~ ControlledLayer ~ layersControl ',
                    //     layersControl,
                    // );
                    if ('group' in propsRef.current) {
                        addLayerToControl(layersControl, layerToAdd, propsRef.current.name);
                        // console.log(
                        //     '🚀 ~ file: custom-layer-control.tsx:219 ~ ControlledLayer ~ addLayerToControl',
                        //     addLayerToControl,
                        // );

                        // addLayerToControl(
                        //     layersControl,
                        //     layerToAdd,
                        //     propsRef.current.name,
                        //     propsRef.current.group,
                        // );
                    } else {
                        addLayerToControl(layersControl, layerToAdd, propsRef.current.name);
                    }

                    // dodaj warstę do custom layer control

                    setLayer(layerToAdd);
                }
            },
            [layersControl, map],
        );

        // wyłącz warstwę z mapy
        const removeLayer = useCallback(
            (layerToRemove: Layer) => {
                layersControl?.removeLayer(layerToRemove);
                setLayer(null);
            },
            [layersControl],
        );

        const context = useMemo(() => {
            //rozszerz context o stworzony contener z warstwami
            return extendContext(parentContext, {
                layerContainer: { addLayer, removeLayer },
            });
        }, [parentContext, addLayer, removeLayer]);

        useEffect(() => {
            if (layer !== null && propsRef.current !== props) {
                if (
                    props.checked === true &&
                    (propsRef.current.checked == null || propsRef.current.checked === false)
                ) {
                    map.addLayer(layer);
                } else if (
                    propsRef.current.checked === true &&
                    (props.checked == null || props.checked === false)
                ) {
                    map.removeLayer(layer);
                }
                propsRef.current = props;
            }
        });

        return props.children ? (
            <LeafletProvider value={context}>{props.children}</LeafletProvider>
        ) : null;
    };
}

/**
 *
 *  createControlledLayer
 *
 */

function handleAddBaseLayer(layersControl: Control.Layers, layer: Layer, name: string) {
    layersControl.addBaseLayer(layer, name);
}
CustomLayersControl.BaseLayer = createControlledLayer(handleAddBaseLayer);

//---

function handleAddOverlay(layersControl: Control.Layers, layer: Layer, name: string) {
    layersControl.addOverlay(layer, name);
}

CustomLayersControl.Overlay = createControlledLayer(handleAddOverlay);

//---

function handleAddGroup(layersControl: Control.Layers, layer: Layer, name: string, group?: string) {
    console.log(layersControl.addOverlay);

    layersControl.addGroup(layer, name);
}

CustomLayersControl.Group = createControlledLayer(handleAddGroup);
