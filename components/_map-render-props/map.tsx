import { wojewodztwa } from '@/data/geojson';

import type { LatLngTuple } from 'leaflet';
import dynamic from 'next/dynamic';
import type { MapProps } from '../../types/leaflet';
import { onEachFeature } from '@/utils/geo-json';

//becouse external dependency  relies on browser APIs like window.
const DynamicMap = dynamic(() => import('./dynamic-map'), {
    ssr: false,
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;
const DEFAULT_CENTER: LatLngTuple = [52.2111249, 18.9940314];

const Map = (props: MapProps) => {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;

    return (
        <>
            <div style={{ aspectRatio: width / height }}>
                <DynamicMap
                    className="test"
                    width={800}
                    height={400}
                    zoom={6}
                    center={DEFAULT_CENTER}>
                    {({ TileLayer, Marker, Popup, GeoJSON }) => (
                        <>
                            {' '}
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={DEFAULT_CENTER}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                            {/* <Square center={[51.505, -0.09]} size={1000} /> */}
                            <GeoJSON data={wojewodztwa} onEachFeature={onEachFeature} />
                        </>
                    )}
                </DynamicMap>
            </div>
        </>
    );
};

export default Map;
