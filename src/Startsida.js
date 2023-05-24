import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

function Startsida() {

    // Hör till mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoibGlubmVhbmlsc3NvbjAwIiwiYSI6ImNsaDh1NGlsazAxM3Mza3FmY3c4eG15ZDUifQ.5_Re7kERjjj5yg7rjtEBqQ';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(20.26);
    const [lat, setLat] = useState(63.83);
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

    //Funktion som sätter koordinaterna till dem inskickade
    const setCoordinates = (chosenLng, chosenLat) => {
        setLat(chosenLat)
        setLng(chosenLng)
        setZoom(15)


        console.log('koordinaten är satt')
        console.log(lng)
        console.log(lat)
    }

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

    //useEffect som updaterar kartan med dem nya koordinaterna
    useEffect(() => {
        if(!map.current || !lng || !lat)
            return;
            
            const updateMap = () => {
                map.current.flyTo({center: [lng, lat], zoom});
                const marker = new mapboxgl.Marker({ color: 'green'})
                .setLngLat([lng, lat])
                .addTo(map.current);
                console.log("Marker är satt");
            }
            
            updateMap();

    }, [lng, lat, zoom])
    
   
    console.log('Data:');
    console.log(data)


    console.log('lat:')
    console.log(lat)
    console.log('lng:')
    console.log(lng)

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
                        <th>Välj</th>
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
                            <td>
                                <a href = "#"
                                onClick={() => {
                                    record.record.fields.geo_shape.geometry.coordinates.map(
                                        (coordinate, i) => {
                                            setTimeout(() => {
                                                setCoordinates(coordinate[0], coordinate[1]);
                                            }, 3000);
                                        }
                                );
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


//  <td><a href ="#" onClick={() => setCoordinates(record.record.fields.geo_point_2d.lon, record.record.fields.geo_point_2d.lat)}>Välj</a></td>


// {data.records.record.fields.geo_shape.coordinates.map((coordinate) =>
// <td><a href ="#" onClick={() => setCoordinates(coordinate[i], coordinate[i+1])}>Välj</a></td>
//)}

// {record.record.fields.geo_shape.geometry.coordinates.map((coordinate, i) => 
//<td key={i}><a href ="#" onClick={() => setCoordinates(coordinate[0], coordinate[1])}>Välj</a></td>
//)} 
