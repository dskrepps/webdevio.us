import React from "react";
import PropTypes from "prop-types";
import { graphql } from 'gatsby';
import { AnchorLink } from "gatsby-plugin-anchor-links";

import Layout, { OuterWrapper, InnerWrapper } from "../components/layout";
import SEO from "../components/seo";

import IconLink from "../components/icon-link";
import CategoryTree, { Category, CategoryEntry } from "../components/category-tree";

import HelloCard from "../components/hello-card";
import PortfolioEntry from "../components/portfolio-entry";
import ContactForm from "../components/contact-form";



// Focus on the first contact field after scrolling
// But that's kind of jarring on mobile with the mobile keyboard popping up
const handleHireMeClick = ()=>{
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) return;
	setTimeout(
		()=>document.querySelector('#contact-name').focus()
	, 500)
}



const IndexPage = ({data})=>( <Layout>
	<SEO keywords={[`webdev`, `web developer`, `web developer york pa`, `dylan krepps`, `dskrepps`]}/>

	<OuterWrapper shorterThanFold={true} shortestFold="22rem" tallestFold="35rem" className="pt-4">
		<InnerWrapper className="flex items-center justify-center h-full">
			<HelloCard name="Dylan Krepps"
				gravatarId="68aaa8699044f6337699edcf6e6c246c"
				subheading={<> a <strong>Web Developer</strong> based in <strong>York, PA</strong>. </>}
				socialName="@dskrepps"
				socialLinks={<>
					<IconLink icon="github"   href="https://github.com/dskrepps" title="@dskrepps on GitHub"/>
					<IconLink icon="twitter"  href="https://twitter.com/dskrepps" title="@dskrepps on Twitter"/>
					<IconLink icon="linkedin" href="https://linkedin.com/in/dskrepps" title="Dylan Krepps on LinkedIn"/>
					<IconLink icon="gmail"    href="mailto:dskrepps@gmail.com" title="dskrepps@gmail.com"/>
				</>}
			>
				<p className="mb-4 px-4 whitespace-pre-line">
					Scroll down to see my skills and portfolio. {'\n'}
					You can <span className="underline text-gray-500" onClick={handleHireMeClick}>
						<strong className="text-gray-900">
							<AnchorLink to="#contact">hire me</AnchorLink>
						</strong>
					</span> if you want.
				</p>
			</HelloCard>
		</InnerWrapper>
	</OuterWrapper>
	
	<OuterWrapper className="mb-8 sm:mb-4"><InnerWrapper>
		
		<h2 className="sr-only"> Skills I&apos;ve Worked With </h2>
		
		<CategoryTree>
			{/* The tech categories with their logos */}
			<Category name='Web Standards' backgrounds={[
				{ x: '13%', y: '5rem',    scale: '4rem',   url: './tech-web-javascript.svg' },
				{ x: '50%', y: '1rem',    scale: '5rem',   url: './tech-web-html5.svg' },
				{ x: '84%', y: '5.64rem', scale: '3.8rem', url: './tech-web-css3.svg' },
			]}>
				<ul>
					<li>HTML5</li>
					<li>CSS Level 3+</li>
					<li>JavaScript ES6+</li>
					<li>A11y and SEO</li>
				</ul>
			</Category>
			<Category name='Frontend Frameworks' backgrounds={[
				{ x: '5%',  y: '3.6rem', scale: '5.9rem', url: './tech-frontend-vue.svg' },
				{ x: '50%', y: '1rem',   scale: '5.5rem', url: './tech-frontend-react.svg' },
				{ x: '85%', y: '5.2rem', scale: '4rem',   url: './tech-frontend-bootstrap.svg' },
			]}>
				<ul>
					<li>Vue.js</li>
					<li>React</li>
					<li>Bootstrap</li>
					<li>Tailwind</li>
				</ul>
			</Category>
			<Category name='Server Technologies' backgrounds={[
				{ x: '18%', y: '1rem',   scale: '8.7rem', url: './tech-backend-nodejs.svg' },
				{ x: '95%', y: '5.8rem', scale: '6.8rem', url: './tech-backend-php.svg' },
			]}>
				<ul>
					<li>Node.js</li>
					<li>PHP</li>
					<li>MySQL</li>
					<li>Linux</li>
				</ul>
			</Category>
			<Category name='Developer Tooling' backgrounds={[
				{ x: '11%', y: '5.5rem', scale: '5rem',   url: './tech-tool-git.svg', }, 
				{ x: '98%', y: '5.5rem', scale: '5.3rem', url: './tech-tool-sass.svg', },
				{ x: '63%', y: '1.2rem', scale: '6rem',   url: './tech-tool-docker.svg' },
			]}>
				<ul>
					<li>Gatsby</li>
					<li>Docker</li>
					<li>Git</li>
					<li>Sass</li>
				</ul>
			</Category>
			<Category name='WordPress Development' backgrounds={[
				{ x: '50%', y: '1rem', scale: '8rem', url: './tech-backend-wordpress.svg'},
			]}>
				<ul>
					<li>WordPress Setup</li>
					<li>Custom Themes</li>
					<li>Custom Plugins</li>
					<li>Optimization</li>
				</ul>
			</Category>
			
			
			<h2 className='w-full mb-6 text-2xl font-bold text-center text-gray-800 tracking-wide'>
				Projects I&apos;ve Worked On
			</h2>
			
			{/* Portfolio entries pulled from /content/portfolio */}
			{data.allMarkdownRemark.edges.map( ({node: entry}) => (
				<CategoryEntry key={entry.frontmatter.title}
					categories={entry.frontmatter.categories.join(', ')}
				>
					<PortfolioEntry entry={entry}/>
					
					
				</CategoryEntry>
			))}
			
		</CategoryTree>
		
	</InnerWrapper></OuterWrapper>
	
	
	<a id="contact"></a>
	
	{/* Divider graphic */}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 60 1440 70" aria-hidden="true" width="100%">
		<path className="text-gray-800 fill-current" d="M0,64L480,129L960,64L1440,96L1440,135L960,135L480,135L0,135Z"></path>
	</svg>
	
	<OuterWrapper className="bg-gray-800 text-white pt-32 -mb-12">
		<InnerWrapper>
			<ContactForm heading={ <h2 className="text-4xl">Contact Me</h2> } email="dskrepps@gmail.com"/>
		</InnerWrapper>
	</OuterWrapper>
	
	
</Layout> );

IndexPage.propTypes = {
	data: PropTypes.object,
};

export default IndexPage;

export const pageQuery = graphql`
	query { allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
		edges { node {
			html
			frontmatter {
				title
				subheading
				screenshot
				categories
				buttons {
					text
					link
					color
				}
				techs {
					tech
					desc
				}
			}
		} }
	} }
`;