import { Main } from 'components/main';
import Map from 'components/map/map';
import type { LatLngTuple } from 'leaflet';
import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const DEFAULT_CENTER: LatLngTuple = [52.2111249, 18.9940314];

const Home = () => {
    return (
        <Map className="test" width={800} height={400} zoom={6} center={DEFAULT_CENTER}>
            {({ TileLayer, Marker, Popup }) => (
                <>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={DEFAULT_CENTER}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </>
            )}
        </Map>
    );
};

export default Home;
