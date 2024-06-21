const { MongoClient } = require('mongodb');

// URL de conexión a tu instancia de MongoDB
const uri = 'mongodb://localhost:27017/Hospital';

// Función para conectar a MongoDB usando el cliente MongoClient
async function conectarMongoDB() {
  try {
    // Crear una instancia del cliente MongoClient con las opciones adecuadas
    const cliente = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Conectar al servidor de MongoDB
    await cliente.connect();

    console.log('Conexión a MongoDB establecida correctamente');

    // Devolver el cliente conectado para que pueda ser utilizado
    return cliente;
  } catch (error) {
    // Manejar cualquier error de conexión
    console.error('Error al conectar a MongoDB:', error);
    throw error; // Lanzar el error para que sea capturado por el código que llama a esta función
  }
}



  


// Exportar la función conectarMongoDB para que pueda ser utilizada por otros módulos
module.exports = conectarMongoDB;



