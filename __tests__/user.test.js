const mongoose = require('mongoose');

const { User } = require('../models');
const UserData = {
  userName: 'The Tester',
  createdBy: 'Lernantino',
  size: 'Personal',
  toppings: ['Pepperoni', 'Ricotta', 'Sausage']
};

describe('User Model Test', () => {
  let connection;

  // It's just so easy to connect to the MongoDB Memory Server
  // By using mongoose.connect
  beforeAll(async () => {
    connection = await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  it('Creates and validates a new user', async () => {
    const validUser = new User(UserData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.UserName).toBe(UserData.UserName);
    expect(savedUser.createdBy).toBe(UserData.createdBy);
    expect(savedUser.size).toBe(UserData.size);
    expect(savedUser.toppings).toContain('Pepperoni');
    expect(savedUser.comments.length).toBe(0);

    // delete User
    await savedUser.remove();
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it('Create User successfully, but the field not defined in schema should be undefined', async () => {
    const UserWithInvalidField = new User({
      UserName: 'The Tester',
      createdBy: 'Lernantino',
      email: 'lernantino@gmail.com'
  
    });
    const savedUser = await UserWithInvalidField.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.price).toBeUndefined();

    await savedUser.remove();
  });

  // Test Validation is working!!!
  // It should tells us the errors in on enumerable `size` field.
  it('Create User without required field should fail', async () => {
    const UserWithoutInfo = new User({ userName: 'The tester' });
    let err;
    try {
      const savedUserWithoutInfo = await UserWithoutInfo.save();
      err = savedUserWithoutInfo;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  afterAll(async () => {
    await connection.disconnect();
  });
});
