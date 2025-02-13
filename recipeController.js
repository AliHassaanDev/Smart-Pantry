const axios = require("axios");
const Pantry = require("../models/Pantry");

exports.suggestRecipes = async (req, res) => {
  try {
    const userPantry = await Pantry.find({ userId: req.user._id });
    const ingredients = userPantry.map((item) => item.name).join(",");

    const API_KEY = process.env.SPOONACULAR_API_KEY; 

    const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
      params: {
        ingredients: ingredients,
        number: 5, 
        apiKey: API_KEY,
      },
    });

    const recipes = response.data.map((recipe) => ({
      name: recipe.title,
      ingredients: recipe.usedIngredients.map((ing) => ing.original),
      missingIngredients: recipe.missedIngredients.map((ing) => ing.original),
      image: recipe.image,
      id: recipe.id,
    }));

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error: error.message });
  }
};
