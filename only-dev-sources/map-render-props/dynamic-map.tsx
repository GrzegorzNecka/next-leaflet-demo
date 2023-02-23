import { useEffect } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';
import type { DynamicMapProps } from '../../types/leaflet';

const { MapContainer } = ReactLeaflet;

const DynamicMap = ({ children, className, width, height, ...rest }: DynamicMapProps) => {
    let mapClassName = styles.map;

    if (className) {
        mapClassName = `${mapClassName} ${className}`;
    }

    useEffect(() => {
        (async function init() {
            Leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
                iconUrl: 'leaflet/images/marker-icon.png',
                shadowUrl: 'leaflet/images/marker-shadow.png',
            });
        })();
    }, []);

    return (
        <MapContainer scrollWheelZoom={true} className={mapClassName} {...rest}>
            {children(ReactLeaflet, Leaflet)}
        </MapContainer>
    );
};

export default DynamicMap;
