const mongoose = require('mongoose');
const db = mongoose.connection;

exports.openConnection = () => {
    const DB_URI = "mongodb://mongo:27017/quiz-data"; //Main DB
    mongoose.connect(DB_URI).then(() => {
    console.log('DB connected');
    });
}

exports.useDB = (DB_NAME) => {
    db.useDb(DB_NAME);
    console.log(`SWITCHED TO DATABASE ${DB_NAME}`);
}

exports.isertIntoCollection = (DB, COLLECTION_NAME, DATA) => {
    mongoose.connect('mongodb://mongo:27017/'+DB).then(() => {
        db.collection(COLLECTION_NAME).insertOne(DATA); 
    });
    console.log(`SUCCESSFULLY INSERTED ${JSON.stringify(DATA)} INTO ${COLLECTION_NAME}`);  
}