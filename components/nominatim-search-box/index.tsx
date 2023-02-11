import type { NominatimSearchResult } from '@/types/leaflet';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

type SearchBoxProps = {
    setSelectPlace: Dispatch<SetStateAction<NominatimSearchResult>>;
};

export const NominatimSearchBox = ({ setSelectPlace }: SearchBoxProps) => {
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

        console.log('🚀 ~ file: index.tsx:34 ~ handleInputOnClick ~ data', data);
    }, [searchText]);

    return (
        <div className="p-2">
            <div>
                <div className="flex justify-between gap-2">
                    <div className="w-full">
                        <input
                            className="form-control
                            h-full
                            block
                            w-full
                            px-2
                            py-1
                            text-sm
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="wyszukaj, miasto, adres, obiekt"
                            value={searchText}
                            onChange={(event) => {
                                setSearchText(event.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <button
                            className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            onClick={handleInputOnClick}>
                            Wyszukaj
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <ul>
                        {listPlace.map((place) => {
                            return (
                                <div className="flex justify-center" key={place?.place_id}>
                                    <li
                                        className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900"
                                        onClick={() => {
                                            setSelectPlace(place);
                                        }}>
                                        <p
                                            className="block
                                            text-xs
                                            px-6
                                            py-2
                                            border-b border-gray-200
                                            w-full
                                            hover:bg-gray-100 hover:text-gray-500
                                            focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
                                            transition
                                            duration-500
                                            cursor-pointer">
                                            {place?.display_name}
                                        </p>
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
