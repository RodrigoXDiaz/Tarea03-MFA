const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      totp_secret TEXT
    )
  `);
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const secret = speakeasy.generateSecret({
    name: `MFA-App (${email})`
  });

  qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
    if (err) return res.send('Error generando QR');

    db.run(
      'INSERT INTO users (email, password, totp_secret) VALUES (?, ?, ?)',
      [email, hashedPassword, secret.base32],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            return res.send('Ya existe un usuario con ese email.');
          }
          return res.send('Error guardando usuario.');
        }

        res.render('verify', {
          qrCode: data_url,
          secret: null,
          email: null
        });
      }
    );
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.send('Usuario no encontrado');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.send('Contraseña incorrecta');

    res.render('verify', { qrCode: null, secret: null, email: email });
  });
});

app.post('/verify', (req, res) => {
  const { email, token } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) return res.send('Usuario no encontrado');

    const verified = speakeasy.totp.verify({
      secret: user.totp_secret,
      encoding: 'base32',
      token
    });

    if (!verified) {
      return res.send('Código inválido. Intenta nuevamente.');
    }

    res.redirect('/dashboard');
  });
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
