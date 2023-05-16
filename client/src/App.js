import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./pages/home.js";
import {Auth} from "./pages/auth.js";
import {CreateRecipe} from "./pages/create-recipe";
import {SavedRecipes} from "./pages/saved-recipes.js";
import {Navbar} from "./components/navbar.js";
import {Footer} from "./components/footer.js";


function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/auth' element={<Auth />}/>
        <Route path='/create-recipe' element={<CreateRecipe />}/>
        <Route path='/saved-recipes' element={<SavedRecipes />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
   
  );
}

export default App;


//packages
//react-router-dom help cretae routes in diff pages inside website
//axios for fetching data
//react-cookie for dealing with cookies in react

//route systems
//url of website is default route
//element is component we gonna render when we go to given path