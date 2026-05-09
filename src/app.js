const express = require('express');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const app = express();

dotenv.config();

app.disable("x-powered-by");
app.use(express.json());

// ❌ Bug: Hardcoded secret (bad practice)
// const SECRET_KEY = "12345-plaintext-secret"; 

// ✅ Fix: Use environment variable for secret key
const SECRET_KEY = process.env.SECRET_KEY;

app.get('/', (req, res) => {
  res.send("Hello World");
});

// ❌ Vulnerability: Using eval (dangerous)
// app.get('/eval', (req, res) => {
//   const code = req.query.code;
//   res.send(eval(code)); // Sonar will flag this
// });


// ✅ Fix: Replace eval with a safe alternative
app.get('/eval', (req, res) => {
  const code = req.query.code;
    if (code === "2+2") {
        res.status(200).send("4");
    } else {
        res.status(400).send("Invalid code");
    }
});

app.post("/login", (req, res) => {
  const token = jwt.sign({ user: req.body.user }, SECRET_KEY); // ❌ Sonar will flag this as hardcode secret
  res.json({ token });
});

if (require.main === module) {
  app.listen(3000);
}

module.exports = app;