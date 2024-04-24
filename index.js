const express = require('express');
const { Pool } = require('pg');
const app = express();
const port =4000;

app.use(express.json());
const pool = new Pool({
    user:'postgres',
    host: 'localhost',
    database: 'signos',
    password: 'ds564',
    port: '7007'
})

function calcularIdade(dataNascimento) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = dataNascimento.getMonth();
    if (mesNascimento > mesAtual || (mesNascimento === mesAtual && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  function calcularSigno(mes, dia) {
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) {
      return 'Aquário';
    } else if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) {
      return 'Peixes';
    } else if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
      return 'Áries';
    } else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
      return 'Touro';
    } else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
      return 'Gêmeos';
    } else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
      return 'Câncer';
    } else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
      return 'Leão';
    } else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
      return 'Virgem';
    } else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
      return 'Libra';
    } else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
      return 'Escorpião';
    } else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
      return 'Sagitário';
    } else {
      return 'Capricórnio'; // Caso padrão para os demais dias de dezembro e janeiro
    }
  }

app.get('/usuario', async (req, res)=> {
    try {
        const resultado = await pool.query('SELECT * FROM usuario');
        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows,
        });
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).send('Erro ao obter usuários');
      }
})

app.post('/usuario', async (req, res) => {
    try {
      const { nome, sobrenome, data_nascimento, email, cor_fav } = req.body;
      const dataNascimento = new Date(data_nascimento);
      const idade = calcularIdade(dataNascimento);
      const signo = calcularSigno(dataNascimento.getMonth() + 1, dataNascimento.getDate());
      await pool.query('INSERT INTO usuario (nome, sobrenome, data_nascimento, signo, idade, email, cor_fav) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nome, sobrenome, data_nascimento, signo, idade, email, cor_fav]);
      res.status(201).send({ mensagem: 'Usuário adicionado com sucesso'});
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).send('Erro ao criar usuário');
    }
  });

  app.put('/usuario/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, sobrenome, data_nascimento, email, cor_fav} = req.body;
      const dataNascimento = new Date(data_nascimento);
      const idade = calcularIdade(dataNascimento);
      const signo = calcularSigno(dataNascimento.getMonth() + 1, dataNascimento.getDate());
      await pool.query('UPDATE usuario SET nome = $1, sobrenome =$2, data_nascimento = $3, signo = $4, idade = $5, email = $6, cor_fav = $7 WHERE id = $8', [nome, sobrenome, data_nascimento, signo, idade, email, cor_fav, id]);
      res.status(200).send({ mensagem: 'Usuário atualizado com sucesso'});
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).send('Erro ao atualizar usuário');
    }
  });


  app.delete('/usuario/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
      res.status(200).send({ mensagem: 'Usuário excluído com sucesso'});
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).send('Erro ao excluir usuário');
    }
  });

  app.get('/usuario/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        res.status(404).send({ mensagem: 'Usuário não encontrado' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Erro ao obter usuário por ID:', error);
      res.status(500).send('Erro ao obter usuário por ID');
    }
  });
  

app.get('/',(req, res) =>{
    res.send('Servidor funcionando')
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})