/*
	Tabbed content using our IconLink component.
	
	Todo: accessibility semantics
	Reference: https://medium.com/@andreasmcd/creating-an-accessible-tab-component-with-react-24ed30fde86a
*/

import React from 'react';
import PropTypes from 'prop-types';

import IconLink from './icon-link';


// Necessary for positioning the arrow centered with the icon
const iconSize = '1.75rem';

const IconTabs = ({contentBgColor='gray-300', innerClassNames='', children, ...moreProps}) => {
	
	const [selectedIcon, selectIcon] = React.useState(children[0].props['data-icon']);
	const handleIconClick = e => {
		e.preventDefault();
		e.target.blur();
		selectIcon(e.target.dataset.icon);
	}
	
	// Keep tab bar from moving around when switching without knowing the tallest content
	const [contentHeight, setContentHeight] = React.useState(64);
	const contentRef = React.useRef(null);
	React.useEffect(()=>{
		if( contentRef.current.offsetHeight > contentHeight ){
			setContentHeight(contentRef.current.offsetHeight);
		}
	});
	
	const selectedChild = children.find( child => child.props['data-icon'] === selectedIcon );
	const selectedChildHasDesc = !!selectedChild?.props.dangerouslySetInnerHTML.__html;
	
	
	return (
		<div {...moreProps}>
			<ul className={innerClassNames}>
				{children.map( ({props: {'data-icon': icon}}) => (
					<li key={icon} className='relative inline-block'>
						<IconLink icon={icon} href={selectedChildHasDesc ? icon : undefined} iconSize={iconSize}
							isSelected={selectedChildHasDesc && icon === selectedIcon}
							className={selectedChildHasDesc && '-mb-2'}
							onClick={handleIconClick}
							onMouseDown={e=>e.preventDefault()} // Prevent flash of focus ring
							title={icon}
						/>
						
						{/* Triangle pointing to slected tab's icon */}
						{ selectedChildHasDesc && icon === selectedIcon &&
							<svg width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
								className={`text-${contentBgColor} fill-current`}
								style={{
									width: '1rem',
									height: '.625rem',
									marginLeft: `calc( (${iconSize} / 2) - .5rem)`, // Aim at the icon's center
								}}
							> <path d="M 0 10 L 8 0 L 16 10 z"/> </svg>
						}
					</li>
				))}
			</ul>
			
			<div ref={contentRef}
				className={`${selectedChildHasDesc ? '' : 'hidden'} py-2 bg-${contentBgColor} ${innerClassNames}`}
				style={{minHeight: contentHeight}}
			>
				{selectedChild}
			</div>
		</div>
	);
}

IconTabs.propTypes = {
	'contentBgColor': PropTypes.string, // Including arrow pointing to selected tab
	'innerClassNames': PropTypes.string, // I needed left/right padding but full-width backgrounds
	'children': PropTypes.node,
};

export default IconTabs;
