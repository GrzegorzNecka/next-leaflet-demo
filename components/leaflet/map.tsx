import { useEffect, useState } from 'react';
import Leaflet, { Circle, FeatureGroup, Icon, Popup, Rectangle, divIcon, rectangle } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '@/styles/Map.module.css';
import { LayerGroup, MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Tools } from './tools/tools';
import { LayerControl } from './layers-control';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/utils/leaflet-config';
import type { NominatimSearchResult } from '@/types/leaflet';
import { NominatimOutput } from './nominatim-output';
import { POSITION_CONTROLS } from '@/utils/position-controls';
import { CustomSquare } from '../../only-dev-sources/leaflet-core/custom-square-core-example/custom-square-8';
import CustomControlContainer_v1 from '../../only-dev-sources/leaflet-core/custom-control-container';
import CustomGroupControlLayer_v1 from '../../only-dev-sources/leaflet-core/custom-group-control-layer_v1';
import { GroupedLayersV1 } from '../../only-dev-sources/leaflet-core/grouped-layers-v1';
import { CustomRawControlLayer_v1 } from '../../only-dev-sources/leaflet-core/raw-control-layer';
import { CustomWatermark } from '../leaflet-core/watermark';

// import RenderLayerControl from '../leaflet-core/chtbox';

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

    //--

    //--

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

            <CustomWatermark position={'topright'} />

            {!!selectedPlace && <NominatimOutput selectedPlace={selectedPlace} />}

            {/* start ---- only-dev-sources ----  */}

            <CustomSquare center={INITIAL_CENTER} size={600000} />

            <CustomControlContainer_v1
                container={{ role: 'navigation' }}
                prepend
                position="bottomright">
                <div className="bg-gray-100">
                    <div> 1 custom layer </div>
                    <div> 2 custom layer </div>
                </div>
            </CustomControlContainer_v1>

            <CustomGroupControlLayer_v1 />

            <CustomRawControlLayer_v1 />

            {/* ---- only-dev-sources ---- end */}
        </MapContainer>
    );
};

export default Map;
