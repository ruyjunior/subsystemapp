CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    matricula VARCHAR(50),
    nome VARCHAR(100),
    nascimento DATE,
    cpf VARCHAR(14),
    email VARCHAR(100),
    telefone1 VARCHAR(20),
    telefone2 VARCHAR(20),
    grupo VARCHAR(50),
    logradouro VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    id_lotacao INT
);

CREATE TABLE lotacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100)
);

CREATE TABLE empresas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_fantasia VARCHAR(100),
    cnpj VARCHAR(18)
);

CREATE TABLE apolices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(50)
);

CREATE TABLE plano (
    id INT PRIMARY KEY AUTO_INCREMENT,
    valormorte DECIMAL(10,2),
    valormorteAcidente DECIMAL(10,2),
    valorinvalidezAcidente DECIMAL(10,2),
    valorinvalidezDoenca DECIMAL(10,2),
    valorsorteiomensal DECIMAL(10,2),
    valorsaf DECIMAL(10,2),
    id_apolice INT
);

CREATE TABLE custos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    valortitular DECIMAL(10,2),
    valorTitularConjugue DECIMAL(10,2),
    id_plano INT
);

CREATE TABLE propostas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_apolice INT,
    id_plano INT,
    id_custos INT
);

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    cpf VARCHAR(14)
);
