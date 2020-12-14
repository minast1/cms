const { db } = require('../utils/admin');

exports.createComplaint = (request, response) => {
    if (request.body.title.trim() === '') {
        return response.status(400).json({ message: 'title Must not be empty' });
    }

    if (request.body.fullAddress.trim() === '') {
        return response.status(400).json({ message: 'fullAddress Must not be empty' });
    }

    if (request.body.fullDetails.trim() === '') {
        return response.status(400).json({ message: 'fullDetails Must not be empty' });
    }
    if (request.body.stationId.trim() === '') {
        return response.status(400).json({ message: 'stationId Must not be empty' });
    }

    const newComplaint= {
        title: request.body.title,
        fullAddress: request.body.fullAddress,
        email: request.user.email,
        fullDetails: request.body.fullDetails,
        stationId: request.body.stationId,
        status: "Pending",
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
        response.status(500).json({ message: `Something went wrong: ${error.Message}` });
        console.error(error);
    });
};

exports.createFeedback = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ message: 'name Must not be empty' });
    }

    if (request.body.company.trim() === '') {
        return response.status(400).json({ message: 'company Must not be empty' });
    }

    if (request.body.email.trim() === '') {
        return response.status(400).json({ message: 'email Must not be empty' });
    }
    if (request.body.phone.trim() === '') {
        return response.status(400).json({ message: 'phone Must not be empty' });
    }
    if (request.body.message.trim() === '') {
        return response.status(400).json({ message: 'message Must not be empty' });
    }

    const feedback= {
        name: request.body.name,
        company: request.body.company,
        email: request.body.email,
        phone: request.body.phone,
        message: request.body.message,
        createdAt: new Date().toISOString()
    };

    db
    .collection('feedback')
    .add(feedback)
    .then((document) => {
        const responseFeedback = feedback;
        responseFeedback.id = document.id;
        return response.json(responseFeedback);
    })
    .catch((error) => {
        response.status(500).json({ message: `Something went wrong${error.Message}` });
        console.error(error);
    });
};

exports.getMyComplaints = (request, response) => {
    db
    .collection('complaints')
    .where("email", "==", request.user.email)
    .get()
    .then(data => {
        let complaints = [];
        data.forEach(item => {
            complaints.push({
                id: item.id,
                title: item.data().title,
                fullAddress: item.data().fullAddress,
                fullDetails: item.data().fullDetails,
                stationId: item.data().stationId,
                email: item.data().email,
                status: item.data().status,
                createdAt: item.data().createdAt
            });
        });
        return response.json(complaints);
    })
    .catch(error => {
        return response.status(500).json({ message: error });
    })
}