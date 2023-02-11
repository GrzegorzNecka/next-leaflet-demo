import dynamic from 'next/dynamic';
import Map from '@/components/_map-render-props/map';
import { divIcon } from 'leaflet';
import MapLoader from '@/components/map-with-no-ssr/map-loader';
import { NominatimSearchBox } from '@/components/nominatim-search-box';
import { useState } from 'react';
import type { NominatimSearchResult } from '@/types/leaflet';

const MapWithNoSSR = dynamic(() => import('@/components/map-with-no-ssr/map'), {
    ssr: false,
    loading: MapLoader,
});

const Home = () => {
    const [selectPlace, setSelectPlace] = useState<NominatimSearchResult>(null);

    return (
        <>
            {/* <Map width={800} height={900} /> */}
            <div className="grid grid-cols-[400px_minmax(900px,_1fr)]">
                <div className="">
                    <NominatimSearchBox setSelectPlace={setSelectPlace} />
                </div>

                <div>
                    <MapWithNoSSR selectedPlace={selectPlace} />
                </div>
            </div>

            {/* <pre>{!!selectPlace && JSON.stringify(selectPlace, null, 2)}</pre> */}
        </>
    );
};

export default Home;
