var Geohash = require('geohash');

var MAX_EXTENT = 20037508.34;
var M_TO_DEG = 180 / MAX_EXTENT;
var DEG_TO_M = MAX_EXTENT / 180;
var DEG_TO_RAD = Math.PI / 180;
var RAD_TO_DEG = 180 / Math.PI;

function convertLon900913To4326(lon) {
    return lon * M_TO_DEG;
}

function convertLat900913To4326(lat) {
    lat = lat * M_TO_DEG;
    return 2 * Math.atan(Math.exp(lat * DEG_TO_RAD)) * RAD_TO_DEG - 90;
}

function convertLon4326To900913(lon) {
    return lon * DEG_TO_M;
}

function convertLat4326To900913(lat) {
    lat = Math.log(Math.tan((90 + lat) * DEG_TO_RAD / 2)) * RAD_TO_DEG;
    lat = Math.max(-MAX_EXTENT, Math.min(MAX_EXTENT, lat));
    return lat * DEG_TO_M;
}

function convert4326to900913(lonLat) {
    return {
        lon: convertLon4326To900913(lonLat.lon),
        lat: convertLat4326To900913(lonLat.lat),
    };
}

function convert900913to4326(lonLat) {
    return {
        lon: convertLon900913To4326(lonLat.lon),
        lat: convertLat900913To4326(lonLat.lat),
    };
}

function geoHashToLonLat(geohash, convertSrid) {
    var decodedGeohash = Geohash.decode(geohash);
    var lonLat = {
        lat: decodedGeohash.latitude[2],
        lon: decodedGeohash.longitude[2],
    };

    if (convertSrid)
        lonLat = convertSrid(lonLat);

    return lonLat;
}

module.exports = {
    MAX_EXTENT: MAX_EXTENT,
    convertLon900913To4326: convertLon900913To4326,
    convertLat900913To4326: convertLat900913To4326,
    convertLon4326To900913: convertLon4326To900913,
    convertLat4326To900913: convertLat4326To900913,
    convert4326to900913: convert4326to900913,
    convert900913to4326: convert900913to4326,
    geoHashToLonLat: geoHashToLonLat,

};