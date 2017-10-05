const { User, Entry, mongoose } = require('./models.js');

const ingredientsDefaults = [
  'nuts', 'wheat', 'gluten', 'dairy', 'egg',
  'soy', 'fish', 'red meat', 'poultry', 'fruits',
  'leafy vegetables', 'peppers', 'sugar', 'sweetener',
  'greasy', 'fried', 'oil', 'liquor', 'beer', 'wine'
];

const emoDefaults = [
  'Fine', 'Energized', 'Relaxed',
  'Unmotivated', 'Stressed', 'Drained', 'Depressed'
];

const physDefaults = [
  'Great', 'Okay', 'Tired', 'Sore', 'Cramps',
  'Sick', 'Headache', 'Bloated', 'Nauseous'
];

User.update({}, {ingredients: ingredientsDefaults, emotional: emoDefaults, physical: physDefaults}, {multi: true}).exec()
  .then(() => console.log('users updated'));
