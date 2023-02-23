import { useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '@/styles/modules/map.module.scss';
import { MapContainer, ZoomControl } from 'react-leaflet';
import { Tools } from './tools/tools';
import { LayerControl } from './layers-control';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/utils/leaflet-config';
import { NominatimOutput } from './nominatim-output';
import { POSITION_CONTROLS } from '@/utils/position-controls';
import { CustomSquare } from '../../only-dev-sources/leaflet-core/custom-square-core-example/custom-square-8';
import { WatermarkBrand } from '../leaflet-core/watermark';
import CustomGroupControlLayer_v2 from '@/only-dev-sources/leaflet-core/custom-core-layer-group-control';
import type { NominatimSearchResult } from '@/types/leaflet';
import { GroupedLayerControl } from '@/only-dev-sources/leaflet-core/grouped-layer-control-plugin';
import { ControlLayersTree } from '@/only-dev-sources/leaflet-core/control-layers-tree';

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
            <WatermarkBrand position={'bottomright'} />

            <LayerControl />

            <ZoomControl position="topright" />

            <Tools
                position={POSITION_CONTROLS.bottomleft}
                center={INITIAL_CENTER}
                zoom={INITIAL_ZOOM}
            />

            {!!selectedPlace && <NominatimOutput selectedPlace={selectedPlace} />}

            {/* start ---- only-dev-sources ----  */}

            <ControlLayersTree position={'topleft'} />

            {/* <CustomSquare center={INITIAL_CENTER} size={600000} /> */}
            {/* <GroupedLayerControl />
                 <CustomGroupControlLayer_v2 /> */}

            {/* ---- only-dev-sources ---- end */}
        </MapContainer>
    );
};

export default Map;
