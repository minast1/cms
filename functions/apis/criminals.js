const { db, admin } = require('../utils/admin');
const config = require('../utils/config');

exports.addCriminal = async (request, response) => {
    try {
        if (request.body.fullName.trim() === '') {
            return response.status(400).json({ message: 'fullName Must not be empty' });
        }
    
        if (request.body.height.trim() === '') {
            return response.status(400).json({ message: 'height Must not be empty' });
        }
    
        if (request.body.weight.trim() === '') {
            return response.status(400).json({ message: 'weight Must not be empty' });
        }
        if (request.body.phoneNumber.trim() === '') {
            return response.status(400).json({ message: 'phoneNumber Must not be empty' });
        }
        if (request.body.dateOfBirth.trim() === '') {
            return response.status(400).json({ message: 'dateOfBirth Must not be empty' });
        }
        if (request.body.criminalType.trim() === '') {
            return response.status(400).json({ message: 'criminalType Must not be empty' });
        }
    
        const criminal = {
            fullName: request.body.fullName,
            height: request.body.height,
            email: request.headers.email,
            phoneNumber: request.body.phoneNumber,
            dateOfBirth: request.body.dateOfBirth,
            weight: request.body.weight,
            criminalType: request.body.criminalType,
            cityId: request.body.cityId,
            createdAt: new Date().toISOString()
        };
    
        const res = await db
        .doc(`/criminals/${criminal.email}`)
        .set(criminal);
        return response.json(res);
    } catch (error) {
        console.log(error)
        return response.status(400).json({ message: error.Message});
    }
};

exports.getAllCriminals = (request, response) => {
    db
    .collection('criminals')
    .get()
    .then(data => {
        let criminals = [];
        data.forEach(item => {
            criminals.push({
                id: item.id,
                fullName: item.data().fullName,
                phoneNumber: item.data().phoneNumber,
                criminalType: item.data().criminalType,
                weight: item.data().weight,
                email: item.data().email,
                height: item.data().height,
                dateOfBirth: item.data().dateOfBirth,
                imageUrl: item.data().imageUrl,
                createdAt: item.data().createdAt
            });
        });
        return response.json(criminals);
    })
    .catch(error => {
        return response.status(500).json({ message: error });
    })
}

exports.getCriminal = (request, response) => {
    db
    .doc(`/criminals/${request.params.id}`)
    .get()
    .then(doc => {
        if (doc.exists){
            return response.json(doc.data());
        } else {
            return response.json({ message: 'Criminal does not exist.' });
        }
    })
    .catch(error => {
        return response.status(500).json({ message: error });
    });
}

deleteImage = (imageName) => {
    const bucket = admin.storage().bucket();
    const path = `${imageName}`;
    return bucket.file(path).delete().then(() => {
        return;
    }).catch(error => {
        return;
    });
}

exports.uploadImage = (request, response) => {
    const Busboy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new Busboy({headers: request.headers});

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (filedName, file, fileName, encoding, mimeType) => {
        if (mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
            return response.status(400).json({ message: 'Wrong file type submitted' });
        }
        const imageExtension = fileName.split('.')[fileName.split('.').length-1];
        imageFileName = `${request.headers.email}.${imageExtension}`;
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
            return db.doc(`criminals/${request.headers.email}`).update({
                imageUrl
            });
        })
        .then(() => {
            return response.json({ message: 'Image uploaded successfully' });
        })
        .catch(err => {
            console.error(err);
            return response.status(400).json({ message: err });
        });
    });
    busboy.end(request.rawBody);
}
