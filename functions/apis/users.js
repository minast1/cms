const { admin, db } = require('../utils/admin');
const config = require('../utils/config');
const firebase = require('firebase');

firebase.initializeApp(config);

const { validateLoginData, validateSignUpData} = require('../utils/validators');

exports.loginUser = (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    };

    const { valid, errors } = validateLoginData(user);
    if (!valid) {
        return response.status(400).json(errors);
    }

    firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
        return data.user.getIdToken();
    })
    .then((token) => {
        return response.status(200).json({ token });
    })
    .catch((error) => {
        console.error(error);
        return response.status(403).json({ general: 'Incorrect credentials. Please try again!' });
    });
};

exports.signUpUser = (request, response) => {
    const newUser = {
        fullName: request.body.fullName,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
        dateOfBirth: request.body.dateOfBirth,
        addressLine1: request.body.addressLine1,
        addressLine2: request.body.addressLine2,
        city: request.body.city,
        province: request.body.province,
        country: request.body.country,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        userType: 'resident'
    };

    const { errors, valid } = validateSignUpData(newUser);

    if (!valid) {
        return response.status(400).json(errors);
    }

    let token, userId;

    db
    .doc(`/users/${newUser.email}`)
    .get()
    .then(document => {
        if (document.exists) {
            return response.status(400).json({ username: "this email is already taken" });
        }else{
            return firebase.auth().createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            );
        }
    })
    .then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then(idToken => {
        token = idToken;
        const userCredentials = {
            fullName: newUser.fullName,
            dateOfBirth: newUser.dateOfBirth,
            city: newUser.city,
            email: newUser.email,
            country: newUser.country,
            phoneNumber: newUser.phoneNumber,
            province: newUser.province,
            addressLine1: newUser.addressLine1,
            addressLine2: newUser.addressLine2 ? newUser.addressLine2 : null,
            createdAt: new Date().toISOString(),
            userId
        };
        return db
        .doc(`/users/${newUser.email}`)
        .set(userCredentials);
    })
    .then(() => {
        return response.status(201).json({ token });
    })
    .catch(err => {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
            return response.status(400).json({ email: "Email is already in use" });
        } else {
            return response.status(500).json({ general: "Something went wrong. Please try again" });
        }
    });
};

deleteImage = (imageName) => {
    const bucket = admin.storage().bucket();
    const path = `${imageName}`;
    return bucket.file(path).delete().then(() => {
        return;
    }).catch(error => {
        return;
    });
}

exports.uploadProfilePhoto = (request, response) => {
    const Busboy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new Busboy({headers: request.headers});

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (filedName, file, fileName, encoding, mimeType) => {
        if (mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
            return response.status(400).json({ error: 'Wrong file type submitted' });
        }
        const imageExtension =fileName.split('.')[fileName.split('.').length-1];
        imageFileName = `${request.user.email}.${imageExtension}`;
        const filePath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filePath, mimeType };
        file.pipe(fs.createWriteStream(filePath));
    });
    deleteImage(imageFileName);
    busboy.on('finish', () => {
        admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filePath, {
            resumable: false,
            metadata: {
                contentType: imageToBeUploaded.mimeType
            }
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
            return db.doc(`users/${request.user.email}`).update({
                imageUrl
            });
        })
        .then(() => {
            return response.json({ message: 'Image uploaded successfully' });
        })
        .catch(err => {
            console.error(err);
            return response.status(400).json({ error: err.code });
        });
    });
    busboy.end(request.rawBody);
}


exports.getUserDetails = (request, response) => {
    let userData = {};
    db
    .doc(`/users/${request.user.email}`)
    .get()
    .then(doc => {
        if (doc.exists) {
            userData.userCredentials = doc.data();
            return response.json(userData);
        }
    })
    .catch(err => {
        console.error(err);
        return response.status(500).json({ error: err.code });
    })
}