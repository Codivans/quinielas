import { useState } from 'react';
import * as XLSX from 'xlsx';
import subirPartidos from '../firebase/subirPartidos';
// import { Header_master } from '../components/Header_master';
// import { SiMicrosoftexcel } from 'react-icons/si';
// import toast from 'react-hot-toast';

export const CargarPartidos = () => {

    const [catalogo, setCatalogo] = useState([]);
    const [jornada, setJornada] = useState('');


    const readExcel = (file) =>{
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const buffeArray = e.target.result;
                const wb = XLSX.read(buffeArray, {type: 'buffer'});
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data=XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror = (error) => {
                reject(error)
                // toast.error(error);
            };
        });

        promise.then((d) => {
            setCatalogo(d);
            // toast.success('Se cargo el catalogo correctamente!');
        });
    };

    const handleClick = async() => {
        try {
            if(catalogo.length > 0){
                await subirPartidos ({catalogo, jornada});
                setCatalogo([]);
                // toast.success('¡Carga completada!')
                console.log('Completo')
            }else{
                // toast.error('No hay datos que subir. Carga primero los datos')
                console.log('mal')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const jornadas = [
        'Jornada1', 'Jornada2', 'Jornada3', 'Jornada4', 'Jornada5', 'Jornada6',
        'Jornada7', 'Jornada8', 'Jornada9', 'Jornada10', 'Jornada11', 'Jornada12',
        'Jornada13', 'Jornada14', 'Jornada15', 'Jornada16', 'Jornada17'
    ]


    console.log(catalogo, jornada)


  return (
    <>
        <div className='content_master'>
            {
                catalogo.length > 0 ? (
                    <div>
                        <div className='header_table_catalogo'>
                            <span>Total de renglones: {catalogo?.length}</span>
                            <button onClick={handleClick}>Subir</button>
                        </div>
                        

                        <table className='table_catalogo'>
                            <thead>
                                <caption>
                                    <select
                                        value={jornada}
                                        onChange={(e) => setJornada(e.target.value)}
                                    >
                                        {
                                            jornadas.map((item) => {
                                                return(
                                                    <option key={item} value={item}>{item}</option>
                                                )
                                            })
                                        }
                                        
                                    </select>
                                </caption>
                                <tr>
                                    <th>Partido</th>
                                    <th>Local</th>
                                    <th>Visitante</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    catalogo.map((product) => {
                                        return(
                                            <tr key={product.partido}>
                                                <td>{product.partido}</td>
                                                <td>{product.local}</td>
                                                <td>{product.visitante}</td>                                               
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <label onChange={(e) => {const file = e.target.files[0]; readExcel(file);}} className='btn-file'>
                        <div>
                            {/* <SiMicrosoftexcel /> <br/> */}
                            <span>Cargar Catálogo</span>
                            <input hidden accept=".xlsx" multiple type="file" />
                        </div>
                    </label>

                )
            }
        </div>
    </>
  )
}
