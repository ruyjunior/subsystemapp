const express = require('express');
const router = express.Router();
const db = require('../services/dbService'); // Importa o serviço de banco de dados

// Buscar
router.get('/lotations', async (req, res) => {
  try {
    const query = 'SELECT id, name FROM lotations';
    const [data] = await db.promise().execute(query);

    res.json(data);
    console.log('lotations:', data);
  } catch (err) {
    console.error('Erro ao buscar Lotação:', err);
    res.status(500).json({ message: 'Erro ao buscar lotations.' });
  }
});

// Criar
router.post('/lotations', async (req, res) => {
  const { name } = req.body;
  try {
    const query = 'INSERT INTO lotations (name) VALUES (?)';
    const [result] = await db.promise().execute(query, [name]);
    res.status(201).json({ message: 'lotation criado com sucesso.', clientId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar lotation:', err);
    res.status(500).json({ message: 'Erro ao criar lotation.' });
  }
});

// Atualizar
router.put('/lotations/:id', async (req, res) => {
  const { id } = req.params;
  const {  name } = req.body;
  try {
    const query = 'UPDATE lotations SET name = ? WHERE id = ?';
    await db.promise().execute(query, [name, id]);
    res.json({ message: 'lotation atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar lotation:', err);
    res.status(500).json({ message: 'Erro ao atualizar lotation.' });
  }
});

// Deletar
router.delete('/lotations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM lotations WHERE id = ?';
    await db.promise().execute(query, [id]);
    res.json({ message: 'lotation deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar lotation:', err);
    res.status(500).json({ message: 'Erro ao deletar lotation.' });
  }
});

module.exports = router;