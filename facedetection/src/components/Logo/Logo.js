import React from 'react';
import Tilt from 'react-tilt';
import logo from './big.png'
import './Logo.css';

const Logo = () => {
	return (
		<div className = 'ma4 mt0'>
		  <Tilt className="center Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 160, width: 160 }} >
		     <div className="Tilt-inner pa2"> 
		     <img style = {{paddingTop : '3px'}}alt = 'logo' src = {logo}/> 
		     </div>
		  </Tilt>
		</div>
	);
}

export default Logo;