import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { FaArrowUp } from "react-icons/fa";
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
    <div className="saved-recipes" id="save-recipeId">
      <h1>My Saved Recipes</h1>
    
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>       
            </div>
            <p>{recipe.instructions}</p>
             <p>Cooking Time: {recipe.cookingTime} minutes</p>    
          </li>
        ))}
      </ul>
      <div>
       <a href="/saved-recipes/#save-recipeId" className="up"><FaArrowUp /></a>
      </div>
    
    </div>
  );
};