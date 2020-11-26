const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
const auth = require('./utils/auth');

app.use(cors());

const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUserDetails,
  sendCode,
  updateProfile
} = require('./apis/users');

const {
  getAllPoliceStations, addPoliceStation
} = require('./apis/policeStations');

const {
  createComplaint,
  getMyComplaints,
  createFeedback
} = require('./apis/complaints');

const {
  addCriminal,
  uploadImage,
  getAllCriminals,
  getCriminal
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

const {
  addCourtType,
  getCourtTypes,
  addCourt
} = require('./apis/courts');

const {
  uploadArticleBook,
  addArticleBook,
  getArticleBooks
} = require('./apis/articleBooks');

const {
  addCrimeCategory,
  getCrimeCategories
} = require('./apis/crimeCategories');

app.post('/police-stations', auth, addPoliceStation);
app.get('/police-stations', auth, getAllPoliceStations);

app.get('/user', auth, getUserDetails);
app.post('/users/login', loginUser);
app.post('/users/register', signUpUser);
app.post('/users/profile-picture', auth, uploadProfilePhoto);
app.post('/users/password-reset', auth, sendCode);
app.post('/users/update', auth, updateProfile);

app.post('/me/complaints', auth, createComplaint);
app.get('/me/complaints', auth, getMyComplaints);

app.post('/feedback', createFeedback);

app.post('/criminals', auth, addCriminal);
app.post('/criminals/images', uploadImage);
app.get('/criminals', getAllCriminals);
app.get('/criminals/:id', getCriminal);

app.post('/countries', auth, addCountry);
app.get('/countries', getCountries);

app.post('/states', auth, addState);
app.get('/states', getStates);

app.post('/cities', auth, addCity);
app.get('/cities', getCities);

app.post('/police/register', auth, signUpUser);

app.post('/court-types', auth, addCourtType);
app.get('/court-types', auth, getCourtTypes);

app.post('/courts', auth, addCourt);

app.post('/article-books/add', auth, addArticleBook);
app.post('/article-books/upload', auth, uploadArticleBook);
app.get('/article-books', auth, getArticleBooks);

app.post('/crime-categories', auth, addCrimeCategory);
app.get('/crime-categories', auth, getCrimeCategories);

exports.api = functions.https.onRequest(app);
