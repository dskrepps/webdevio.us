import React from 'react';
import PropTypes from 'prop-types';


const getGravatarUrl = (id ,size)=>`https://secure.gravatar.com/avatar/${id}?s=${size}`;


const HelloCard = ({gravatarId, name, subheading, children, socialName, socialLinks})=>(
	
	<div className=" rounded-lg bg-white shadow-lg max-w-2xl lg:w-8/12 flex">
		<div className="hidden sm:block w-64 flex-shrink-0 bg-no-repeat bg-cover bg-center rounded-l-lg shadow-inner"
			style={{ backgroundImage: `url('${ getGravatarUrl(gravatarId, 512) }')` }}
		></div>
		
		<div className="text-lg flex flex-col w-full">
			<h1 className="my-4 px-4">
			
				Hello. I&apos;m{' '}
				
				<strong className="sm:-ml-px block mt-1 mb-1 sm:-mt-px text-3xl leading-tight tracking-wide font-normal">
					<img alt="" src={getGravatarUrl(gravatarId, 64)} className="sm:hidden rounded inline align-top h-10 -mt-px mr-2"/>
					{name}
				</strong>{' '}
				
				{subheading}
				
			</h1>
			
			{children}
			
			<div className="px-4 mt-auto flex items-center bg-gray-100 rounded-b-lg sm:rounded-bl-none">
				<div className="name text-base text-gray-700 tracking-wide mr-auto mr-4">
					find <strong>{socialName}</strong> on
				</div>
				{socialLinks}
			</div>
		</div>
	</div>
);

HelloCard.propTypes = {
	gravatarId: PropTypes.string,
	name: PropTypes.string,
	subheading: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	socialName: PropTypes.string,
	socialLinks: PropTypes.node,
	children: PropTypes.node,
};

export default HelloCard;
