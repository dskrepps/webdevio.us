import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import icon from '../images/site-icon.jpg';

const SEO = ({description, lang='en', meta=[], keywords=[], title}) => {
	const { site } = useStaticQuery(graphql`
		query DefaultSEOQuery {
			site {
				siteMetadata {
					title
					description
					author
				}
			}
		}
	`);
	
	title = title ? `${site.siteMetadata.title} | ${title}` : site.siteMetadata.title;
	
	const metaDescription = description || site.siteMetadata.description;
	
	return (
		<Helmet htmlAttributes={{lang}}
			title={title}
			meta={
				[   { name: 'description',         content: metaDescription },
					{ property: 'og:title',        content: title },
					{ property: 'og:description',  content: metaDescription },
					{ property: 'og:type',         content: 'website' },
					{ name: 'twitter:card',        content: 'summary' },
					{ name: 'twitter:creator',     content: site.siteMetadata.author },
					{ name: 'twitter:title',       content: title },
					{ name: 'twitter:description', content: metaDescription },
				].concat( keywords.length > 0
					? { name: 'keywords', content: keywords.join(', ') }
					: [] )
				.concat(meta)
			}
		/>
	);
}

SEO.propTypes = {
	description: PropTypes.string,
	keywords: PropTypes.arrayOf(PropTypes.string),
	lang: PropTypes.string,
	meta: PropTypes.array,
	title: PropTypes.string,
};

export default SEO;
