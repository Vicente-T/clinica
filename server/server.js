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
  
    if (!username || !password) {
      return res.status(400).send({ error: 'Username and password are required' });
    }
  
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
  
      db.query("INSERT INTO users (`username`, `password`) VALUES (?, ?)", [username, hash], (err, result) => {
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

app.listen(3001, () => {
    console.log('Server running on port 3001');
})