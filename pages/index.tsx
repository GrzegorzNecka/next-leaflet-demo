import dynamic from 'next/dynamic';
import Map from '@/components/map-test/map';
import { divIcon } from 'leaflet';
import MapLoader from '@/components/map-with-no-ssr/map-loader';

const MapWithNoSSR = dynamic(() => import('@/components/map-with-no-ssr'), {
    ssr: false,
    loading: MapLoader,
});

const Home = () => {
    return (
        <>
            {/* <Map width={800} height={900} /> */}

            <MapWithNoSSR />
        </>
    );
};

export default Home;
