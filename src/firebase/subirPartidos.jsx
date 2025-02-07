// import { getUnixTime } from 'date-fns';
import { db } from './firebaseConfig';
import { doc, setDoc, deleteDoc  } from "firebase/firestore";

const subirPartidos = async ({catalogo,jornada}) => {
    await setDoc(doc(db, 'partidos', `${jornada}`), {
        timestamp: new Date(),
        partidos: catalogo
      });
}

export default subirPartidos;