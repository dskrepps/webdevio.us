import React from 'react';
import PropTypes from 'prop-types';
import { AnchorLink } from "gatsby-plugin-anchor-links";

import IconTabs from "../components/icon-tabs";

const importContentImage = require.context('../../content/portfolio/', false, /\.(png)$/);


const PortfolioEntry = ({entry: {html, frontmatter: {title, subheading, screenshot, buttons, techs}}, ...moreProps}) => (
	<article className='flex flex-col   w-78 mx-4 mb-12   shadow-md rounded-lg text-lg'
		{...moreProps}
	>
		
		<h3 className="mx-4   text-xl font-bold tracking-wide leading-snug"
		> {title} </h3>
		
		<p className="mx-4   text-base italic text-gray-700"
		> {subheading} </p>
		
		<div className="order-first shadow-inner mb-4 relative rounded-t-lg">
			<img src={importContentImage('./'+screenshot+'.png')}
				alt={`[Screenshot of ${title}]`}
				// Put it behind the inset shadow, then style the alt text:
				className={`relative z-behind w-full h-48
					text-center text-gray-700   rounded-t-lg bg-gray-300
					flex flex-col justify-around
				`}
			/>
		</div>
		
		<div className="mx-4 my-4"
			dangerouslySetInnerHTML={{__html: html}}
		></div>
		
		{buttons && 
			<span className="mx-4 mb-4">
				{buttons.map( ({text, link, color}) => {
					const props = {
						key: link,
						className: `bg-${color}-200   px-2 py-1 mr-2   rounded   text-base`,
						title: "",
						children: text,
					};
					
					// Internal anchors break without AnchorLink
					if( link.startsWith('#') )
						return <AnchorLink to={link} {...props}></AnchorLink>
					else
						return <a href={link} {...props}></a>
					})
				}
			</span>
		}
		
		{techs &&
			<IconTabs className="mt-auto text-gray-900 text-base"
				innerClassNames="px-4 rounded-b-lg" contentBgColor="gray-300"
			>
				{techs.map( ({tech, desc}) => (
					<div data-icon={tech} key={tech}
						dangerouslySetInnerHTML={{__html: desc}}
					></div>
				))}
			</IconTabs>
		}
		
	</article>
);

PortfolioEntry.propTypes = {
	entry: PropTypes.object.isRequired,
};

export default PortfolioEntry;
