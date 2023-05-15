import React, { useEffect, useState } from 'react';
import { json } from "react-router";

function Startsida() {
    const apiKey = 'f13d8a8cff3772ba30a6f2607f6239c55282c3cd102e7a241477be2f';
    const [data, setData] = useState([]);

    const showData = async () => {
        try {
            const response = await fetch('https://opendata.umea.se/api/v2/catalog/datasets/vandringsleder/records', { 
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
    
    console.log('Data:');
    console.log(data)

    /*
    console.log('Data.record:');
    for(var i = 0; i <= data.length; i++){
        console.log(data.records[i]);
    }
    */

    return(
        
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
                    <>
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


           
        //KOLLA UPP: Varför funkade det inte att använda <div>-taggar istället för <>?


/*
{data.length > 0 &&

    <tr>
                        <td>{'Laddar'}</td>
                        <td>{'Laddar'}</td>
                        <td>{Laddar}</td>
                        <td>{Laddar}</td>
                        <td>{Laddar}</td>
                        <td>{Laddar}</td>
                        <td>{Laddar}</td>
                        <td>{Laddar}</td>
                    </tr>
*/


           /*
        <div>
        <>
        <ul>
            {data.records.map((record) => (
                <React.Fragment key={record.record.id}>
                <li>{record.record.fields.namn}</li>
                <li>{record.record.fields.delstracka}</li>
                <li>{record.record.fields.kommun}</li>
                </React.Fragment>
            ))}
        </ul>
        </>
        </div>
        */

    );
}

export default Startsida;