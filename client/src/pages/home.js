import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from 'react-icons/fa';
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    if(cookies.access_token)  fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      },
      {headers: {authorization: cookies.access_token}}
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      alert("You need permission to perform this action! Please register for new account and login!");
      navigate("/auth");
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);
  console.log();

  return (
    <div className="home" id="home">
      <div className="imghome imghome-cover">
        {/* <img src="https://ourhomebulgaria.com/wp-content/uploads/2018/08/rila_panevritmia_horo_2.jpg" alt="img"/> */}
        <h1 className="recipesHeading"><span className="white">Traditional</span> <span className="green"> Bulgarian</span> <span className="red">Food</span></h1>
      </div>
    
      <ul >
        {recipes.map((recipe) => (
          <li key={recipe._id} className="recipes">
     
              <h2>{recipe.name}</h2>
              <div className="example example-cover">
                 <img src={recipe.imageUrl} alt={recipe.name} />
              </div>
              <p>{recipe.description}</p>
          
             <p>Cooking Time: {recipe.cookingTime} minutes</p>
            <p><button className="save-btn"
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}s
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button></p>
          </li>
        ))}
      </ul>
      <div>
       <a href="/#home" className="up"><FaArrowUp /></a>
      </div>
    </div>
  );
};