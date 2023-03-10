import { FeatureGroup, LayersControl, TileLayer } from 'react-leaflet';

const openStreetMap = {
    attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

export function OpenStreetLayer() {
    return (
        <>
            <LayersControl.Overlay name="open street map">
                <FeatureGroup>
                    <TileLayer {...openStreetMap} />
                </FeatureGroup>
            </LayersControl.Overlay>
        </>
    );
}
