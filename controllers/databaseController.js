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
    mongoose.disconnect();
    mongoose.connect('mongodb://mongo:27017/'+DB).then(() => {
        db.collection(COLLECTION_NAME).insertOne(DATA); 
    });
    console.log(`SUCCESSFULLY INSERTED ${JSON.stringify(DATA)} INTO ${COLLECTION_NAME}`);  
}


exports.isertUserIntoRegistered = (req) => {
    mongoose.disconnect();
    mongoose.connect('mongodb://mongo:27017/quiz-data').then(() => {
        db.collection('registered').countDocuments({}, (err, count) => {    
            if(err) throw err;
            db.collection('registered').insertOne({
                name: req.body.username,
                email: req.body.email,
                password: req.body.password,
                date: new Date().toLocaleDateString(), 
                id: count + 1
            }, (err, data) => {
                if(err) throw err;
                console.log(`successfully registered ${req.body.name}`);
            })               
        }) 
    });
    //console.log(`SUCCESSFULLY INSERTED ${JSON.stringify(DATA)} INTO ${COLLECTION_NAME}`);  
}