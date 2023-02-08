import { useEffect, useMemo, useState } from 'react';
import type { LatLngTuple } from 'leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';
import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import tileLayer from '@/utils/tile-Layer';
import { Wojewodztwa } from './wojewodztwa';
import { DisplayCoordinates } from './display-cooridnates';

const INITIAL_CENTER: LatLngTuple = [52.2111249, 18.9940314];
const INITIAL_ZOOM = 7;

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
            scrollWheelZoom={false}
            style={{ height: '900px', width: '1100px' }}>
            <TileLayer {...tileLayer} />
            <Marker position={INITIAL_CENTER}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>

            <DisplayCoordinates center={INITIAL_CENTER} zoom={INITIAL_ZOOM} />

            <Wojewodztwa />
        </MapContainer>
    );
};

export default Map;
