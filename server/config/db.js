const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
module.exports = async () => {
    try {
        const uri = process.env.MONGOURI;
        // uri = encodeURI(uri)
        console.log(uri)
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: true,
            // ssl: true,
            // tlsAllowInvalidCertificates: true,
            // tlsCAFile : credential
        });
        console.log("MongoDB connected " + conn.connection.host);
    } catch (error) {
        console.log("MongoDB connection failed");
        console.log( error);
        process.exit(1);
    }
}