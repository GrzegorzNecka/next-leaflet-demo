import type L from 'leaflet';

declare module 'leaflet' {
    namespace Control {
        interface Layers {
            addGroup: (layer: Layer, name: string) => this;
            testMethods: () => void;
            group: () => void;
        }
    }
}

export type _Layer = {
    layer: L.Layer;
    name: string;
    overlay: boolean;
};

export namespace CustomAddGroup {
    export interface This extends Control.Layers {
        _lastZIndex: number;
        _map: L.Map;
        _layers: _Layer[];
        options: {
            autoZIndex: boolean;
            sortLayers: boolean;
            sortFunction: (
                layerA: L.Layer,
                layerB: L.Layer,
                nameA: string,
                nameB: string,
            ) => -1 | 1 | 0;
        };
        _onLayerChange: (e: unknown) => void;
        _expandIfNotCollapsed: () => L.Layer;
    }

    export interface Layer extends L.Layer {
        setZIndex: (zIndex: number) => unknown;
    }
}
