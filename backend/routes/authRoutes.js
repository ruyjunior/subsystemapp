const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../services/dbService'); // Conexão com o banco
const SECRET_KEY = 'seu_segredo';

// Rota de Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM usuarios WHERE username = ?';
    const [users] = await db.promise().execute(query, [username]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = users[0];
    // Para senhas criptografadas, use bcrypt.compare
    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, name: user.name, level: user.level },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login bem-sucedido.',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        level: user.level,
      },
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;