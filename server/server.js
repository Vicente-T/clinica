const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: 'user_id',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    }
}))


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'ippo',
    database: 'authentication',
});

app.post('/register', (req, res) => {
    console.log(req.body);
  
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    
  
    if (!username || !password) {
      return res.status(400).send({ message: 'Username and password are required' });
    }
  
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
  
      db.query("INSERT INTO users (`username`, `password`, `role`) VALUES (?, ?, ?)", [username, hash, role], (err, result) => {
        console.log(err);
    });
    });
  });




const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.send("We need a token, please give it to us next time");
    } else {
        jwt.verify(token, 'supersecret', (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: 'Failed to authenticate' });
            } else {  
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get("/isUserAuth", verifyJWT ,(req, res) => {
    res.send("You are Authenticated");
})



app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post('/login', (req, res) => {
    console.log(req.body);
  
    const username = req.body.username;
    const password = req.body.password;
  
    db.query("SELECT * FROM users WHERE username = ?", 
      username,
      (err, result) => {
      if (err) {
        console.log(err);
      }
  
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({ id }, 'supersecret', {
              expiresIn: 300
            });
            req.session.user = result;

            res.json({ auth: true, token: token, result: result });
          } else {
            res.json({ auth: false, message: 'Wrong password or username' });
          }
        });
      } else {
        res.json({ auth: false, message: 'No user found' });
      }
    });
  });

  app.post('/consultas', (req, res) => {
    console.log(req.body);
  
    const medico = req.body.medico;
    const paciente = req.body.paciente;
    const date = req.body.date;
  
    if (!medico || !paciente || !date) {
      return res.status(400).send({ error: 'Medico, paciente, and date are required' });
    }
  
    db.query("INSERT INTO consulta (`id_medicos`, `id_paciente`, `data`) VALUES (?, ?, ?)", [medico, paciente, date], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: 'Failed to register consulta' });
      }
  
      console.log('Consulta registered successfully');
      res.status(201).send({ message: 'Consulta registered successfully' });
    });
  });

  app.get('/pacientes_ficha', (req, res) => {
    const pacientename = req.params.name;
  
    db.query("SELECT * FROM pacientes WHERE id_pacientes = ?", [pacientename], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: 'Error fetching paciente record' });
      }
  
      if (result.length === 0) {
        return res.status(404).send({ error: 'Paciente not found' });
      }
  
      res.send(result[0]); // Assuming only one patient record is returned
    });
  });


app.listen(3001, () => {
    console.log('Server running on port 3001');
})