const express = require('express');
const cors = require('cors');
require('dotenv').config();

const categoriasRoutes = require('./routes/categoriasRoutes');
const equiposRoutes = require('./routes/equiposRoutes');
const partidosRoutes = require('./routes/partidosRoutes');
const goleadoresRoutes = require('./routes/goleadoresRoutes');
const sancionesRoutes = require('./routes/sancionesRoutes');

const app = express();
app.use(cors({
  origin: 'https://partidos-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/categorias', categoriasRoutes);
app.use('/equipos', equiposRoutes);
app.use('/partidos', partidosRoutes);
app.use('/goleadores', goleadoresRoutes);
app.use('/sanciones', sancionesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));