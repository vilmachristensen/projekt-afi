import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

function Startsida() {

    // Hör till mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoibGlubmVhbmlsc3NvbjAwIiwiYSI6ImNsaDh1NGlsazAxM3Mza3FmY3c4eG15ZDUifQ.5_Re7kERjjj5yg7rjtEBqQ';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lng = 20.26;
    const lat = 63.83;
    const zoom = 15;

    const [coordinatesArray, setCoordinatesArray] = useState([]);

    // Hör till open data umeå
    const apiKey = 'f13d8a8cff3772ba30a6f2607f6239c55282c3cd102e7a241477be2f';
    const [data, setData] = useState([]);

    // Fetch till open data umeå
    const showData = async () => {
        try {
            const response = await fetch('https://opendata.umea.se/api/v2/catalog/datasets/vandringsleder/records?limit=8', { 
                headers: {
                    'Authorization': 'Apikey ' + apiKey,
                    'Content-Type': 'application/json',
                },
            });
 
            console.log('Response:');
            console.log(response);

            const result = await response.json();

            console.log('Json:');
            console.log(result);

            setData(result);
        }
        catch (error) {
            console.error(error);
        }
    }; 

        //useEffect som updaterar kartan med dem nya koordinaterna
        useEffect(() => {
            if(!map.current || !lng || !lat)
                return;
                
                const updateMap = () => {
                    coordinatesArray.map((coordinate) => {
                        const el = document.createElement('div');
                        el.className = 'marker';
                        const marker = new mapboxgl.Marker(el)
                        .setLngLat([coordinate[0], coordinate[1]])
                        .addTo(map.current);
                        console.log("Marker är satt");

                        map.current.flyTo({center: [coordinate[0], coordinate[1]], zoom});
                    })   
                }
                
                updateMap();
    
        }, [coordinatesArray, zoom])

    //useEffect som visar resultat från fetch från Open API Umeå
    useEffect(() => {
        showData();
    }, []);

    //useEffect som initialiserar kartan med default koordinater
    useEffect(() => {
        if (map.current)
            return;
        
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    });

    console.log(lng)
    console.log(lat)
   
    console.log('Data:');
    console.log(data)

    return(
        <div>
            <div className="overlay">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Namn</th>
                            {/*<th>Delsträcka</th>
                            <th>Kommun</th>
                            <th>Klass</th>
                            <th>Längd</th>
                            <th>Datum</th>
                            <th>Lon</th>
                            <th>Lat</th>*/}
                            <th>Välj</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.records ?
                        <> {/* JSX kan också använda div */}
                        {data.records.map((record) =>
                            <tr key={record.record.id}>
                                <td>{record.record.fields.namn}</td>
                                {/*<td>{record.record.fields.delstracka}</td>
                                <td>{record.record.fields.kommun}</td>
                                <td>{record.record.fields.klass}</td>
                                <td>{record.record.fields.langd}</td>
                                <td>{record.record.fields.datum}</td>
                                <td>{record.record.fields.geo_point_2d.lon}</td>
                                <td>{record.record.fields.geo_point_2d.lat}</td>*/}
                                <td>
                                    <a href = "#"
                                    onClick={() => {
                                        setCoordinatesArray(record.record.fields.geo_shape.geometry.coordinates)
                                    }}
                                    >Välj</a>
                                </td>        
                            </tr>
                        )}
                        </> 
                        :
                        <tr>
                            <td>{'-'}</td>
                            <td>{'-'}</td>
                            {/*<td>{'-'}</td>
                            <td>{'-'}</td>
                            <td>{'-'}</td>
                            <td>{'-'}</td>
                            <td>{'-'}</td>
                            <td>{'-'}</td>
                            <td>{'-'}</td>*/}
                        </tr>
                    }
                    </tbody>
                </table> 
            </div>
            <div>
                <div ref={mapContainer} className="map-container" />
            </div>
        </div>
    );
}

export default Startsida;