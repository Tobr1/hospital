import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Contexto } from "../main";
import { useNavigate } from "react-router-dom";

const BarraLateral = () => {
  const [mostrar, setMostrar] = useState(false);

  const { estaAutenticado, setEstaAutenticado } = useContext(Contexto);

  const cerrarSesion = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEstaAutenticado(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navegar = useNavigate();

  const irAInicio = () => {
    navegar("/");
    setMostrar(!mostrar);
  };
  const irAMedicos = () => {
    navegar("/doctors");
    setMostrar(!mostrar);
  };
  const irAMensajes = () => {
    navegar("/messages");
    setMostrar(!mostrar);
  };
  const irAAgregarNuevoMedico = () => {
    navegar("/doctor/addnew");
    setMostrar(!mostrar);
  };
  const irAAgregarNuevoAdmin = () => {
    navegar("/admin/addnew");
    setMostrar(!mostrar);
  };

  return (
    <>
      <nav
        style={!estaAutenticado ? { display: "none" } : { display: "flex" }}
        className={mostrar ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={irAInicio} />
          <FaUserDoctor onClick={irAMedicos} />
          <MdAddModerator onClick={irAAgregarNuevoAdmin} />
          <IoPersonAddSharp onClick={irAAgregarNuevoMedico} />
          <AiFillMessage onClick={irAMensajes} />
          <RiLogoutBoxFill onClick={cerrarSesion} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!estaAutenticado ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setMostrar(!mostrar)} />
      </div>
    </>
  );
};

export default BarraLateral;