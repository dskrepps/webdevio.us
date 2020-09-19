/*

	Component displays skill categories, a list of skills under then,
	and the projects using those skills. Draws lines from category to skill.
	
	May in the future draws lines from categories to projects and add the ability
	to filter by category, but this is probably unnecessary.

*/


import React from 'react';
import PropTypes from 'prop-types';

const importImage = require.context('../images/', false, /\.(png|jpe?g|svg)$/);


const CategoryTree = ({children}) => {
	
	// We will being using refs to draw graphics between elements
	let pairedNodes = [];
	const canvasRef = React.useRef(null);
	
	// Prepare to render category headings and their skill lists seperate from
	// each other and from entries, and get those refs for the canvas
	const categories = children
		.filter( child => child.type?.displayName === 'Category' )
		.map( (child, i) => {
			const ref = React.useRef(null);
			pairedNodes[i] = {from: ref.current};
			return <Category key={i} ref={ref} {...child.props}></Category>;
		} );
		
	const skillLists = categories.map( ({props: {children, ...moreProps}}, i) => {
		const ref = React.useRef(null);
		pairedNodes[i].to = ref.current;
		return <div key={i} ref={ref} className="mx-auto" aria-hidden="true"> {children} </div>;
	} );
	
	const entries = children.filter( child => child.type?.displayName !== 'Category' )
	
	
	
	// The canvas will adapt to the size of the component so it can draw backgrounds behind it
	const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 });
	
	const handleResize = ()=>{
		const {width, height} = canvasRef.current.parentElement.getBoundingClientRect();
		setCanvasSize({width, height});
	}
	React.useEffect(()=>{
		handleResize();
		// FOUC sometimes. Probably just in React/Gatsby's dev mode, but not taking chances.
		setTimeout( handleResize, 2000);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [])
	
	React.useLayoutEffect(()=>{
		draw(pairedNodes, canvasRef.current, canvasSize);
	}, [canvasSize]);
	
	
	
	
	
	
	
	return (
		<div className="relative">
			{/* Category Headings */}
			<div className={`max-w-md sm:max-w-full m-auto
					flex justify-between flex-col sm:flex-row items-start
					sm:px-24    pb-24 sm:pb-0    mb-40
				`}
			>
				{categories}
			</div>
			
			{/* Category Heading Descriptions/Children */}
			<div className={`hidden sm:flex justify-between flex-col sm:flex-row items-start
					max-w-md sm:max-w-full m-auto
					mb-32 text-lg leading-loose
				`}
				aria-hidden="true"
			>
				{skillLists}
			</div>
			
			{/* Category Contents */}
			<div className='flex lg:justify-between flex-wrap justify-around -mx-4'>
				{entries}
				{/* Limitation of flexbox, can't left align final wrapped row.
					(I should've used grid but already have it working this way) */}
				{!(entries % 3) && <div className="w-78 mx-4"></div>}
			</div>
			
			{/* For drawing connections */}
			{<canvas ref={canvasRef} className="hidden sm:block absolute top-0 left-0 z-behind h-full w-full" aria-hidden="true"></canvas>}
		</div>
	);
};

CategoryTree.propTypes = {
	children: PropTypes.node,
};




const Category = React.forwardRef( ({name, backgrounds: bgs, children, ...moreProps}, ref) => (
	<>
		<div ref={ref}
			className={`flex justify-center flex-wrap box-border
				pt-40 px-12 w-40 sm:w-48   -mb-40 sm:mb-0  sm:-mx-24   mt-4 sm:mt-0   max-xsm:m-0
				sm:even:mt-64 lg:even:mt-40 even:self-end ${/* Offset every other */''}
				bg-no-repeat   focus:shadow-focus
			`}
			style={{ // Shorthand squashed tailwind's classes, so:
				backgroundPosition: bgs.map( ({x, y})=>`${x} ${y}` ).join(','),
				backgroundSize: bgs.map( ({scale})=>scale ).join(','),
				backgroundImage: bgs.map( ({url})=>`url('${importImage(url)}')` ).join(','),
			}} 
			{...moreProps}
		>
			<h3 className="text-center text-xl font-bold tracking-wide">
				{name}
			</h3>
			<div className="sm:hidden w-full text-center text-2xl py-2 h-10 text-gray-600" aria-hidden="true">﹀</div>
			<div className="sm:sr-only text-lg whitespace-no-wrap">
				{children}
			</div>
		</div>
	</>
) );

// So we can identify it among other children nodes
Category.displayName = 'Category';

Category.propTypes = {
	name: PropTypes.string.isRequired,
	backgrounds: PropTypes.array.isRequired,
	children: PropTypes.node.isRequired,
};




// Might need this ref for future features
const CategoryEntry = ({children}) => (<> {children} </>);

CategoryEntry.propTypes = {
	categories: PropTypes.string.isRequired,
	children: PropTypes.node,
};


export default CategoryTree;
export { Category, CategoryEntry };








const draw = (pairedNodes, canvas, canvasSize) => {
	
	if( !canvasSize.width ) return;
	
	const context = canvas.getContext('2d');
	let lines = [];
	const lineGap = 16;
	
	// Calculate line points
	pairedNodes.forEach( ({from, to}, i) => {
		
		const startBoxX = from.offsetLeft;
		const startBoxY = from.offsetTop;
		const startBox = from.getBoundingClientRect();
		const startBoxW = startBox.width;
		const startBoxH = startBox.height;
		
		const endBoxX = to.offsetLeft;
		const endBoxY = to.offsetTop;
		const endBox = to.getBoundingClientRect();
		const endBoxW = endBox.width;
		
		const line = lines[i] = {};
		
		line.startX = startBoxX + ( startBoxW / 2 );
		line.startY = startBoxY + startBoxH + lineGap;
		line.endX = endBoxX + ( endBoxW / 2 );
		line.endY = endBoxY - lineGap;
		
		line.midY1 = line.endY - ((line.endY - line.startY) / 2);
		line.midY2 = line.endY - ((line.endY - line.startY) / 2);
		line.midX = line.startX + (line.endX - line.startX);
		
		line.curveRadius = Math.min( 8, Math.abs((line.endX - line.startX)/2) );
	} );
	
	// Sometimes FOUC causes wrong values. Probably only in React/Gatsby's
	// development mode but I don't want to take any chances.
	// If any endX are the same don't draw.
	if( (new Set( lines.map(({endX})=>endX) )).size !== lines.length )
		return;
	
	// Adjust to resized window, but also clear
	canvas.width = canvasSize.width;
	canvas.height = canvasSize.height;
	
	// Draw
	lines.forEach( (line) => {
		context.beginPath();
		context.moveTo(line.startX, line.startY);
		
		context.arcTo(line.startX, line.midY1, line.midX, line.midY2, line.curveRadius);
		context.arcTo(line.midX, line.midY2, line.endX, line.endY, line.curveRadius);
		
		context.lineTo(line.endX, line.endY);
		
		const gradient = context.createLinearGradient(line.startX, line.startY, line.endX, line.endY);
		gradient.addColorStop(0, '#dadada');
		gradient.addColorStop(.5, '#ddd');
		gradient.addColorStop(.6, '#ddd');
		gradient.addColorStop(1, '#eee');
		
		context.strokeStyle = gradient;
		context.lineWidth = 2;
		context.stroke();
	} );
};