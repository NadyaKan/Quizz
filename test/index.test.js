const mongoose = require('mongoose');
const User = require('../models/userModel');
const db = mongoose.connection;
const regController = require('../controllers/RegisterController')

describe('insert', () => {

  afterAll(async () => {
    await connection.close();
    await db.close();
  });
  it('should insert a doc into collection', async () => {
    const mockUser = {
        name: 'Dummy',
        email: 'dummy@test.de',
        password: 'password',
        date: '01/01/2000',
        id : 1
    }
    await User.create(mockUser, (err) =>{
        if(err) throw err
    });

    await db.collection('registered').findOne({name : 'Dummy'}, (user) => {
        expect(user).toEqual(mockUser);
    });
  });
});

describe('remove all', () => {

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should remove all', async () => {
    const mockUser = {
        name: 'Dummy',
        email: 'dummy@test.de',
        password: 'password',
        date: '01/01/2000',
        id : 1
    }
    await User.create(mockUser, (err) =>{
        if(err) throw err
    });
    regController.deleteAllRegistered();
    User.find({}).then(result => {
        expect(result.length).toBe(0)
    })
  });
});



