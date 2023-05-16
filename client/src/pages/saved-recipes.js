import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div className="saved-recipes">
      <h1>Saved Recipes</h1>
    
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
          
            </div>
            <div className="saved-recipe saved-recipe-cover">
             <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <p>{recipe.instructions}</p>
             <p>Cooking Time: {recipe.cookingTime} minutes</p>
        
          </li>
        ))}
      </ul>
    </div>
  );
};