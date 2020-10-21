const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
const auth = require('./utils/auth');

app.use(cors());

const {
  loginUser,
  signUpUser
} = require('./apis/users');

app.post('/users/login', loginUser);
app.post('/users/register', signUpUser);

exports.api = functions.https.onRequest(app);
