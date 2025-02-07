import React from "react";
import { Link } from "react-router-dom";
import { LiaNewspaper } from "react-icons/lia";
import { GiPodiumWinner } from "react-icons/gi";
import { ImExit } from "react-icons/im";

export const Navigation = () => {

  return (
    <div className="menu">
          <ul>
            <li>
              <Link to='/quiniela'>
                <LiaNewspaper /><br />
                Quiniela
              </Link>
            </li>
            <li>
              <Link to='/resultados'>
                <GiPodiumWinner /><br />
                Resultados
              </Link>
            </li>
            <li>
              <Link to='/'>
                <ImExit /><br />
                Salir
              </Link>
            </li>
          </ul>
      </div>
  )
}