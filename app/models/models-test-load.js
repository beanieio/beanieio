const { User, Entry } = require('./models.js');

const testUser = new User();
testUser.username = 'Phillip';
testUser.password = 'sd98f7s987d$!#%@';
testUser.logins = 3;
testUser.submissions = 4;
testUser.email = 'example@gmail.com';
testUser.ingredients = ['grease', 'cheese'];
// testUser.goals = {emotional: 'happiness', physical: ['pushups', 'running']} -- > TODO
testUser.physical = ['sore', 'tired', 'sick'];
testUser.emotional = ['despressed', 'bored'];
testUser.save();

const newEntry = new Entry();
newEntry.datetime = new Date;
newEntry.ingredients = ['wheat', 'lactose'];
newEntry.sleepDuration = 6;
newEntry.sleepQuality = 4;
newEntry.exerciseDuration = 20;
newEntry.exerciseIntensity = 4;
newEntry.waterAmount = 62;
newEntry.physicalScore = 3;
newEntry.emotionalScore = 4;
newEntry.physicalTags = ['great', 'awsome'];
newEntry.emotionalTags = ['happy', 'sad'];
newEntry.save();
