const mysql = require('mysql2');

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

module.exports = db;