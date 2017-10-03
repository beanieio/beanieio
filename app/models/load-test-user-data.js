const { User, Entry, mongoose } = require('./models.js');

const defIngr = ['gluten', 'dairy', 'red meat', 'alcohol'];
const defPhys = ['Great', 'Sore', 'Sick'];
const defEmo = ['Happy', 'Depressed', 'Energized', 'Bored'];

const user1 = new User({
  username: 'user1',
  password: 'password1',
  ingredients: defIngr,
  physical: defPhys,
  emotional: defEmo,
});

const user2 = new User({
  username: 'user2',
  password: 'password2',
  ingredients: defIngr,
  physical: defPhys,
  emotional: defEmo,
});

const user3 = new User({
  username: 'user3',
  password: 'password3',
  ingredients: defIngr,
  physical: defPhys,
  emotional: defEmo,
});

const users = [user1, user2, user3];

mongoose.connection.collections['users'].remove(() => {
  User.create(users).then(() => {
    console.log('Users db reset to test users.');
    mongoose.connection.close();
  });
});
