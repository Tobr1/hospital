import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
       // Asegúrate de que este valor sea correcto para tu base de datos
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a MongoDB establecida correctamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
  }
};

export default dbConnection;
