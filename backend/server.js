const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = require('./services/dbService'); 

// Rotas de autenticação
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Rotas de usuários
const userRoutes = require('./routes/userRoutes'); 
app.use('/api', userRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
