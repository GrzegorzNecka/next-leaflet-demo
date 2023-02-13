import { createContext, useContext } from 'react';

import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import type { Layer } from 'leaflet';
import { Util } from 'leaflet';
import lodash from 'lodash';
import type { PositionControlsValues } from '@/utils/position-controls';
import { POSITION_CONTROLS } from '@/utils/position-controls';
import type {
    State,
    LayersCustomControlProviderProps,
    LayerObject,
    HandleAddGroupProp,
} from '../components/leaflet-core/custom-layer-control-WIP/types';

export const LayersControlContext = createContext<State | null>(null);

export default function LayersCustomControlProvider({
    position,
    children,
}: LayersCustomControlProviderProps) {
    const [collapsed, setCollapsed] = useState(true);
    const [layers, setLayers] = useState<LayerObject[]>([]);

    let positionClass: PositionControlsValues = POSITION_CONTROLS.topright;
    if (position) {
        positionClass = POSITION_CONTROLS[position];
    }

    const map = useMapEvents({
        layerremove: () => {
            // console.log("layer removed");
        },
        layeradd: () => {
            // console.log("layer add");
        },
    });

    const handleOnChange = (layerObj: LayerObject) => {
        if (map?.hasLayer(layerObj.layer)) {
            map.removeLayer(layerObj.layer);
            setLayers(
                layers.map((layer) => {
                    if (layer.id === layerObj.id)
                        return {
                            ...layer,
                            checked: false,
                        };
                    return layer;
                }),
            );
        } else {
            map.addLayer(layerObj.layer);
            setLayers(
                layers.map((layer) => {
                    if (layer.id === layerObj.id)
                        return {
                            ...layer,
                            checked: true,
                        };
                    return layer;
                }),
            );
        }
    };

    const handleAddGroup = ({ layer, name, group }: HandleAddGroupProp) => {
        setLayers((prevLayer) => [
            ...prevLayer,
            {
                layer,
                group,
                name,
                checked: map?.hasLayer(layer),
                id: Util.stamp(layer),
            },
        ]);
    };

    const groupedLayers = lodash.groupBy(layers, 'group');

    const initialLayerControlState: State = {
        layers,
        addGroup: handleAddGroup,
    };

    return (
        <LayersControlContext.Provider value={initialLayerControlState}>
            <div className={positionClass}>
                <div className="leaflet-control leaflet-bar">
                    {
                        <section
                            onMouseEnter={() => setCollapsed(false)}
                            onMouseLeave={() => setCollapsed(true)}>
                            {/* {collapsed && <p>icon</p>}
                            {!collapsed && */}
                            {Object.keys(groupedLayers).map((section, index) => (
                                <details key={`${section} ${index}`}>
                                    <summary> {section}</summary>
                                    {groupedLayers[section]?.map((layerObj, i) => (
                                        <label key={i}>
                                            {layerObj.name}
                                            <input
                                                type="checkbox"
                                                checked={layerObj.checked}
                                                onChange={() => handleOnChange(layerObj)}
                                                name="checkedB"
                                                color="primary"
                                            />
                                        </label>
                                    ))}
                                </details>
                            ))}
                            {/* } */}
                        </section>
                    }
                </div>
                {children}
            </div>
        </LayersControlContext.Provider>
    );
}

export function useLayerControlContext() {
    const context = useContext(LayersControlContext);

    if (context == null) {
        throw new Error(
            'No context provided: useLayerControlContext() can only be used in a descendant of <LayerControl>',
        );
    }

    return context;
}
