const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const SECRET_KEY = 'seu_segredo';

app.use(cors());
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin', // Seu usuário do MySQL
  password: 'admin', // Sua senha do MySQL
  database: 'subsystem' // Nome do banco de dados
});

// Verificar conexão
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados');
  }
});

// Rota de login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = 'SELECT * FROM usuarios WHERE username = ?';
    const [users] = await db.promise().execute(query, [username]);
  
    if (users.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = users[0];
    //const passwordMatch = await bcrypt.compare(password, user.senha);
    const passwordMatch = (password === user.password);

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
        level: user.level
      },
    });  
  } catch (err) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/api/usuarios', async (req, res) => {
  try {
    const query = 'SELECT id, username, name, level FROM usuarios';
    const [users] = await db.promise().execute(query);

    res.json(users);
    console.log(users)
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
