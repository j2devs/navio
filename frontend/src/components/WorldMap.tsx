import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibmV4aWVzLSIsImEiOiJjbWZqeXBjeTUwejVpMmxzYXNhdzhxcjI5In0.xyDCRW5NKC_DLCYP3y7Ilw';

const WorldMap: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-34.435);
    const [lat, setLat] = useState(37.379);
    const [zoom, setZoom] = useState(1.58);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            projection: {name: 'globe'}
        });

        map.current.on('move', () => {
            setLng(Number(map.current!.getCenter().lng.toFixed(4)));
            setLat(Number(map.current!.getCenter().lat.toFixed(4)));
            setZoom(Number(map.current!.getZoom().toFixed(2)));
        });

        map.current.on('load', () => {
            map.current!.setFog({}); // Set the default atmosphere style
        });
    });

    return (<div>
        <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container"/>
    </div>);
};

export default WorldMap;
