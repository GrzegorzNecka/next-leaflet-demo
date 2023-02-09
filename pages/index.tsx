import dynamic from 'next/dynamic';
import Map from '@/components/map-test/map';
import { divIcon } from 'leaflet';
import MapLoader from '@/components/map-with-no-ssr/map-loader';
import { NominatimSearchBox } from '@/components/nominatim-search-box';
import { useState } from 'react';
import type { NominatimSearchResult } from '@/types/leaflet';

const MapWithNoSSR = dynamic(() => import('@/components/map-with-no-ssr'), {
    ssr: false,
    loading: MapLoader,
});

const Home = () => {
    const [selectPlace, setSelectPlace] = useState<NominatimSearchResult>(null);

    return (
        <>
            {/* <Map width={800} height={900} /> */}

            <MapWithNoSSR selectedPlace={selectPlace} />
            <NominatimSearchBox setSelectPlace={setSelectPlace} />
            <pre>{!!selectPlace && JSON.stringify(selectPlace, null, 2)}</pre>
        </>
    );
};

export default Home;
