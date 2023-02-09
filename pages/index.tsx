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
    const [selectPosition, setSelectPosition] = useState<NominatimSearchResult>(null);
    console.log('🚀 ~ file: index.tsx:16 ~ Home ~ selectPosition', selectPosition);
    return (
        <>
            {/* <Map width={800} height={900} /> */}

            <MapWithNoSSR />
            <NominatimSearchBox setSelectPosition={setSelectPosition} />
            <pre>{selectPosition && JSON.stringify(selectPosition, null, 2)}</pre>
        </>
    );
};

export default Home;
