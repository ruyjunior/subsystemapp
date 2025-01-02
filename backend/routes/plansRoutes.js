const express = require('express');
const router = express.Router();
const db = require('../services/dbService'); // Importa o serviço de banco de dados

// Buscar
router.get('/plans', async (req, res) => {
  try {
    const query = 'SELECT id, valueDeath, valueDeathAccident, valueInvalidityAccident, valueInvaliditySickness, valueMonthlyLot, valueSAF, idPolicie   FROM plans';
    const [data] = await db.promise().execute(query);

    res.json(data);
    console.log('plans:', data);
  } catch (err) {
    console.error('Erro ao buscar plans:', err);
    res.status(500).json({ message: 'Erro ao buscar plans.' });
  }
});

// Criar
router.post('/plans', async (req, res) => {
  const {valueDeath, valueDeathAccident, valueInvalidityAccident, valueInvaliditySickness, valueMonthlyLot, valueSAF, idPolicie } = req.body;
  try {
    const query = 'INSERT INTO plans (valueDeath, valueDeathAccident, valueInvalidityAccident, valueInvaliditySickness, valueMonthlyLot, valueSAF, idPolicie) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.promise().execute(query, [valueDeath, valueDeathAccident, valueInvalidityAccident, valueInvaliditySickness, valueMonthlyLot, valueSAF, idPolicie ]);
    res.status(201).json({ message: 'plano criado com sucesso.', clientId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar plano:', err);
    res.status(500).json({ message: 'Erro ao criar plano.' });
  }
});

// Atualizar
router.put('/plans/:id', async (req, res) => {
  const { id } = req.params;
  const { valueDeath, valueDeathAccident, valueInvalidityAccident, valueInvaliditySickness, valueMonthlyLot, valueSAF, idPolicie } = req.body;
  try {
    const query = 'UPDATE plans SET valueDeath=?, valueDeathAccident=?, valueInvalidityAccident=?, valueInvaliditySickness=?, valueMonthlyLot=?, valueSAF=?, idPolicie=? WHERE id = ?';
    await db.promise().execute(query, [valueDeath, valueDeathAccident, valueInvalidityAccident, valueInvaliditySickness, valueMonthlyLot, valueSAF, idPolicie, id]);
    res.json({ message: 'plano atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar plano:', err);
    res.status(500).json({ message: 'Erro ao atualizar plano.' });
  }
});

// Deletar um usuário
router.delete('/plans/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM plans WHERE id = ?';
    await db.promise().execute(query, [id]);
    res.json({ message: 'plano deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar plano:', err);
    res.status(500).json({ message: 'Erro ao deletar plano.' });
  }
});

module.exports = router;