const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {config} = require('./config/config');
const clienteRutas = require('./rutas/cliente');
const pagoRutas = require('./rutas/pago');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
  origin: config.cors,
  optionsSuccessStatus: 200,
}));

//Routes
clienteRutas(app);

app.listen(process.env.PORT, () => {
  console.log('Servidor escuchando en el puerto', process.env.PORT);
});
