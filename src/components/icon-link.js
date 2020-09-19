/*
	A simple icon link, pulling icons from ../images/icons/{props.icon}.svg
	Grey/translucent normally, svg's colors on hover/focus or if given props.isSelected.
	Text (children) optional.
*/

import React from 'react';
import PropTypes from 'prop-types';


const importIcon = require.context('../images/icons/', false, /\.svg$/);


// The icon minimum size is 1.75rem, will grow with em
const defaultIconSize = 'max(1.5em, 1.75rem)';


const IconLink = ({ icon, children, isSelected=false, iconSize=defaultIconSize, ...moreProps }) => {
	
	icon = icon.toLowerCase();
	
	return (
		<a data-icon={icon} // icon-tabs uses this to identify which is clicked
			style={{
				backgroundImage: `url('${ importIcon('./'+icon+'.svg') }')`,
				backgroundSize: iconSize,
				minHeight: iconSize,
				paddingLeft: iconSize,
				backgroundPosition: '.25rem 50%',
			}}
			{...moreProps}
			className={`
				${isSelected ? 'filter-none' : 'filter-colorless'}
				hover:filter-none focus:filter-none
				inline-block box-content align-middle
				py-4 pr-2 -ml-1 mr-2
				bg-no-repeat
				${moreProps.className || ''}
			`}
		>
			{/* Spacing between icon and text, but not when text is empty */}
			{<div className={`pl-3 ${children ? '' : 'sr-only'}`}>
				{children || icon}
			</div>}
		</a>
	);
};

IconLink.propTypes = {
	icon: PropTypes.string.isRequired,
	children: PropTypes.node,
	isSelected: PropTypes.bool,
	iconSize: PropTypes.string,
};

export default IconLink;