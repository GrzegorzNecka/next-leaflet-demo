import type { PositionControlsKeys } from '@/utils/position-controls';
import type { Layer } from 'leaflet';

// context

export type LayersCustomControlProviderProps = {
    position: PositionControlsKeys;
    children: React.ReactNode;
};

export type LayerObject = {
    checked: boolean;
    group: string;
    id: number;
    layer: Layer;
    name: string;
};

export type HandleAddGroupProp = {
    group: string;
    layer: Layer;
    name: string;
};

export type State = {
    layers: LayerObject[];
    addGroup: ({ layer, name, group }: HandleAddGroupProp) => void;
};

export type CreateControlledLayerProps = {
    checked?: boolean;
    group: string;
    name: string;
    children: React.ReactNode;
};
