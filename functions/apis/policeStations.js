const { db } = require('../utils/admin');

exports.getAllPoliceStations = (request, response) => {
    db
    .collection('police-stations')
    .get()
    .then(data => {
        let policeStations = [];
        data.forEach(item => {
            policeStations.push({
                id: item.id,
                name: item.data().name,
                area: item.data().area,
                city: item.data().city,
                email: item.data().email,
                phoneNumber: item.data().phoneNumber
            });
        });
        return response.json(policeStations);
    })
    .catch(error => {
        return response.status(500).json({ message: error });
    })
}