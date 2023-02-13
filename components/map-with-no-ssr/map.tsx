import { useEffect, useState } from 'react';
import Leaflet, { Circle, FeatureGroup, Popup, Rectangle, divIcon, rectangle } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '@/styles/Map.module.css';
import { LayerGroup, MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Tools } from './tools';
import { LayerControl } from './layers-control';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/utils/leaflet-config';
import type { NominatimSearchResult } from '@/types/leaflet';
import { NominatimOutput } from './nominatim-output';
import { POSITION_CONTROLS } from '@/utils/position-controls';
import { CustomSquare } from '../leaflet-core/custom-square';
import CustomControl from '../leaflet-core/custom-control';
import CustomLayerControl from '../leaflet-core/custom-layer-control-WIP/custom-layer-control';

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
            zoomControl={false}
            scrollWheelZoom={true}
            // style={{ height: '900px', width: '1100px' }}
        >
            <LayerControl />

            <ZoomControl position="topright" />

            <Tools
                position={POSITION_CONTROLS.bottomleft}
                center={INITIAL_CENTER}
                zoom={INITIAL_ZOOM}
            />

            {!!selectedPlace && <NominatimOutput selectedPlace={selectedPlace} />}

            {/* -- CORE  */}

            <CustomSquare center={INITIAL_CENTER} size={60000} />

            <CustomControl container={{ role: 'navigation' }} prepend position="bottomright">
                <div className="bg-gray-100">
                    <div> 1 custom layer </div>
                    <div> 2 custom layer </div>
                </div>
            </CustomControl>

            <CustomLayerControl></CustomLayerControl>

            {/* ----  */}
        </MapContainer>
    );
};

export default Map;
