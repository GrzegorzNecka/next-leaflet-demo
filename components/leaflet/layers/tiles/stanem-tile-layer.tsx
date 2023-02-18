import { FeatureGroup, LayersControl, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

/**
 *
 * @mstanem: http://maps.stamen.com/
 *
 */

export const stamenTonerLite = {
    attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png',
    url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
};

export function StanemLayer() {
    return (
        <>
            <LayersControl.Overlay checked name="stanem map composition">
                <FeatureGroup>
                    <TileLayer {...stamenTonerLite} />
                </FeatureGroup>
            </LayersControl.Overlay>
        </>
    );
}
