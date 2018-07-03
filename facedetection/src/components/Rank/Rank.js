import React from 'react';

const Rank = ({name,entries}) => {
	return (
		<div>
		   <div className = 'blue f3'>
		   	{`${name}, your current Rank is ...`}
		   </div>
		    <div className = 'blue f3'>
		   	{entries}
		   </div>
		</div>
	);
}

export default Rank;