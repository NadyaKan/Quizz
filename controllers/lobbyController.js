const dataCTRL = require('./databaseController');
const host = {
    name: 'Larry'
}
const player1 = {
    name: 'Timmy'
}
const id = generateLobbyCode();

exports.createLobby = (req, res) => {
    dataCTRL.useDB(id);
    dataCTRL.isertIntoCollection(id, 'players', host);
    res.send(`<h1>LOBBY ${id} IS CREATED SUCCESSFULLY!</h1>`);
}

exports.joinLobby = (req, res) => {
    //req.body.LOBBY_CODE -> id
    dataCTRL.isertIntoCollection(id, 'players', player1);
    res.send(`<h1>SUCCESSFULLY JOINED LOBBY ${id}</h1>`);
}


function generateLobbyCode(){
    return Math.random().toString(36).substring(2);
}