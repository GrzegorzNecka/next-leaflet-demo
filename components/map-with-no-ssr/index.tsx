import { useEffect, useMemo, useState } from 'react';
import type { LatLngExpression } from 'leaflet';
import Leaflet, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '@/styles/Map.module.css';
import { MapContainer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import { DisplayCoordinates } from './display-cooridnates';
import { LayerControl } from './layers/layers-control';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/utils/initial-config';
import type { NominatimSearchResult } from '@/types/leaflet';
import L from 'leaflet';

import { NominatimOutput } from './nominatim-output';
import { FindPlace } from './find-place';

type MapProps = {
    selectedPlace: NominatimSearchResult;
};

const Map = ({ selectedPlace }: MapProps) => {
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
            {!!selectedPlace && <NominatimOutput selectedPlace={selectedPlace} />}
            {/* <FindPlace /> */}
        </MapContainer>
    );
};

export default Map;
