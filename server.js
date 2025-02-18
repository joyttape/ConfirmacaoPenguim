const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: 'joaopedrogundimg@gmail.com',
      pass: 'tqda wnmz aynm kclo',
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });


app.post('/enviar-email', async (req, res) => {
  const { nomePinguim, email, confirmacao } = req.body;

  const mailOptions = {
    from: 'seu-email@gmail.com',
    to: email,
    subject: 'Confirmação de Presença',
    text: `Olá Pinguim: ${nomePinguim}, sua confirmação de presença foi registrada como "${confirmacao}". Obrigado!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ message: 'Erro ao enviar e-mail.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});