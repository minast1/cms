const { db } = require('../utils/admin');

exports.addCity = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ name: 'Must not be empty' });
    }

    if (request.body.stateId.trim() === '') {
        return response.status(400).json({ stateId: 'Must not be empty' });
    }

    const city = {
        name: request.body.name,
        stateId: request.body.stateId,
        createdAt: new Date().toISOString()
    };

    db
    .collection('cities')
    .add(city)
    .then((document) => {
        const responseFeedback = city;
        responseFeedback.id = document.id;
        return response.json(responseFeedback);
    })
    .catch((error) => {
        response.status(500).json({ error: 'Something went wrong' });
        console.error(error);
    });
};

exports.getCities = (request, response) => {
    db
    .collection('cities')
    .get()
    .then(data => {
        let cities = [];
        data.forEach(item => {
            cities.push({
                id: item.id,
                name: item.data().name,
                stateId: item.data().stateId,
                createdAt: item.data().createdAt
            });
        });
        return response.json(cities);
    })
    .catch(error => {
        return response.status(500).json({ error: error });
    })
}