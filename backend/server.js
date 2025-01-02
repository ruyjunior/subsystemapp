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
const usersRoutes = require('./routes/usersRoutes'); 
app.use('/api', usersRoutes);

// Rotas de clientes
const clientsRoutes = require('./routes/clientsRoutes'); 
app.use('/api', clientsRoutes);

// Rotas de Lotações
const lotationsRoutes = require('./routes/lotationsRoutes'); 
app.use('/api', lotationsRoutes);

// Rotas de Apolices
const policiesRoutes = require('./routes/policiesRoutes'); 
app.use('/api', policiesRoutes);

// Rotas de Empresas
const companiesRoutes = require('./routes/companiesRoutes'); 
app.use('/api', companiesRoutes);

// Rotas de Planos
const plansRoutes = require('./routes/plansRoutes'); 
app.use('/api', plansRoutes);

// Rotas de Custos
const costsRoutes = require('./routes/costsRoutes'); 
app.use('/api', costsRoutes);

// Rotas de Propostas
const propsRoutes = require('./routes/propsRoutes'); 
app.use('/api', propsRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
