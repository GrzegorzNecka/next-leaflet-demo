import type * as ReactLeaflet from 'react-leaflet';
import type Leaflet from 'leaflet';
import type { LatLngTuple } from 'leaflet';
import type { Geometry } from 'geojson';

type ReactLeafletType = typeof ReactLeaflet;
type LeafletType = typeof Leaflet;

export type MapProps = {
    width: number;
    height: number;
};

export type DynamicMapProps = {
    children: (ReactLeaflet: ReactLeafletType, Leaflet: LeafletType) => React.ReactNode;
    className?: string;
    width: MapProps['width'];
    height: MapProps['height'];
    zoom: number;
    center: LatLngTuple;
};

export type NominatimSearchResult = {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    place_rank: number;
    category: string;
    type: string;
    importance: number;
    icon: string;
    geojson: {
        // type: Geometry;
        type: string;
        coordinates: LatLngTuple;
    };
} | null;

// FeatureCollection['features']
