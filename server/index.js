const express = require('express');
const app = express();
const PORT = 3000;
const propiedadesRoutes = require('../routes/propiedades');

app.use(express.json());
app.use('/api/propiedades', propiedadesRoutes);

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
