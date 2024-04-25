const express = require('express');
const axios = require('axios');
const basicAuth = require('basic-auth');
require('dotenv').config();
const cors = require('cors');


const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

//Función para authBasic
const auth = (req, res, next) => {
  const credentials = basicAuth(req);
  if (!credentials || credentials.name !== 'raul' || credentials.pass !== '1234') {
    res.status(401).send('No autorizado');
  } else {
    next();
  }
};

//llama al endpoint con un parámetro mas de auth
app.get('/sum', auth, async (req, res) => {
  try {

    const { data: { num1, num2 } } = await axios.get('http://localhost:6001/random');
    const suma = num1 + num2;
    res.json({ suma });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al sumar los números' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de suma corriendo en http://localhost:${PORT}`);
});
