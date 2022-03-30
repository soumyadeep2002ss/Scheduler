const mongoose = require('mongoose');

// Connect MongoDB at default port 27017.
const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = connectDatabase;