import { pointsA } from '@/data/points';
import type { PositionControlsKeys } from '@/utils/position-controls';
import { createControlComponent, createControlHook, useLeafletContext } from '@react-leaflet/core';
import type { Control } from 'leaflet';
import { ControlOptions } from 'leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import type { RefAttributes } from 'react';
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

/**
 *
 * Extend Control:  https://leafletjs.com/examples/extending/extending-3-controls.html#controls
 * LeafletCore: instruction: https://react-leaflet.js.org/docs/core-architecture/
 *
 */

interface Options {
    position: PositionControlsKeys;
}

type Props = Options;

export function CustomWatermark(props: Props) {
    const context = useLeafletContext();

    const controlExtend = useRef<typeof Control | null>(null);
    const propsRef = useRef<Props>(props || { position: 'topleft' });

    function extendControl() {
        return L.Control.extend({
            onAdd: function (map: L.Map) {
                const img = L.DomUtil.create('img');

                img.src = 'next.svg';
                img.style.width = '100px';

                return img;
            },

            onRemove: function (map: L.Map) {
                // Nothing to do here
            },
        });
    }

    useEffect(() => {
        controlExtend.current = extendControl();

        const control = new controlExtend.current(propsRef.current);
        const container = context.map;

        if (container) {
            container.addControl(control);
        }

        return () => {
            // control.remove();
            container.removeControl(control);
        };
    }, [propsRef.current]);

    return null;
}
