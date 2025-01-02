const express = require('express');
const router = express.Router();
const db = require('../services/dbService'); // Importa o serviço de banco de dados

// Buscar
router.get('/policies', async (req, res) => {
  try {
    const query = 'SELECT id, number, idCompany FROM policies';
    const [data] = await db.promise().execute(query);

    res.json(data);
    console.log('policies:', data);
  } catch (err) {
    console.error('Erro ao buscar policies:', err);
    res.status(500).json({ message: 'Erro ao buscar policies.' });
  }
});

// Criar
router.post('/policies', async (req, res) => {
  const { number, idCompany } = req.body;
  try {
    const query = 'INSERT INTO policies (number, idCompany) VALUES (?, ?)';
    const [result] = await db.promise().execute(query, [number, idCompany]);
    res.status(201).json({ message: 'Apolice criada com sucesso.', clientId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar Apolice:', err);
    res.status(500).json({ message: 'Erro ao criar Apolice.' });
  }
});

// Atualizar
router.put('/policies/:id', async (req, res) => {
  const { id } = req.params;
  const { number, idCompany } = req.body;
  try {
    const query = 'UPDATE policies SET number = ?, idCompany = ? WHERE id = ?';
    await db.promise().execute(query, [number, idCompany, id]);
    res.json({ message: 'Apolice atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar Apolice:', err);
    res.status(500).json({ message: 'Erro ao atualizar Apolice.' });
  }
});

// Deletar
router.delete('/policies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM policies WHERE id = ?';
    await db.promise().execute(query, [id]);
    res.json({ message: 'Apolice deletada com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar Apolice:', err);
    res.status(500).json({ message: 'Erro ao deletar Apolice.' });
  }
});
module.exports = router;