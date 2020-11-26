const { db } = require('../utils/admin');

exports.addCrimeCategory = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ message: 'Name Must not be empty' });
    }

    const category = {
        name: request.body.name,
        description: request.body.description,
        createdAt: new Date().toISOString()
    };

    db
    .collection('crime-categories')
    .add(category)
    .then((document) => {
        const responseFeedback = category;
        responseFeedback.id = document.id;
        return response.json(responseFeedback);
    })
    .catch((error) => {
        return response.status(500).json({ message: error });
    });
};

exports.getCrimeCategories = (request, response) => {
    db
    .collection('crime-categories')
    .get()
    .then(data => {
        let categories = [];
        data.forEach(item => {
            categories.push({
                id: item.id,
                name: item.data().name,
                description: item.data().description,
                createdAt: item.data().createdAt
            });
        });
        return response.json(states);
    })
    .catch(error => {
        return response.status(500).json({ message: error });
    })
}