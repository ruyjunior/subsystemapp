const express = require('express');
const router = express.Router();
const db = require('../services/dbService'); // Importa o serviço de banco de dados

// Rota para buscar usuários
router.get('/usuarios', async (req, res) => {
  try {
    const query = 'SELECT id, username, name, level, cpf FROM users';
    const [users] = await db.promise().execute(query);

    res.json(users);
    console.log('Usuários:', users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

// Criar um novo usuário
router.post('/usuarios', async (req, res) => {
  const { username, name, level, password, cpf } = req.body;
  try {
    const query = 'INSERT INTO users (username, name, level, password, cpf) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.promise().execute(query, [username, name, level, password, cpf ]);
    res.status(201).json({ message: 'Usuário criado com sucesso.', userId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
});

// Atualizar um usuário
router.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { username, name, level, password, cpf } = req.body;
  try {
    const query = 'UPDATE users SET username = ?, name = ?, level = ?, password = ?, cpf = ? WHERE id = ?';
    await db.promise().execute(query, [username, name, level, password, cpf, id]);
    res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
});

// Deletar um usuário
router.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM users WHERE id = ?';
    await db.promise().execute(query, [id]);
    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
});

module.exports = router;
