const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT;
const PORT2 = process.env.PORT2;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    const message = 'No autorizado';
    res.status(401).json({message});
    return;
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (username !== 'raul' || password !== '1234') {
    res.status(401).send('No autorizado');
    return;
  }

  next();
};

app.get('/sum', auth, async (req, res) => {
  try {
    const { data: { num1, num2 } } = await axios.get(`http://localhost:${PORT2}/random`);
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
