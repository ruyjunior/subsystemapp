const express = require('express');
const router = express.Router();
const db = require('../services/dbService'); // Importa o serviço de banco de dados

// Buscar
router.get('/proposals', async (req, res) => {
  try {
    const query = 'SELECT id, idClient, idUser, idPolicie, idPlan, idCost, timeStamp FROM proposals';
    const [data] = await db.promise().execute(query);

    res.json(data);
    console.log('Proposta:', data);
  } catch (err) {
    console.error('Erro ao buscar Proposta:', err);
    res.status(500).json({ message: 'Erro ao buscar Proposta.' });
  }
});

// Criar
router.post('/proposals', async (req, res) => {
  const { idClient, idUser, idPolicie, idPlan, idCost } = req.body;
  try {
    const query = 'INSERT INTO proposals (idClient, idUser, idPolicie, idPlan, idCost) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.promise().execute(query, [idClient, idUser, idPolicie, idPlan, idCost ]);
    res.status(201).json({ message: 'Proposta criado com sucesso.', ProposalId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar proposta:', err);
    res.status(500).json({ message: 'Erro ao criar proposta.' });
  }
});

// Atualizar
router.put('/proposals/:id', async (req, res) => {
  const { id } = req.params;
  const { idClient, idUser, idPolicie, idPlan, idCost} = req.body;
  try {
    const query = 'UPDATE proposals SET idClient=?, idUser=?, idPolicie=?, idPlan=?, idCost=? WHERE id = ?';
    await db.promise().execute(query, [idClient, idUser, idPolicie, idPlan, idCost, id]);
    res.json({ message: 'proposta atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar proposta:', err);
    res.status(500).json({ message: 'Erro ao atualizar proposta.' });
  }
});

// Deletar um usuário
router.delete('/proposals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM proposals WHERE id = ?';
    await db.promise().execute(query, [id]);
    res.json({ message: 'proposta deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar proposta:', err);
    res.status(500).json({ message: 'Erro ao deletar proposta.' });
  }
});

module.exports = router;