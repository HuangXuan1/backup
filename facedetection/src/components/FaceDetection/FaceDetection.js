import React from 'react';
import './FaceDetection.css';


//drawing the square
const FaceDetection = ({imageUrl, box}) => {
	return (
		 <div className = 'center ma'>
		  <div className = 'absolute mt2'>
			<img id = 'inputImage'alt = '' src = {imageUrl} width = '500px' height = 'auto'/>
			<div className = 'bounding-box' 
			style = {{left: box.leftCol, right: box.rightCol, bottom: box.bottomRow, top: box.topRow}}>
			</div>
		  </div>
		</div>
	);
}

export default FaceDetection;