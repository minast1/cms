const { admin, db} = require('./admin');

module.exports = (request, response, next) => {
    let idToken;
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        idToken = request.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return response.status(403).json({ message: 'Unauthorized' });
    }
    admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
        request.user = decodedToken;
        const res = db.collection('users').where('userId', '==', request.user.uid).limit(1).get();
        return res;
    })
    .then(res => {
        console.log(res.query.docs);
        request.user.username = res.docs[0].data().email;
        request.user.imageUrl = res.docs[0].data().imageUrl;
        return next();
    })
    .catch(err => {
        console.error('Error while verifying the token', err);
        return response.status(403).json({ message: err});
    })
}