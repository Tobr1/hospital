import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Contexto } from "../main";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Contexto);

  // Estados para los datos del nuevo doctor
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [dni, setDni] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [password, setPassword] = useState("");
  const [doctorEspecialidad, setDoctorEspecialidad] = useState("");
  const [docFoto, setDocFoto] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  // Lista de departamentos para seleccionar
  const departamentosArray = [
    "Pediatría",
    "Ortopedia",
    "Cardiología",
    "Neurología",
    "Oncología",
    "Radiología",
    "Terapia Física",
    "Dermatología",
    "ENT",
  ];

  // Función para manejar la carga de la foto del doctor
  const manejarFoto = (e) => {
    const archivo = e.target.files[0];
    const lector = new FileReader();
    lector.readAsDataURL(archivo);
    lector.onload = () => {
      setDocAvatarPreview(lector.result);
      setDocFoto(archivo);
    };
  };

  // Función para registrar un nuevo doctor
  const registrarNuevoDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("apellido", apellido);
      formData.append("email", email);
      formData.append("celular", celular);
      formData.append("password", password);
      formData.append("dni", dni);
      formData.append("fechaNacimiento", fechaNacimiento);
      formData.append("genero", genero);
      formData.append("doctorEspecialidad", doctorEspecialidad);
      formData.append("docFoto", docFoto);
      await axios
        .post("http://localhost:4000/api/v1/user/doctor/addnew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setNombre("");
          setApellido("");
          setEmail("");
          setCelular("");
          setDni("");
          setFechaNacimiento("");
          setGenero("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Redirección si el usuario no está autenticado
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container add-doctor-form">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">REGISTRAR UN NUEVO DOCTOR</h1>
        <form onSubmit={registrarNuevoDoctor}>
          <div className="first-wrapper">
            <div>
              <img
                src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"}
                alt="Avatar del Doctor"
              />
              <input type="file" onChange={manejarFoto} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
              <input
                type="text"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Número de Teléfono"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
              />
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
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option value="">Seleccionar Género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={doctorEspecialidad}
                onChange={(e) => setDoctorEspecialidad(e.target.value)}
              >
                <option value="">Seleccionar Especialidad</option>
                {departamentosArray.map((departamento, index) => {
                  return (
                    <option value={departamento} key={index}>
                      {departamento}
                    </option>
                  );
                })}
              </select>
              <button type="submit">Registrar Nuevo Doctor</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;
