const { db } = require('../utils/admin');

exports.createComplaint = (request, response) => {
    if (request.body.userId.trim() === '') {
        return response.status(400).json({ userId: 'Must not be empty' });
    }

    if (request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }

    if (request.body.fullAddress.trim() === '') {
        return response.status(400).json({ fullAddress: 'Must not be empty' });
    }

    if (request.body.fullDetails.trim() === '') {
        return response.status(400).json({ fullDetails: 'Must not be empty' });
    }
    if (request.body.stationId.trim() === '') {
        return response.status(400).json({ stationId: 'Must not be empty' });
    }

    const newComplaint= {
        title: request.body.title,
        fullAddress: request.body.fullAddress,
        userId: request.body.userId,
        fullDetails: request.body.fullDetails,
        stationId: request.body.stationId,
        createdAt: new Date().toISOString()
    };

    db
    .collection('complaints')
    .add(newComplaint)
    .then((document) => {
        const responseComplaint = newComplaint;
        responseComplaint.id = document.id;
        return response.json(responseComplaint);
    })
    .catch((error) => {
        response.status(500).json({ error: 'Something went wrong' });
        console.error(error);
    });
};