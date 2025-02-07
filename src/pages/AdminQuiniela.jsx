import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Navigation } from './../componentes/Navigation';

import CRUZAZUL from './../assets/CRUZ AZUL.png'
import CHIVAS from './../assets/CHIVAS.png'
import AMERICA from './../assets/AMERICA.png'
import JUAREZ from './../assets/JUAREZ.png'
import ATLAS from './../assets/ATLAS.png'
import PACHUCA from './../assets/PACHUCA.png'
import QUERETARO from './../assets/QUERETARO.png'
import TIJUANA from './../assets/TIJUANA.png'

import MONTERREY from './../assets/MONTERREY.png'
import TOLUCA from './../assets/TOLUCA.png'
import NECAXA from './../assets/NECAXA.png'
import TIGRES from './../assets/TIGRES.png'
import SANTOS from './../assets/SANTOS.png'
import PUEBLA from './../assets/PUEBLA.png'
import SANLUIS from './../assets/SAN LUIS.png'
import PUMAS from './../assets/PUMAS.png'
import MAZATLAN from './../assets/MAZATLAN.png'
import LEON from './../assets/LEON.png';
import useGetPartidos from './../hooks/useGetPartidos';


const imgEquipo = (equipo) => {
  if(equipo === 'Cruz Azul'){
    return CRUZAZUL
  }else if(equipo === 'Chivas'){
    return CHIVAS
  }else if(equipo === 'America'){
    return AMERICA
  }else if(equipo === 'Juarez'){
    return JUAREZ
  }else if(equipo === 'Atlas'){
    return ATLAS
  }else if(equipo === 'Pachuca'){
    return PACHUCA
  }else if(equipo === 'Queretaro'){
    return QUERETARO
  }else if(equipo === 'Tijuana'){
    return TIJUANA
  }else if(equipo === 'Monterrey'){
    return MONTERREY
  }else if(equipo === 'Necaxa'){
    return NECAXA
  }else if(equipo === 'Toluca'){
    return TOLUCA
  }else if(equipo === 'Tigres'){
    return TIGRES
  }else if(equipo === 'Santos'){
    return SANTOS
  }else if(equipo === 'Puebla'){
    return PUEBLA
  }else if(equipo === 'San Luis'){
    return SANLUIS
  }else if(equipo === 'Pumas'){
    return PUMAS
  }else if(equipo === 'Mazatlan'){
    return MAZATLAN
  }else if(equipo === 'Leon'){
    return LEON
  }
}

const AdminQuiniela = () => {
  const [selecciones, setSelecciones] = useState({});
  const [resultadosGuardados, setResultadosGuardados] = useState({});
  const navigate = useNavigate();
  const user = auth.currentUser;
  const dataQuiniela = useGetPartidos();

  useEffect(() => {
    if (dataQuiniela.length > 0) {
      obtenerResultadosGuardados(dataQuiniela[0].jornada);
    }
  }, [dataQuiniela]);

  // Función para obtener los resultados ya guardados en Firestore
  const obtenerResultadosGuardados = async (jornada) => {
    try {
      const docRef = doc(db, "resultadosOficiales", jornada);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setResultadosGuardados(docSnap.data().selecciones || {});
      } else {
        setResultadosGuardados({});
      }
    } catch (error) {
      console.error("Error al obtener los resultados: ", error);
    }
  };

  const manejarCambio = (id, valor) => {
    setSelecciones((prev) => ({ ...prev, [id]: valor }));
  };

  const enviarResultados = async () => {
    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    const jornada = dataQuiniela.length > 0 ? dataQuiniela[0].jornada : "";
    if (!jornada) {
      alert("No hay jornada disponible");
      return;
    }

    try {
      const docRef = doc(db, "resultadosOficiales", jornada);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Si la jornada ya existe, actualizar los resultados
        await updateDoc(docRef, {
          selecciones: { ...docSnap.data().selecciones, ...selecciones }
        });
      } else {
        // Si la jornada no existe, crear un nuevo documento
        await setDoc(docRef, {
          jornada,
          selecciones
        });
      }

      alert("Resultados guardados correctamente");
      obtenerResultadosGuardados(jornada);
      setSelecciones({});
    } catch (error) {
      console.error("Error al guardar los resultados: ", error);
    }
  };

  console.log(resultadosGuardados, dataQuiniela)




  return (
    <div className="content_quiniela">
      {dataQuiniela.length > 0 ? <h2>{dataQuiniela[0].jornada}</h2> : ''}
      <p className="txt_bolsa">Resultados: {resultadosGuardados.length}</p>
      <div className="cabecera_header">
        <div className="content_header">
          <div><h2>Local</h2></div>
          <div><h2>Empate</h2></div>
          <div><h2>Visitante</h2></div>
        </div>
      </div>

      <div>
        {dataQuiniela.length > 0 ? (
          dataQuiniela[0].partidos.map((p) => (
            <div className="row_partidos" key={p.partido}>
              <div className="column_partido">
                <div className="equipo_name">
                  <p>{p.local}{p.partido}</p>
                </div>
                <input 
                    type="radio" 
                    name={`partido-${p.partido}`} 
                    checked={selecciones[p.partido] === "local"} 
                    onChange={() => manejarCambio(p.partido, "local")} 
                />
              </div>

              <div className="column_partido">
                <div className="equipo_name center_equipo">
                  <h4>VS</h4>
                </div>
                <input 
                    type="radio" 
                    name={`partido-${p.partido}`} 
                    checked={selecciones[p.partido] === "empate"} 
                    onChange={() => manejarCambio(p.partido, "empate")} 
                />
              </div>

              <div className="column_partido">
                <div className="equipo_name">
                  <p>{p.visitante}</p>
                </div>
                <input 
                    type="radio" 
                    name={`partido-${p.partido}`} 
                    checked={selecciones[p.partido] === "visitante"} 
                    onChange={() => manejarCambio(p.partido, "visitante")} 
                    />
              </div>
            </div>
          ))
        ) : null}
      </div>

      <button className='btn_send' onClick={enviarResultados}>Guardar Resultados</button>
      <Navigation />
    </div>
  );
};

export default AdminQuiniela;
