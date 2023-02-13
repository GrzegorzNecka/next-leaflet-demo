export type PositionControls = {
    bottomleft: 'leaflet-bottom leaflet-left';
    bottomright: 'leaflet-bottom leaflet-right';
    topleft: 'leaflet-top leaflet-left';
    topright: 'leaflet-top leaflet-right';
};

export type PositionControlsValues = PositionControls[keyof PositionControls];

export const POSITION_CONTROLS: PositionControls = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
};

export type PositionControlsKeys = keyof typeof POSITION_CONTROLS;
