import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import dbConnection from './database/dbConnection.js';
import cloudinary from 'cloudinary';

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Llamar a la función para conectar a la base de datos
dbConnection();

// Configurar rutas, middlewares, etc.
// Ejemplo:
// app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
