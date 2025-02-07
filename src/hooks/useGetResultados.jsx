import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';


const useGetResultados = () => {

    const [quinielas, setQuinielas] = useState([]);

    useEffect(() => {
         const consultarDocumentos = () => {
             const consultarDatos = query(
                 collection(db, 'quinielas'),
                 where('jornada', '==', 'Jornada6')
             );

            const unsuscribe = onSnapshot(
                consultarDatos,
                (querySnapshot) => {
                    setQuinielas(querySnapshot.docs.map((documento) => {
                        return { ...documento.data()}
                    }))
                }
            );
            return unsuscribe
         }
         consultarDocumentos();
    }, [])

    return quinielas;    
}

export default useGetResultados;