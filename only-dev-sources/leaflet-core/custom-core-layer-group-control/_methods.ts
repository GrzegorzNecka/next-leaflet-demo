import type { Control } from 'leaflet';

export interface Controls extends Control.Layers {
    _lastZIndex: number;
    _map: L.Map;
    _layers: [{ layer: L.Layer; name: string; overlay: unknown }];
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

export function _addLayer(this: Controls, layer: Layer, name: string, overlay: boolean): void {
    if (this._map) {
        layer.on('add remove', this._onLayerChange, this);
    }

    this._layers.push({
        layer,
        name,
        overlay,
    });

    if (this.options.sortLayers) {
        this._layers.sort((a, b) => this.options.sortFunction(a.layer, b.layer, a.name, b.name));
    }

    if (this.options.autoZIndex && layer.setZIndex) {
        this._lastZIndex++;
        layer.setZIndex(this._lastZIndex);
    }

    this._expandIfNotCollapsed();
}
