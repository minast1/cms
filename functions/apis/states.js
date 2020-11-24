const { db } = require('../utils/admin');

exports.addState = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ message: 'name Must not be empty' });
    }

    if (request.body.countryId.trim() === '') {
        return response.status(400).json({ message: 'countryId Must not be empty' });
    }

    const state = {
        name: request.body.name,
        countryId: request.body.countryId,
        createdAt: new Date().toISOString()
    };

    db
    .collection('states')
    .add(state)
    .then((document) => {
        const responseFeedback = state;
        responseFeedback.id = document.id;
        return response.json(responseFeedback);
    })
    .catch((error) => {
        response.status(500).json({ message: `Something went wrong: ${error.Message}` });
        console.error(error);
    });
};

exports.getStates = (request, response) => {
    db
    .collection('states')
    .get()
    .then(data => {
        let states = [];
        data.forEach(item => {
            states.push({
                id: item.id,
                name: item.data().name,
                countryId: item.data().countryId,
                createdAt: item.data().createdAt
            });
        });
        return response.json(states);
    })
    .catch(error => {
        return response.status(500).json({ message: error });
    })
}