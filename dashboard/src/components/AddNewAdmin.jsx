import React, { useContext, useState } from "react";
import { Contexto } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AgregarNuevoAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Contexto);

  const [primerNombre, setPrimerNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState("");  // Cambio de 'nic' a 'dni'
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [contrasena, setContrasena] = useState("");

  const navegarA = useNavigate();

  const manejarAgregarNuevoAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/v1/user/admin/addnew",
        { primerNombre, apellido, correo, telefono, dni, fechaNacimiento, genero, contrasena },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        navegarA("/");
        setPrimerNombre("");
        setApellido("");
        setCorreo("");
        setTelefono("");
        setDni("");
        setFechaNacimiento("");
        setGenero("");
        setContrasena("");
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">AGREGAR NUEVO ADMINISTRADOR</h1>
        <form onSubmit={manejarAgregarNuevoAdmin}>
          <div>
            <input
              type="text"
              placeholder="Primer Nombre"
              value={primerNombre}
              onChange={(e) => setPrimerNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Correo Electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <input
              type="number"
              placeholder="Número de Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <input
              type={"date"}
              placeholder="Fecha de Nacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
          <div>
            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="">Seleccionar Género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">AGREGAR NUEVO ADMINISTRADOR</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AgregarNuevoAdmin;
