const express = require('express');
const router = express.Router();
const db = require('../services/dbService'); // Importa o serviço de banco de dados

// Buscar todos
router.get('/clients', async (req, res) => {
  try {
    const query = 'SELECT id, mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation FROM clients';
    const [clients] = await db.promise().execute(query);

    res.json(clients);
    console.log('clients:', clients);
  } catch (err) {
    console.error('Erro ao buscar clients:', err);
    res.status(500).json({ message: 'Erro ao buscar clients.' });
  }
});

// Buscar Um
router.get('/clients/:mat', async (req, res) => {
  try {
    const { mat } = req.params; // Captura a Matricula da URL
    const query = 'SELECT id, mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation FROM clients WHERE mat = ?';
    const [client] = await db.promise().execute(query, [mat]); // Passa o ID como parâmetro

    if (client.length === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    res.json(client[0]); // Retorna o cliente encontrado
    console.log('Cliente:', client[0]);
  } catch (err) {
    console.error('Erro ao buscar cliente:', err);
    res.status(500).json({ message: 'Erro ao buscar Cliente.' });
  }
});

// Criar
router.post('/clients', async (req, res) => {
  const { mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation } = req.body;
  try {
    const query = 'INSERT INTO clients (mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.promise().execute(query, [mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation ]);
    res.status(201).json({ message: 'clients criado com sucesso.', clientId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar clients:', err);
    res.status(500).json({ message: 'Erro ao criar clients.' });
  }
});

// Atualizar
router.put('/clients/:id', async (req, res) => {
  const { id } = req.params;
  const { mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation } = req.body;
  try {
    const query = 'UPDATE clients SET mat = ?, cpf = ?, name = ?, birth = ?, email = ?, phone = ?, phone2 = ?, address=?, city=?, state=?, cep=?, idLotation=? WHERE id = ?';
    await db.promise().execute(query, [mat, cpf, name, birth, email, phone, phone2, address, city, state, cep, idLotation, id]);
    res.json({ message: 'clients atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar clients:', err);
    res.status(500).json({ message: 'Erro ao atualizar clients.' });
  }
});

// Deletar
router.delete('/clients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM clients WHERE id = ?';
    await db.promise().execute(query, [id]);
    res.json({ message: 'clients deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar clients:', err);
    res.status(500).json({ message: 'Erro ao deletar clients.' });
  }
});

module.exports = router;