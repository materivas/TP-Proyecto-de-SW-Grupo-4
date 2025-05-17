const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Ruta al archivo JSON de propiedades
const dataPath = path.join(__dirname, '../database/propiedades_airbnb.json');

// GET /api/propiedades → devuelve todas las propiedades
router.get('/', (req, res) => {
  try {
    const propiedades = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    res.json(propiedades);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer propiedades' });
  }
});

// Ruta de prueba para ver que funcione
router.get('/ping', (req, res) => {
  res.send('pong');
});

module.exports = router;
