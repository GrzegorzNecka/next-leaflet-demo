import type { NominatimSearchResult } from '@/types/leaflet';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

type SearchBoxProps = {
    setSelectPlace: Dispatch<SetStateAction<NominatimSearchResult | null>>;
};

export const NominatimSearchBox = ({ setSelectPlace: setSelectPosition }: SearchBoxProps) => {
    const [searchText, setSearchText] = useState<string>('');
    const [listPlace, setListPlace] = useState<NominatimSearchResult[]>([]);

    const handleInputOnClick = useCallback(async () => {
        const QUERY_STRING_PARAMS = {
            q: searchText,
            polygon_geojson: '1',
            format: 'jsonv2',
        };

        const URL = `https://nominatim.openstreetmap.org/search.php?${new URLSearchParams(
            QUERY_STRING_PARAMS,
        )}`;

        const response = await fetch(URL, { method: 'GET', redirect: 'follow' });

        if (response.status !== 200) {
            return;
        }

        const data: NominatimSearchResult[] = await response.json();
        setListPlace(data);

        // console.log('🚀 ~ file: index.tsx:34 ~ handleInputOnClick ~ data', data);
    }, [searchText]);

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
                    <ul>
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
