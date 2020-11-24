const { db } = require('../utils/admin');

exports.addCourtType = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ message: 'name Must not be empty' });
    }

    const courtType = {
        name: request.body.name,
        description: request.body.description,
        createdAt: new Date().toISOString()
    };

    db
    .collection('courtTypes')
    .add(courtType)
    .then((document) => {
        const responseFeedback = courtType;
        responseFeedback.id = document.id;
        return response.json(responseFeedback);
    })
    .catch((error) => {
        return response.status(500).json({ message: `Something went wrong: ${error.Message}` });
    });
};

exports.getCourtTypes = (request, response) => {
    db
    .collection('courtTypes')
    .get()
    .then(data => {
        let types = [];
        data.forEach(item => {
            types.push({
                id: item.id,
                name: item.data().name,
                description: item.data().description,
                createdAt: item.data().createdAt
            });
        });
        return response.json(types);
    })
    .catch(error => {
        return response.status(500).json({ message: error });
    })
}

exports.addCourt = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ message: 'Name Must not be empty' });
    }
    if (request.body.courtTypeId.trim() === '') {
        return response.status(400).json({ message: 'Court type Must not be empty' });
    }

    const court = {
        name: request.body.name,
        courtTypeId: request.body.courtTypeId,
        place: request.body.place,
        createdAt: new Date().toISOString()
    };

    db
    .collection('courts')
    .add(court)
    .then(document => {
        const courtResponse = court;
        courtResponse.id = document.id;
        return response.json(courtResponse)
    })
    .catch(error => {
        return response.status(500).json({ message: error });
    })
}