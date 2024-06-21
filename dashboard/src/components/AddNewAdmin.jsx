import React, { useContext, useState } from "react";
import { Contexto } from "../main";  // Variable 'Context' traducida a 'Contexto'
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AgregarNuevoAdmin = () => {  // Constante 'AddNewAdmin' traducida a 'AgregarNuevoAdmin'
  const { isAuthenticated, setIsAuthenticated } = useContext(Contexto);  // Variables 'isAuthenticated' y 'setIsAuthenticated' traducidas

  const [primerNombre, setPrimerNombre] = useState("");  // Variable 'firstName' traducida a 'primerNombre'
  const [apellido, setApellido] = useState("");  // Variable 'lastName' traducida a 'apellido'
  const [correo, setCorreo] = useState("");  // Variable 'email' traducida a 'correo'
  const [telefono, setTelefono] = useState("");  // Variable 'phone' traducida a 'telefono'
  const [dni, setDni] = useState("");  // Variable 'nic' traducida a 'nic'
  const [fechaNacimiento, setFechaNacimiento] = useState("");  // Variable 'dob' traducida a 'fechaNacimiento'
  const [genero, setGenero] = useState("");  // Variable 'gender' traducida a 'genero'
  const [contrasena, setContrasena] = useState("");  // Variable 'password' traducida a 'contrasena'

  const navegarA = useNavigate();  // Variable 'navigateTo' traducida a 'navegarA'

  const manejarAgregarNuevoAdmin = async (e) => {  // Función 'handleAddNewAdmin' traducida a 'manejarAgregarNuevoAdmin'
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/admin/addnew",
          { primerNombre, apellido, correo, telefono, nic, fechaNacimiento, genero, contrasena },  // Variables pasadas al cuerpo de la solicitud traducidas
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
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
    return <Navigate to={"/login"} />;  // Constante 'Navigate' traducida a 'Navigate'
  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
      <img src="/logo.png" alt="logo" className="logo"/>
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
              value={nic}
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
