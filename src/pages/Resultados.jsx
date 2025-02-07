import { useState, useEffect } from "react";
import { Navigation } from "../componentes/Navigation";
import useGetResultados from './../hooks/useGetResultados';
import useGetResponse from "../hooks/useGetResponse";


const Resultados = () => {
  const quinielas = useGetResultados();
  const resultadosOficiales = useGetResponse();
  const [resultados, setResultados] = useState([]);

  const calcularAciertos = (quinielas, resultadosOficiales) => {
    // Crear un mapa para evitar duplicados basados en timestamp
    const quinielasUnicas = new Map();
  
    quinielas.forEach(quiniela => {
      const idUnico = `${quiniela.timestamp.seconds}-${quiniela.timestamp.nanoseconds}`;
      
      // Si el timestamp ya está en el mapa, no lo agregamos (evita duplicados)
      if (!quinielasUnicas.has(idUnico)) {
        quinielasUnicas.set(idUnico, quiniela);
      }
    });
  
    // Convertimos el mapa a un array y procesamos cada quiniela
    const resultadoFinal = Array.from(quinielasUnicas.values()).map(quiniela => {
      const resultado = resultadosOficiales.find(res => res.jornada === quiniela.jornada);
  
      if (!resultado) {
        return {
          nombre: quiniela.nombre,
          userId: quiniela.userId,
          jornada: quiniela.jornada,
          timestamp: quiniela.timestamp,
          selecciones: quiniela.selecciones,
          aciertos: 0,
          detalles: {},
        };
      }
  
      let aciertos = 0;
      let detalles = {};
  
      Object.keys(quiniela.selecciones).forEach(partido => {
        const prediccion = quiniela.selecciones[partido];
        const resultadoOficial = resultado.selecciones[partido];
  
        if (prediccion === resultadoOficial) {
          aciertos++;
          detalles[partido] = { seleccion: prediccion, correcta: true };
        } else {
          detalles[partido] = { seleccion: prediccion, correcta: false };
        }
      });
  
      return {
        nombre: quiniela.nombre,
        userId: quiniela.userId,
        jornada: quiniela.jornada,
        timestamp: quiniela.timestamp,
        selecciones: quiniela.selecciones,
        aciertos,
        detalles
      };
    });
  
    // Ordenar de mayor a menor aciertos
    return resultadoFinal.sort((a, b) => b.aciertos - a.aciertos);
  };

  useEffect(() => {
    const nuevosResultados = calcularAciertos(quinielas, resultadosOficiales);
    setResultados(nuevosResultados); // Sobrescribe en vez de agregar duplicados
  }, [quinielas, resultadosOficiales]);




  return (
    <div className="content_resultados">
      <h2>Resultados</h2>
      <p className="txt_bolsa">Bolsa acumulada: $ {resultados.length * 20}</p>

      {
        resultados.map((item, index) => {
          return(
            <div className="row_lugar" key={index}>
              <div className="position"><span className="txt_position">{index + 1}</span></div>
              <h4 className="name_user">{item.nombre || "Desconocido"}</h4>
              <div className="aciertos"><span>{item.aciertos}</span> Aciertos</div>
            </div>
          )
        })
      }
      
      {/* {quinielas.map((q, index) => {
        let aciertos = 0;
        Object.keys(resultadosOficiales).forEach(id => {
          if (q.selecciones[id] === resultadosOficiales[id]) {
            aciertos++;
          }
        });

        return (
          <div className="row_lugar" key={index}>
            <div className="position"><span className="txt_position">{index + 1}</span></div>
            <h4 className="name_user">{q.nombre || "Desconocido"}</h4>
            <div className="aciertos"><span>{aciertos}</span> Aciertos</div>
          </div>
        );
      })} */}


      <Navigation />
    </div>
  );
};

export default Resultados;
