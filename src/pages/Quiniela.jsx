import { useState } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Navigation } from './../componentes/Navigation';
import toast, { Toaster } from 'react-hot-toast';

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

const Quiniela = () => {
  const [selecciones, setSelecciones] = useState({});
  const navigate = useNavigate();
  const user = auth.currentUser;
  const dataQuiniela = useGetPartidos();

  const manejarCambio = (id, valor) => {
    setSelecciones((prev) => ({ ...prev, [id]: valor }));
  };

  const enviarQuiniela = async () => {
    if (!user) {
      toast.error('Debes iniciar sesion!');
      navigate("/")
      return;
    }


    try {
      await addDoc(collection(db, "quinielas"), {
        userId: user.uid,
        nombre: user.displayName,
        selecciones,
        jornada: dataQuiniela.length > 0 ? dataQuiniela[0].jornada : '',
        timestamp: new Date()
      });
      toast.success('Guardada, Suerte!')
      navigate("/resultados");
    } catch (error) {
      console.error("Error al enviar la quiniela: ", error);
    }
  };



  return (
    <div className="content_quiniela">
      {dataQuiniela.length > 0 ? <h2>{dataQuiniela[0].jornada}</h2> : ''}
      <div className="cabecera_header">
        <div className="content_header">
          <div><h2>Local</h2></div>
          <div><h2>Empate</h2></div>
          <div><h2>Visitante</h2></div>
        </div>
      </div>
      
      <div>
          {
            dataQuiniela.length > 0 ? (
              dataQuiniela[0].partidos.map((p) => {
                return(
                  <div className="row_partidos" key={p.partido}>
                    <div className="column_partido">
                      <div className="equipo_name">
                        <img src={imgEquipo(p.local)}/>
                        <p>{p.local}</p>
                      </div>
                      
                      <input type="radio" name={`partido-${p.partido}`} onChange={() => manejarCambio(p.partido, "local")} />
                    </div>
    
                    <div className="column_partido">
                      <div className="equipo_name center_equipo">
                        <h4>VS</h4>
                      </div>
                      <input type="radio" name={`partido-${p.partido}`} onChange={() => manejarCambio(p.partido, "empate")} />
                    </div>
    
                    <div className="column_partido">
                      <div className="equipo_name">
                        <img src={imgEquipo(p.visitante)}/>
                        <p>{p.visitante}</p>
                      </div>
                      <input type="radio" name={`partido-${p.partido}`} onChange={() => manejarCambio(p.partido, "visitante")} />
                    </div>
                
                  </div>
                )
              })
            ):('')}
            
      </div>
      <button className='btn_send' onClick={enviarQuiniela}>Enviar Quiniela</button>
      <Navigation />
      
    </div>
  );
};

export default Quiniela;
