const express = require('express');
const router = express.Router();
const db = require('../services/dbService'); // Importa o serviço de banco de dados

// Buscar
router.get('/costs', async (req, res) => {
  try {
    const query = 'SELECT id, age, valueTitular, valueTitularCouple, numberPlan, idPolicie FROM costs';
    const [data] = await db.promise().execute(query);

    res.json(data);
    console.log('costs:', data);
  } catch (err) {
    console.error('Erro ao buscar costs:', err);
    res.status(500).json({ message: 'Erro ao buscar costs.' });
  }
});

// Criar
router.post('/costs', async (req, res) => {
  const { age, valueTitular, valueTitularCouple, numberPlan, idPolicie } = req.body;
  try {
    const query = 'INSERT INTO costs (age, valueTitular, valueTitularCouple, numberPlan, idPolicie) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.promise().execute(query, [age, valueTitular, valueTitularCouple, numberPlan, idPolicie ]);
    res.status(201).json({ message: 'cost criado com sucesso.', costId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar cost:', err);
    res.status(500).json({ message: 'Erro ao criar cost.' });
  }
});

// Atualizar
router.put('/costs/:id', async (req, res) => {
  const { id } = req.params;
  const { age, valueTitular, valueTitularCouple, numberPlan, idPolicie } = req.body;
  try {
    const query = 'UPDATE costs SET age=?, valueTitular=?, valueTitularCouple=?, numberPlan=?, idPolicie=? WHERE id = ?';
    await db.promise().execute(query, [age, valueTitular, valueTitularCouple, numberPlan, idPolicie, id]);
    res.json({ message: 'cost atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar cost:', err);
    res.status(500).json({ message: 'Erro ao atualizar cost.' });
  }
});

// Deletar
router.delete('/costs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM costs WHERE id = ?';
    await db.promise().execute(query, [id]);
    res.json({ message: 'cost deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar cost:', err);
    res.status(500).json({ message: 'Erro ao deletar cost.' });
  }
});
module.exports = router;