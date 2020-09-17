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
	
	const [selectedIcon, selectIcon] = React.useState(children[0].props.icon);
	const handleIconClick = e => {
		e.preventDefault();
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
	
	const selectedChild = children.find( child => child.props.icon === selectedIcon );
	const selectedChildHasDesc = !!selectedChild?.props.dangerouslySetInnerHTML.__html;
	
	
	return (
		<div {...moreProps}>
			<ul className={innerClassNames}>
				{children.map( ({props: {icon, children}}) => (
					<li key={icon} className='relative inline-block'>
						<IconLink icon={icon} dhref="#" iconSize={iconSize}
							isSelected={selectedChildHasDesc && icon === selectedIcon}
							className={selectedChildHasDesc && '-mb-2'}
							onClick={handleIconClick}
							title={icon}
						/>
						
						{/* Triangle pointing to slected tab's icon */}
						{ selectedChildHasDesc && icon === selectedIcon &&
							<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
								width="1rem" height=".625rem" viewdBox="0 0 16 10"
								className={`text-${contentBgColor} fill-current`}
								style={{marginLeft: `calc( (${iconSize} / 2) - .5rem)`}} // Aim at the icon's center
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
