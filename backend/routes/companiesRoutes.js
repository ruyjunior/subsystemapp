const express = require('express');
const router = express.Router();
const db = require('../services/dbService'); // Importa o serviço de banco de dados

// buscar
router.get('/companies', async (req, res) => {
  try {
    const query = 'SELECT id, name, cnpj FROM companies';
    const [data] = await db.promise().execute(query);

    res.json(data);
    console.log('companies:', data);
  } catch (err) {
    console.error('Erro ao buscar companies:', err);
    res.status(500).json({ message: 'Erro ao buscar companies.' });
  }
});

// Criar
  router.post('/companies', async (req, res) => {
  const { name, cnpj } = req.body;
  try {
    const query = 'INSERT INTO companies (name, cnpj) VALUES (?, ?)';
    const [result] = await db.promise().execute(query, [name, cnpj ]);
    res.status(201).json({ message: 'Empresa criada com sucesso.', clientId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar empresa:', err);
    res.status(500).json({ message: 'Erro ao criar empresa.' });
  }
});

// Atualizar
router.put('/companies/:id', async (req, res) => {
  const { id } = req.params;
  const { name, cnpj } = req.body;
  try {
    const query = 'UPDATE companies SET name=?, cnpj=? WHERE id = ?';
    await db.promise().execute(query, [name, cnpj, id]);
    res.json({ message: 'Empresa atualizada com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar Empresa:', err);
    res.status(500).json({ message: 'Erro ao atualizar Empresa.' });
  }
});

// Deletar um usuário
router.delete('/companies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM companies WHERE id = ?';
    await db.promise().execute(query, [id]);
    res.json({ message: 'Empresa deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar Empresa:', err);
    res.status(500).json({ message: 'Erro ao deletar Empresa.' });
  }
});
module.exports = router;