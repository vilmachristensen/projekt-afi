import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

function Startsida() {

    // Hör till mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoidmlsbWFjaHJpc3RlbnNlbiIsImEiOiJjbGhvbzY5dWoxcml1M2ZveHJ1Y21vMTNwIn0.9VwbYqVIM4EBW9ecpy4VHg';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    // Hör till open data umeå
    const apiKey = 'f13d8a8cff3772ba30a6f2607f6239c55282c3cd102e7a241477be2f';
    const [data, setData] = useState([]);

    // Fetch till open data umeå
    const showData = async () => {
        try {
            const response = await fetch('https://opendata.umea.se/api/v2/catalog/datasets/vandringsleder/records?limit=80', { 
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

    useEffect(() => {
        showData();
    }, []);

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
    
    console.log('Data:');
    console.log(data)

    return(
        <div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Delsträcka</th>
                        <th>Kommun</th>
                        <th>Klass</th>
                        <th>Längd</th>
                        <th>Datum</th>
                        <th>Lon</th>
                        <th>Lat</th>
                    </tr>
                </thead>
                <tbody>
                {data.records ?
                    <> {/* JSX kan också använda div */}
                    {data.records.map((record) =>
                        <tr key={record.record.id}>
                            <td>{record.record.fields.namn}</td>
                            <td>{record.record.fields.delstracka}</td>
                            <td>{record.record.fields.kommun}</td>
                            <td>{record.record.fields.klass}</td>
                            <td>{record.record.fields.langd}</td>
                            <td>{record.record.fields.datum}</td>
                            <td>{record.record.fields.geo_point_2d.lon}</td>
                            <td>{record.record.fields.geo_point_2d.lat}</td>
                        </tr> 
                    )}
                    </> 
                    :
                    <tr>
                        <td>{'-'}</td>
                        <td>{'-'}</td>
                        <td>{'-'}</td>
                        <td>{'-'}</td>
                        <td>{'-'}</td>
                        <td>{'-'}</td>
                        <td>{'-'}</td>
                        <td>{'-'}</td>
                    </tr>

                }
                </tbody>
            </table> 
            <div>
                <div ref={mapContainer} className="map-container" />
            </div>
        </div>
    );
}

export default Startsida;