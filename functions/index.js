const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
const auth = require('./utils/auth');

app.use(cors());

const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUserDetails
} = require('./apis/users');

const {
  getAllPoliceStations
} = require('./apis/policeStations');

const {
  createComplaint,
  getMyComplaints
} = require('./apis/complaints');

app.get('/police-stations', auth, getAllPoliceStations);

app.get('/user', auth, getUserDetails);
app.post('/users/login', loginUser);
app.post('/users/register', signUpUser);
app.post('/users/profile-picture', auth, uploadProfilePhoto);

app.post('/me/complaints', auth, createComplaint);
app.get('/me/complaints', auth, getMyComplaints);

exports.api = functions.https.onRequest(app);
