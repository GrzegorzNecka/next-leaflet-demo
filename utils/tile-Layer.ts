export const openStreetMap = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

export const mapTilerMapBasic = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: `https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=WkCD73XaamNJAsOYL0Y4`,
};

export const mapTilerMapToner = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://api.maptiler.com/maps/toner/256/{z}/{x}/{y}.png?key=WkCD73XaamNJAsOYL0Y4',
};

export const mapTilerMapStreet = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=WkCD73XaamNJAsOYL0Y4',
};

export const stamenTonerLite = {
    attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png',
    url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
};
