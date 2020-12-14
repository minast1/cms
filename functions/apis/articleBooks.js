const { admin, db } = require('../utils/admin');
const config = require('../utils/config');

exports.addArticleBook = (request, response) => {
    if (request.body.title.trim() === '') {
        return response.status(400).json({ message: 'title Must not be empty' });
    }

    const newArticle = {
        title: request.body.title,
        description: request.body.description,
        createAt: new Date().toISOString()
    };

    db
    .collection('article-books')
    .add(newArticle)
    .then(document => {
        const responseArticle = newArticle;
        responseArticle.id = document.id;
        return response.json(responseArticle);
    })
    .catch(error => {
        return response.status(500).json({ message: `Something went wrong: ${error.Message}` });
    })
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

exports.uploadArticleBook = (request, response) => {
    const Busboy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new Busboy({headers: request.headers});

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (filedName, file, fileName, encoding, mimeType) => {
        console.log(mimeType);
        if (mimeType !== 'application/pdf') {
            return response.status(400).json({ message: 'Wrong file type submitted' });
        }
        const imageExtension =fileName.split('.')[fileName.split('.').length-1];
        imageFileName = `${request.headers.id}.${imageExtension}`;
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
            const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
            return db.doc(`article-books/${request.headers.id}`).update({
                fileUrl
            });
        })
        .then(() => {
            return response.json({ message: 'File uploaded successfully' });
        })
        .catch(err => {
            console.error(err);
            return response.status(400).json({ message: err.Message });
        });
    });
    busboy.end(request.rawBody);
}

exports.getArticleBooks = (request, response) => {
    db
    .collection('article-books')
    .get()
    .then(data => {
        let articles = [];
        data.forEach(item => {
            articles.push({
                id: item.id,
                title: item.data().title,
                description: item.data().description,
                fileUrl: item.data().fileUrl,
                createdAt: item.data().createdAt
            });
        });
        return response.json(articles);
    })
    .catch(error => {
        return response.status(500).json({ message: error });
    })
}