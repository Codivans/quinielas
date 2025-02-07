import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';


const useGetResponse = () => {

    const [resultadosOficiales, setResultadosOficiales] = useState([]);

    useEffect(() => {
         const consultarDocumentos = () => {
             const consultarDatos = query(
                 collection(db, 'resultadosOficiales'),
                 where('jornada', '==', 'Jornada6')
             );

            const unsuscribe = onSnapshot(
                consultarDatos,
                (querySnapshot) => {
                    setResultadosOficiales(querySnapshot.docs.map((documento) => {
                        return { ...documento.data()}
                    }))
                }
            );
            return unsuscribe
         }
         consultarDocumentos();
    }, [])

    return resultadosOficiales;    
}

export default useGetResponse;