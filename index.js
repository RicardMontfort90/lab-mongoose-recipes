const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  // Iteration 2 - Create a recipe
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "allioli with honey",
      level: "Easy Peasy",
      ingredients: ["garlic", "oil", "honey", "salt", "white pepper","1 egg"],
      cuisine: "catalan",
      dishType: "sauce",
      duration: 10,
      creator: R. Montfort
    })
    /*return Recipe.create(data)*/
  })
// Iteration 3 - Insert multiple recipes
  .then(() =>{
    return Recipe.insertMany(data)
  })
// Iteration 4 - Update recipe
  .then(() => {
    return Recipe.findOneAndUpdate({ 
      title: "Rigatoni alla Genovese" },
      { 
        duration: 100
    });
  })
// Iteration 5 - Remove a recipe
  .then(() => {
    return Recipe.deleteOne({
      title: "Carrot Cake"
    });
  })
// Iteration 6 - Close the Database
  .then(() => {
    mongoose.connection.close();
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });