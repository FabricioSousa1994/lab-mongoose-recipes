const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    const myRecipe = {
      title: "Bolonhesa",
      level: "Easy Peasy",
      ingredients: ["Esparguete", "Carne"],
      cuisine: "italian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 15,
      creator: "Fabrício",
    };
    const createdRecipe = await Recipe.create(myRecipe);
    console.log(createdRecipe.title);

    const multipleRecipes = await Recipe.insertMany(data);
    multipleRecipes.forEach((recipe) => {
      console.log("Title --->", recipe.title);
    });

    Recipe.findOneAndUpdate(
      { title: "Rigstoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );

    await Recipe.deleteOne({ title: "Carrot Cake" });
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
