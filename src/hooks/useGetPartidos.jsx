import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';


const useGetPartidos = () => {

    const [dataQuiniela, setDataQuiniela] = useState([]);
    useEffect(() => {
         const consultarDocumentos = () => {
             const consultarDatos = query(
                 collection(db, 'partidos'),
                 where('jornada', '==', 'Jornada6')
             );

            const unsuscribe = onSnapshot(
                consultarDatos,
                (querySnapshot) => {
                    setDataQuiniela(querySnapshot.docs.map((documento) => {
                        return { ...documento.data()}
                    }))
                }
            );
            return unsuscribe
         }
         consultarDocumentos();
    }, [])

    return dataQuiniela;    
}

export default useGetPartidos;