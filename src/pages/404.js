/*

	Our 404 page will have a simple message and a basic animated background.

*/



import React from "react";

import Layout, { OuterWrapper, InnerWrapper } from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => {
	
	return (
		<Layout topButton={false}>
			<SEO title="404: Not found" />
			<OuterWrapper>
				<InnerWrapper>
					<h2 className="text-2xl font-bold inline-block my-8">
						Page not found.
					</h2>
					<p className="text-lg">
						Maybe you want to <span className="underline"><b><a href="/">head back to the main page.</a></b></span>
					</p>
				</InnerWrapper>
			</OuterWrapper>
			<script dangerouslySetInnerHTML={{__html: rawScript}}></script>
		</Layout>
	);
}

export default NotFoundPage;


// The animation script. Literally just pasting it from elsewhere.
// Should be in it's own .js file, but just throwing it here for now.
const rawScript = `(function(){
let opts = {
	count: 1, // How many spinny things
	maxVel: 5, // Max pixels moved per frame
	fps: 30,
	parentSelector: 'body', // Will become this element's background
	background: '#fff', // Defaults transparent
	strokeStyle: '#777' // Defaults grey
};



let canvas = document.createElement('canvas');
let parent; // DOM is not yet ready
let context = canvas.getContext('2d');
let cW, cH;
let spinners = [];


canvas.className = 'canvasBackground';
canvas.style.cssText = \`
	display: block; z-index: -99;
	background: \${opts.background || 'transparent'};
	position: absolute; top: 0; left: 0;
\`;


// Helper functions
let random = (min,max)=>Math.floor(Math.random()*(max-min))+min;
let posOrNeg = (v)=>v*Math.sign(Math.random()*10-5);
let debounce = (callback, wait = 250) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), wait);
	};
};

// Call when DOM ready (useEffect)
window.addEventListener('DOMContentLoaded', ()=>{
	parent = document.querySelector(opts.parentSelector);

	// The canvas needs a positioned parent,
	// but we don't want to change an existing value
	if( window.getComputedStyle(parent).position === 'static' ){
		parent.style.position = 'relative';
	}

	parent.appendChild(canvas);
	
	resize();
	
	// Create our spinning things
	for( let i=opts.count; i--; ){
		spinners.push({
			x1: random(0, cW),
			y1: random(0, cH),
			x2: random(0, cW),
			y2: random(0, cH),
			// Avoids these being too close to zero
			vx1: posOrNeg(random(2, opts.maxVel)),
			vy1: posOrNeg(random(2, opts.maxVel)),
			vx2: posOrNeg(random(2, opts.maxVel)),
			vy2: posOrNeg(random(2, opts.maxVel)),
		});
	}
	
	loop();
});


const resize = ()=>{
	// Firefox (at least) seems to have a race condition regarding
	// whether or not the scrollbars appear briefly before this fires.
	// window.innerWidth includes the scrollbar.
	if( parent === document.body ){
		cW = canvas.width = window.innerWidth;
		cH = canvas.height = window.innerHeight;
	} else {
		cW = canvas.width = parent.clientWidth;
		cH = canvas.height = parent.clientHeight;
	}
};
window.addEventListener('resize', debounce(resize));


const loop = ()=>{
	context.clearRect(0, 0, cW, cH);
	
	spinners.forEach(update);
	spinners.forEach(draw);

	setTimeout(
		()=>requestAnimationFrame(loop),
		1000/opts.fps
	);
};


const update = (s)=>{

	// Make sure each velocity is heading away from the boundary

	if( s.x1 >= cW ) s.vx1 = -(Math.abs(s.vx1));
	if( s.x1 <= 0  ) s.vx1 = Math.abs(s.vx1);
	s.x1 += s.vx1;

	if( s.y1 >= cH ) s.vy1 = -(Math.abs(s.vy1));
	if( s.y1 <= 0  ) s.vy1 = Math.abs(s.vy1);
	s.y1 += s.vy1;

	if( s.x2 >= cW ) s.vx2 = -(Math.abs(s.vx2));
	if( s.x2 <= 0  ) s.vx2 = Math.abs(s.vx2);
	s.x2 += s.vx2;

	if( s.y2 >= cH ) s.vy2 = -(Math.abs(s.vy2));
	if( s.y2 <= 0  ) s.vy2 = Math.abs(s.vy2);
	s.y2 += s.vy2;
};


const draw = (s)=>{
	context.beginPath();
	context.moveTo(s.x1, s.y1);
	context.lineTo(	s.x2, s.y2);
	context.lineWidth = .3;
	context.strokeStyle = (opts.strokeStyle || 'grey');
	context.stroke();
};
})();`;