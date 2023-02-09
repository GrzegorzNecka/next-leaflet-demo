import type { NominatimSearchResult } from '@/types/leaflet';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

type SearchBoxProps = {
    setSelectPosition: Dispatch<SetStateAction<NominatimSearchResult | null>>;
};

export const NominatimSearchBox = ({ setSelectPosition }: SearchBoxProps) => {
    const [searchText, setSearchText] = useState<string>('');
    const [listPlace, setListPlace] = useState<NominatimSearchResult[]>([]);

    const handleInputOnClick = async () => {
        const QUERY_STRING_PAARMETERS = {
            q: searchText,
            polygon_geojson: '1',
            format: 'jsonv2',
        };

        const QUERY_STRING = new URLSearchParams(QUERY_STRING_PAARMETERS).toString();

        const URL = `https://nominatim.openstreetmap.org/search.php?${QUERY_STRING}`;

        const response = await fetch(URL, { method: 'GET', redirect: 'follow' });

        if (response.status !== 200) {
            return;
        }

        const data: NominatimSearchResult[] = await response.json();
        setListPlace(data);

        console.log('🚀 ~ file: index.tsx:34 ~ handleInputOnClick ~ data', data);
    };

    return (
        <div>
            <div>
                <div>
                    <div>
                        <input
                            style={{ width: '100%' }}
                            value={searchText}
                            onChange={(event) => {
                                setSearchText(event.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <button onClick={handleInputOnClick}>Search</button>
                    </div>
                </div>
                <div>
                    <ul aria-label="main mailbox folders">
                        {listPlace.map((place) => {
                            return (
                                <div key={place?.place_id}>
                                    <li
                                        onClick={() => {
                                            setSelectPosition(place);
                                        }}>
                                        <p>{place?.display_name}</p>
                                    </li>
                                    <hr />
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};
