import { useEffect, useState } from "react";
import { json } from "react-router";

function Startsida() {
    //var data = [];
    const apiKey = 'f13d8a8cff3772ba30a6f2607f6239c55282c3cd102e7a241477be2f';
    const [data, setData] = useState([]);
    const showData = async () => {
        try {
            const response = await fetch('https://opendata.umea.se/api/v2/catalog/datasets/vandringsleder/records', { 
                //mode: 'cors',
                headers: {
                    'Authorization': 'Apikey ' + apiKey,
                    'Content-Type': 'application/json',
                },
            });


            /*
            if(!jsonData.ok){
                throw new Error(`Error! status: ${jsonData.status}`);
            }
            */
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

    return(
        
        /*
        <table className='table table-striped'>
               <thead>
                   <tr>
                       <th>Namn</th>
                       <th>Delsträcka</th>
                       <th>Kommun</th>
                       <th>Klass</th>
                       <th>Längd</th>
                       <th>Datum</th>
                   </tr>
               </thead>
               <tbody>
                   {data.records.map(info =>
                       <tr key={info.recordid}>
                           <td>{info.namn}</td>
                           <td>{info.delstracka}</td>
                           <td>{info.kommun}</td>
                           <td>{info.klass}</td>
                           <td>{info.langd}</td>
                           <td>{info.datum}</td>
                       </tr>
                   )}
               </tbody>
           </table>  
           */
          <p>Startsida</p>
           
    );
}

export default Startsida;