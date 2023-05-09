import { useEffect, useState } from "react";

function Startsida() {
    //var data = [];
    const [data, setData] = useState([]);
    const showData = async () => {
        try {
            const response = fetch('https://opendata.umea.se/api/records/1.0/search/?dataset=vandringsleder&q=&facet=namn&facet=delstracka&facet=klass&facet=langd', { 
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Hej');
            console.log(await response);
            setData(response);
            //console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        showData();
    }, []);
        
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
                   </tr>
               </thead>
               <tbody>
                   {data.map(info =>
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
    );
}

export default Startsida;