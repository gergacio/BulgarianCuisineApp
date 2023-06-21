import { SocialIcon } from 'react-social-icons';
import { FaHome } from 'react-icons/fa';


export const Footer = () => {
    return (
   

          <footer className='footer-container' >
          <div class="outer">
              <div class="footer">          
              <div>
                      <p>Menu</p>
                      <ul class="footer-list">
                          <li><a class="link" href="/">Home</a></li>
                          <li><a class="link" href="/create-recipe">Create Recipe</a></li>
                          <li><a class="link" href="/saved-recipes">Saved Recipes</a></li>
                       
                      </ul>           
                  </div>
                  <div>
                      <p>Social media</p>
                      <ul class="footer-list">
                      
                      <li><a class="icons" href="https://www.linkedin.com/in/georgi-georgiev-a07534ab/" target="_blank"><span class="fa-brands fa-linkedin linkItem" aria-hidden="true"></span>
                      <span class="sr-only">LinkedIn</span></a></li>

                    <li><a class="icons" href="https://github.com/gergacio" target="_blank"><span class="fa-brands fa-github linkItem" aria-hidden="true"></span> 
                      <span class="sr-only">GitHub</span></a></li>
                      </ul>
                  </div>
              
              </div>
          </div>
   
          <p class="fontfooer">All rights reserved &copy; 'Dear Motherland' 2023 | Created by Georgi Gospodinov | Cookie Policy | Privacy Policy | Help | FAQ</p>  
          </footer>
        
    );
}