import type * as ReactLeaflet from 'react-leaflet';
import type Leaflet from 'leaflet';
import type { LatLngTuple } from 'leaflet';

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
