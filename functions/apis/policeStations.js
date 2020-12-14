const { db } = require('../utils/admin');

exports.addPoliceStation = (request, response) => {
    try {
        if(request.body.stationName.trim() === '') {
            return response.status(400).json({ message: 'Station name must not be empty' });
        }
    
        if(request.body.feedbackNumber.trim() === '') {
            return response.status(400).json({ message: 'Feedback number must not be empty' });
        }
    
        if(request.body.email.trim() === '') {
            return response.status(400).json({ message: 'Email must not be empty' });
        }
    
        if(request.body.addressLine1.trim() === '') {
            return response.status(400).json({ message: 'Address line 1 Must not be empty' });
        }
    
        if(request.body.city === null) {
            return response.status(400).json({ message: 'City Must not be empty' });
        }
    
        const newPoliceStation = {
            stationName: request.body.stationName,
            feedbackNumber: request.body.feedbackNumber,
            email: request.body.email,
            addressLine1: request.body.addressLine1,
            addressLine2: request.body.addressLine2,
            city: request.body.city,
            createdAt: new Date().toISOString()
        };
    
        db
        .collection('police-stations')
        .add(newPoliceStation)
        .then(res => {
            const stationResponse = newPoliceStation;
            stationResponse.id = res.id;
            return response.json(stationResponse);
        })
        .catch(error => {
            return response.status(500).json({ message: error });
        });
    } catch (error) {
        return response.status(500).json({ message: "Internal server error" });
    }
}

exports.getAllPoliceStations = (request, response) => {
    db
    .collection('police-stations')
    .get()
    .then(data => {
        let policeStations = [];
        data.forEach(item => {
            policeStations.push({
                id: item.id,
                stationName: item.data().stationName,
                addressLine1: item.data().addressLine1,
                city: item.data().city,
                email: item.data().email,
                feedbackNumber: item.data().feedbackNumber
            });
        });
        return response.json(policeStations);
    })
    .catch(error => {
        return response.status(500).json({ message: error });
    })
}