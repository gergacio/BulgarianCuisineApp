import { SocialIcon } from 'react-social-icons';
import { FaHome } from 'react-icons/fa';


export const Footer = () => {
    return (
        <div className="footer">
         <p>All rights reserved &copy; 'Dear Motherland' 2023 | Created by Georgi Gospodinov</p>  
          <ul>
            <li>
              <SocialIcon url="https://www.linkedin.com/in/georgi-georgiev-a07534ab/" target="_blank" />
            </li> 
            <li>
              <SocialIcon url="https://github.com/gergacio" target="_blank"/>
            </li>
            <li>
              <SocialIcon url="mailto:ggeorgeuk@gmail.com" target="_blank"/>
            </li>
            <li><a href="/#navId"><FaHome  /></a></li>
            
  
          </ul>
        
        
           
        </div>
    );
}