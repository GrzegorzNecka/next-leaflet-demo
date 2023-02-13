import LayersCustomControlProvider from '@/context/custom-layer-control-context';
import { TileLayer } from 'react-leaflet';
import ControlledLayer from './controlled-layer';

export default function CustomLayerControl() {
    return (
        <LayersCustomControlProvider position="topright">
            <ControlledLayer checked name="OpenStreetMap" group="Base Layers">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </ControlledLayer>

            <ControlledLayer name="OpenStreetMap B&W" group="Layer Group">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                />
            </ControlledLayer>
        </LayersCustomControlProvider>
    );
}
