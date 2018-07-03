import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm = ({onInputChange, onSubmit}) => {
	return (
		<div>
		  <p className = 'f3'>
		  {'This App will detect faces in your picture. Try Now!'}
		  </p>
		  <div className = 'center'>
		  {/*we can add 'center' to be in the same line */}
		    <div className = 'form pa4 br3 shadow-5'>
			  <input className = 'f4 pa2 w-70 center' type = 'tex' onChange = {onInputChange}/>
			  <button className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
			  onClick = {onSubmit}
			  > Detect</button>
			 </div>
		  </div>
		</div>
	);
}

export default ImageLinkForm;