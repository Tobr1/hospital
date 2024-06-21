import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Contexto } from "../main";
import { Navigate } from "react-router-dom";

const Mensajes = () => {
  const [mensajes, setMensajes] = useState([]);
  const { estaAutenticado } = useContext(Contexto);
  
  useEffect(() => {
    const obtenerMensajes = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMensajes(data.mensajes);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    obtenerMensajes();
  }, []);

  if (!estaAutenticado) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>MENSAJES</h1>
      <div className="banner">
        {mensajes && mensajes.length > 0 ? (
          mensajes.map((elemento) => {
            return (
              <div className="card" key={elemento._id}>
                <div className="details">
                  <p>
                    Nombre: <span>{elemento.firstName}</span>
                  </p>
                  <p>
                    Apellido: <span>{elemento.lastName}</span>
                  </p>
                  <p>
                    Correo electrónico: <span>{elemento.email}</span>
                  </p>
                  <p>
                    Teléfono: <span>{elemento.phone}</span>
                  </p>
                  <p>
                    Mensaje: <span>{elemento.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>¡No hay mensajes!</h1>
        )}
      </div>
    </section>
  );
};

export default Mensajes;