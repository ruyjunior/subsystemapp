const express = require('express');
const router = express.Router();
const db = require('../services/dbService'); // Importa o serviço de banco de dados

// Rota para buscar usuários
router.get('/usuarios', async (req, res) => {
  try {
    const query = 'SELECT id, username, name, level FROM usuarios';
    const [users] = await db.promise().execute(query);

    res.json(users);
    console.log('Usuários:', users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

module.exports = router;
