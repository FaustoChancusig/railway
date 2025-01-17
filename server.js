const express = require('express');
const conexion = require('./java/conexion'); // Importar la conexión
const app = express();
const PORT = 3000;

// Configurar middleware para archivos estáticos
app.use(express.static('public'));

// Ruta de prueba de conexión
app.get('/test-db', (req, res) => {
  conexion.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) {
      console.error('Error ejecutando consulta: ' + err.stack);
      res.status(500).send('Error conectando a la base de datos');
    } else {
      res.send(`Conexión exitosa. Resultado: ${results[0].resultado}`);
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});