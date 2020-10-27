/*

	Our page-wide Layout element as well as OuterWrapper (full width) and InnerWrapper (centered, content width).

*/

import React from 'react';
import PropTypes from 'prop-types';
import { AnchorLink } from 'gatsby-plugin-anchor-links';


const Layout = ({topButton=true, children}) => (
	<div className="flex flex-col min-h-screen font-sans text-gray-900">
		
		<a id="top"></a>
		
		<main className="flex-1 w-full">
			{children}
		</main>
		
		<OuterWrapper className="bg-gray-900" Tag="footer">
			{/* <InnerWrapper>
			</InnerWrapper> */}
			{topButton && <AnchorLink to="#top" title="Return to Top"
				className={`ml-auto   h-12 w-12   flex items-center justify-center
					bg-gray-200 rounded-full text-gray-800 no-underline
					hover:animate-bounce
				`}
			>
				<svg viewBox="0 0 448 512" width="24" xmlns="http://www.w3.org/2000/svg" className="h-6 fill-current">
					<path d="M240.9 130.5l194.3 194.3c9.3 9.3 9.3 24.5 0 33.9l-22.6 22.6c-9.3 9.3-24.5 9.3-33.9 .04L224 227.5 69.2 381.5c-9.3 9.3-24.5 9.3-33.9-.04l-22.6-22.6c-9.3-9.3-9.3-24.5 0-33.9L207.03 130.5c9.3-9.3 24.5-9.3 33.9-.1z"/>
				</svg>
				<span className="sr-only">Top</span>
			</AnchorLink>}
		</OuterWrapper>
	</div>
);

Layout.propTypes = {
	topButton: PropTypes.bool,
	children: PropTypes.node.isRequired,
};


const OuterWrapper = ({children, Tag='section', shorterThanFold, shortestFold='20rem', tallestFold='100vh', ...moreProps}) => (
	<Tag
		style={
			shorterThanFold && {
				height: '100vh',
				maxHeight: `min( calc(100vh - 6rem), ${tallestFold} )`,
				minHeight: shortestFold,
			}
		}
		{...moreProps}
		className={`w-full px-4 pb-8 md:px-8 md:pb-16  ${moreProps.className || ''}`}
	>
		{children}
	</Tag>
);

OuterWrapper.propTypes = {
	Tag: PropTypes.string,
	shorterThanFold: PropTypes.bool,
	shortestFold: PropTypes.string,
	tallestFold: PropTypes.string,
	children: PropTypes.node.isRequired,
};


const InnerWrapper = ({children, ...moreProps}) => (
	<div
		{...moreProps}
		className={`mx-auto max-w-5xl  ${moreProps.className || ''}`}
	>
		{children}
	</div>
);

InnerWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};



export default Layout;
export { OuterWrapper, InnerWrapper };
