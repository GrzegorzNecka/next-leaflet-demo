import { useEffect } from 'react';
import type { LatLngTuple } from 'leaflet';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';

const { MapContainer } = ReactLeaflet;

type ReactLeafletType = typeof ReactLeaflet;
type LeafletType = typeof Leaflet;

export type MapProps = {
    children: (ReactLeaflet: ReactLeafletType, Leaflet: LeafletType) => React.ReactNode;
    className?: string;
    width: number;
    height: number;
    zoom: number;
    center: LatLngTuple;
};

const DynamicMap = ({ children, className, width, height, ...rest }: MapProps) => {
    let mapClassName = styles.map;

    if (className) {
        mapClassName = `${mapClassName} ${className}`;
    }

    useEffect(() => {
        (async function init() {
            // delete Leaflet.Icon.Default.prototype._getIconUrl;
            Leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
                iconUrl: 'leaflet/images/marker-icon.png',
                shadowUrl: 'leaflet/images/marker-shadow.png',
            });
        })();
    }, []);

    return (
        <MapContainer className={mapClassName} {...rest}>
            {children(ReactLeaflet, Leaflet)}
        </MapContainer>
    );
};

export default DynamicMap;
