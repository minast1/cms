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
  getMyComplaints,
  createFeedback
} = require('./apis/complaints');

const {
  addCriminal,
  uploadImage,
  getAllCriminals
} = require('./apis/criminals');

const {
  addCountry,
  getCountries
} = require('./apis/countries');

const {
  addState,
  getStates
} = require('./apis/states');

const {
  addCity,
  getCities
} = require('./apis/cities');

app.get('/police-stations', auth, getAllPoliceStations);

app.get('/user', auth, getUserDetails);
app.post('/users/login', loginUser);
app.post('/users/register', signUpUser);
app.post('/users/profile-picture', auth, uploadProfilePhoto);

app.post('/me/complaints', auth, createComplaint);
app.get('/me/complaints', auth, getMyComplaints);

app.post('/feedback', createFeedback);

app.post('/criminals', addCriminal);
app.post('/criminals/images', uploadImage);
app.get('/criminals', getAllCriminals);

app.post('/countries', auth, addCountry);
app.get('/countries', auth, getCountries);

app.post('/states', auth, addState);
app.get('/states', auth, getStates);

app.post('/cities', auth, addCity);
app.get('/cities', auth, getCities);

exports.api = functions.https.onRequest(app);
