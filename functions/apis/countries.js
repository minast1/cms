const { db } = require('../utils/admin');

exports.addCountry = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ message: 'name Must not be empty' });
    }

    if (request.body.abbreviation.trim() === '') {
        return response.status(400).json({ message: 'abbreviation Must not be empty' });
    }

    if (request.body.zipCode.trim() === '') {
        return response.status(400).json({ message: 'zipCode Must not be empty' });
    }

    const country= {
        name: request.body.name,
        abbreviation: request.body.abbreviation,
        zipCode: request.body.zipCode,
        createdAt: new Date().toISOString()
    };

    db
    .collection('countries')
    .add(country)
    .then((document) => {
        const responseFeedback = country;
        responseFeedback.id = document.id;
        return response.json(responseFeedback);
    })
    .catch((error) => {
        response.status(500).json({ message: `Something went wrong${error.Message}` });
        console.error(error);
    });
};

exports.getCountries = (request, response) => {
    db
    .collection('countries')
    .get()
    .then(data => {
        let countries = [];
        data.forEach(item => {
            countries.push({
                id: item.id,
                name: item.data().name,
                abbreviation: item.data().abbreviation,
                zipCode: item.data().zipCode,
                createdAt: item.data().createdAt
            });
        });
        return response.json(countries);
    })
    .catch(error => {
        return response.status(500).json({ message: error });
    })
}