db.studySpots.find().forEach(function(spot) {
    if (spot.location) {
        db.studySpots.updateOne(
            { _id: spot._id },
            {
                $set: {
                    location: {
                        type: "Point",
                        coordinates: [spot.location.longitude, spot.location.latitude]
                    }
                }
            }
        )
    }
})

db.studySpots.createIndex({ location: "2dsphere"});