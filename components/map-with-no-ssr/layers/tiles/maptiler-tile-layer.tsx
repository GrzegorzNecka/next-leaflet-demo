import { FeatureGroup, LayersControl, TileLayer } from 'react-leaflet';

/**
 *
 * @maptiler: https://cloud.maptiler.com/maps/
 *
 */

const mapTilerMapBasic = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: `https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=WkCD73XaamNJAsOYL0Y4`,
};

const mapTilerMapToner = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://api.maptiler.com/maps/toner/256/{z}/{x}/{y}.png?key=WkCD73XaamNJAsOYL0Y4',
};

const mapTilerMapStreet = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=WkCD73XaamNJAsOYL0Y4',
};

export function MaptilerLayer() {
    return (
        <>
            <LayersControl.Overlay checked name="maptiler composition">
                <FeatureGroup>
                    <TileLayer {...mapTilerMapStreet} />
                </FeatureGroup>
            </LayersControl.Overlay>
        </>
    );
}
