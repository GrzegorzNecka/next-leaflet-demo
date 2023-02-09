import type { NominatimSearchResult } from '@/types/leaflet';
import type { Geometry } from 'geojson';
import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Marker, Popup, useMap, GeoJSON, Polyline } from 'react-leaflet';

/**
 *
 *  Place Output: https://nominatim.org/release-docs/3.4.2/api/Output/#boundingbox
 *
 */

type NominatimOutputProps = {
    selectedPlace: NominatimSearchResult;
};

export function NominatimOutput({ selectedPlace }: NominatimOutputProps) {
    const map = useMap();

    const [geojsonType, setGeosjonType] = useState<string | null>(null);

    const initialGeojsonType = selectedPlace?.geojson?.type;
    const boundingbox = selectedPlace?.boundingbox;

    const position: LatLngExpression = [
        parseFloat(selectedPlace?.lat!),
        parseFloat(selectedPlace?.lon!),
    ];

    useEffect(() => {
        if (!selectedPlace || !initialGeojsonType || !boundingbox) {
            return;
        }

        setGeosjonType(selectedPlace.geojson.type);

        const searchBounds = [
            [parseFloat(boundingbox[0]), parseFloat(boundingbox[2])],
            [parseFloat(boundingbox[1]), parseFloat(boundingbox[3])],
        ];

        map.fitBounds(searchBounds as LatLngBoundsExpression, {
            padding: [20, 20],
            maxZoom: 14,
        });
    }, [initialGeojsonType, boundingbox?.[0]]);

    if (!selectedPlace || !geojsonType) {
        return null;
    }

    if (geojsonType === 'Point') {
        return (
            <>
                <Marker key={`${selectedPlace.place_id}_point`} position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </>
        );
    }
    if (geojsonType === 'Polygon') {
        return (
            <>
                <GeoJSON
                    key={`${selectedPlace.place_id}_polygon`}
                    data={selectedPlace.geojson as Geometry}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </GeoJSON>
            </>
        );
    }

    if (geojsonType === 'MultiLineString')
        return (
            <>
                <GeoJSON
                    key={`${selectedPlace.place_id}_multiline`}
                    data={selectedPlace.geojson as Geometry}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </GeoJSON>
            </>
        );
    return null;
}
