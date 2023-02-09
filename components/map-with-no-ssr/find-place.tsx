import type { LatLngBoundsExpression } from 'leaflet';
import { useMemo, useState } from 'react';
import { Rectangle, useMap } from 'react-leaflet';

const innerBounds = [
    [49.505, -1.09],
    [49.3, 1.09],
];

const bbox = [49.9676668, 50.1261338, 19.7922355, 20.2173455];
const Krakowbounds = [
    [bbox[0], bbox[2]],
    [bbox[1], bbox[3]],
];

// "boundingbox": [
//     "49.9676668",
//     "50.1261338",
//     "19.7922355",
//     "20.2173455"
//   ],

const redColor = { color: 'red' };
const whiteColor = { color: 'white' };

export function FindPlace() {
    const [bounds, setBounds] = useState(null);
    const map = useMap();

    const innerHandlers = useMemo(
        () => ({
            click() {
                setBounds(bounds);
                map.fitBounds(Krakowbounds as LatLngBoundsExpression, {
                    padding: [20, 20],
                });
            },
        }),
        [map],
    );

    return (
        <>
            {/* <Rectangle
                bounds={outerBounds}
                eventHandlers={outerHandlers}
                pathOptions={bounds === outerBounds ? redColor : whiteColor}
            /> */}
            <Rectangle
                bounds={Krakowbounds as LatLngBoundsExpression}
                eventHandlers={innerHandlers}
                pathOptions={bounds === innerBounds ? redColor : whiteColor}
            />
        </>
    );
}
