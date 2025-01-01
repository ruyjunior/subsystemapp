const express = require('express');
const router = express.Router();
const db = require('../services/dbService'); // Importa o serviço de banco de dados

// Rota para buscar clients
router.get('/clientes', async (req, res) => {
  try {
    const query = 'SELECT id, mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation FROM clients';
    const [clients] = await db.promise().execute(query);

    res.json(clients);
    console.log('Clientes:', clients);
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
    res.status(500).json({ message: 'Erro ao buscar clientes.' });
  }
});

// Criar um novo cliente
router.post('/clientes', async (req, res) => {
  const { mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation } = req.body;
  try {
    const query = 'INSERT INTO clients (mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.promise().execute(query, [mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation ]);
    res.status(201).json({ message: 'Cliente criado com sucesso.', clientId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar cliente:', err);
    res.status(500).json({ message: 'Erro ao criar cliente.' });
  }
});

// Atualizar um usuário
router.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation } = req.body;
  try {
    const query = 'UPDATE clients SET mat = ?, cpf = ?, name = ?, birth = ?, email = ?, phone = ?, phone2 = ?, address=?, city=?, state=?, cep=?, idLotation=? WHERE id = ?';
    await db.promise().execute(query, [mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation, id]);
    res.json({ message: 'Cliente atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar cliente:', err);
    res.status(500).json({ message: 'Erro ao atualizar cliente.' });
  }
});

// Deletar um usuário
router.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM clients WHERE id = ?';
    await db.promise().execute(query, [id]);
    res.json({ message: 'Cliente deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar cliente:', err);
    res.status(500).json({ message: 'Erro ao deletar cliente.' });
  }
});

module.exports = router;