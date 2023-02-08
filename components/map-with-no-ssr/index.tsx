import { useEffect, useMemo, useState } from 'react';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '@/styles/Map.module.css';
import { MapContainer } from 'react-leaflet';
import { DisplayCoordinates } from './display-cooridnates';
import { LayerControl } from './layers/layers-control';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/utils/initial-config';

const Map = () => {
    const mapClassName = styles.map;
    const [map, setMap] = useState(null);
    const [isMap, setIsMap] = useState<boolean>(false);

    useEffect(() => {
        if (!isMap) {
            return;
        }

        (async function init() {
            // delete Leaflet.Icon.Default.prototype._getIconUrl;
            Leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
                iconUrl: 'leaflet/images/marker-icon.png',
                shadowUrl: 'leaflet/images/marker-shadow.png',
            });
        })();
    }, [isMap]);

    return (
        <MapContainer
            key={new Date().getTime()}
            whenReady={() => setIsMap(true)}
            className={mapClassName}
            center={INITIAL_CENTER}
            zoom={INITIAL_ZOOM}
            scrollWheelZoom={true}
            style={{ height: '900px', width: '1100px' }}>
            <LayerControl />
            <DisplayCoordinates center={INITIAL_CENTER} zoom={INITIAL_ZOOM} />
        </MapContainer>
    );
};

export default Map;
