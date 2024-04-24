-- Criação do banco de dados 'aula'
CREATE DATABASE signos;

-- Conecta ao banco de dados 'aula'
\c signos;

-- Criação da tabela 'usuarios'
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    signo VARCHAR(20) NOT NULL,
    idade VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cor_fav VARCHAR(50) NOT NULL
);
