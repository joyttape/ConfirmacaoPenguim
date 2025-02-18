import React, { useState } from 'react';

const ConfirmacaoPresenca = () => {
  const [nomePinguim, setNomePinguim] = useState('');
  const [email, setEmail] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nomePinguim && email && confirmacao) {
      try {
        const response = await fetch('http://localhost:5000/enviar-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nomePinguim, email, confirmacao }),
        });

        if (response.ok) {
          setMensagem(`Pinguim ${nomePinguim} ativado com sucesso! E-mail enviado para ${email}.`);
        } else {
          setMensagem('Erro ao enviar o e-mail. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        setMensagem('Erro ao enviar o e-mail. Tente novamente.');
      }
    } else {
      setMensagem('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div>
      <h1>Confirmação de Presença</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Pinguim:
          <input
            type="text"
            value={nomePinguim}
            onChange={(e) => setNomePinguim(e.target.value)}
          />
        </label>
        <br />
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirmar Presença:
          <label>
            <input
              type="radio"
              name="confirmacao"
              value="Sim"
              onChange={(e) => setConfirmacao(e.target.value)}
            /> Sim
          </label>
          <label>
            <input
              type="radio"
              name="confirmacao"
              value="Não"
              onChange={(e) => setConfirmacao(e.target.value)}
            /> Não
          </label>
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default ConfirmacaoPresenca;