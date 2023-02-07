import { useEffect, useState } from 'react';
import type { LatLngTuple } from 'leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import tileLayer from '@/utils/tile-Layer';
import { wojewodztwa } from '@/data/geojson';
import { onEachFeature } from '@/utils/geo-json';
import L from 'leaflet';

const DEFAULT_CENTER: LatLngTuple = [52.2111249, 18.9940314];

function MyComponent() {
    const map = useMap();
    console.log('map center:', map.getCenter());
    return null;
}

const Map = () => {
    const mapClassName = styles.map;

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

    useEffect(() => {
        console.log(isMap);
        console.log(L);
    }, [isMap]);

    return (
        <MapContainer
            key={new Date().getTime()}
            whenReady={() => setIsMap(true)}
            className={mapClassName}
            center={DEFAULT_CENTER}
            zoom={7}
            scrollWheelZoom={false}
            style={{ height: '800px', width: '900px' }}>
            <TileLayer {...tileLayer} />
            <Marker position={DEFAULT_CENTER}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <MyComponent />
            <GeoJSON data={wojewodztwa} onEachFeature={onEachFeature} />
        </MapContainer>
    );
};

export default Map;
