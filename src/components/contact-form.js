/*
 * 
 * Contact form with name, email, subject selection, and message.
 * 
 */


import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import scope from './contact-form.module.css';



const ContactForm = ({heading, email})=>{
	
	const [formSent, setFormSent] = React.useState(false);
	const [formSending, setFormSending] = React.useState(false);
	const [errorSending, setErrorSending] = React.useState(false);
	const [showSubject, setShowSubject] = React.useState(false);
	
	const { register, handleSubmit, errors } = useForm({shouldFocusError: false});
	
	if( errorSending && (formSending || formSent) ) setErrorSending(false);
	
	const hasErrors = Object.keys(errors).length > 0 || errorSending;	
	if( formSending && (formSent || hasErrors) ) setFormSending(false);
	if( formSent && hasErrors ) setFormSent(false);
	
	const onSubmit = formData => {
		if( hasErrors ) return;
		setFormSending(true);
		
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: Object.keys(formData)
				.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
				.join('&')
		})
			.then(() => {
				setFormSending(false);
				setFormSent(true);
			})
			.catch(error => {
				setFormSending(false);
				setErrorSending(error);
			});
	}
	
	
	const emailCopiedMsgRef = React.useRef(null);
	const handleEmailCopied = ()=>{
		emailCopiedMsgRef.current.className = 'inline-block absolute -mt-10 -ml-4 px-1 bg-gray-800 rounded font-bold text-blue-300 animate-fadeOutUp';
		setTimeout( ()=>{
			emailCopiedMsgRef.current.className = 'hidden';
		}, 1490);
	}
	
	
	
	// Shortcuts:
	const labelClass = 'w-full sm:w-1/3 text-gray-400 font-bold sm:text-right pr-4 my-2';
	const textInputClass = `w-full sm:w-2/3   py-2 px-4
		bg-gray-200 focus:bg-white border-2 border-gray-200 rounded
		text-gray-700 leading-tight
	`;
	
	return (
		<form netlify name="contact-form" method="post"
			className="m-auto max-w-3xl flex flex-col text-lg"
			onSubmit={handleSubmit(onSubmit)}
			onChange={()=>setFormSent(false)}
		>
			
			{/* Name the form for netlify */}
			<input type="hidden" name="form-name" value="contact-form" ref={register()}/>
			
			{/* Heading and our email passed by props */}
			<div className="mb-6 sm:flex">
				{React.cloneElement( heading,
					{className: `${heading.props.className} sm:w-1/3 sm:text-right sm:pr-4` }
				)}
				<div className="sm:w-2/3 mt-auto sm:pb-2 sm:text-right text-gray-300">
					<a href={'mailto:'+email}>{email}</a>
					<CopyToClipboard text={email} onCopy={handleEmailCopied}>
						<span className="relative">
							<button type="button" title="Copy to clipboard" className="inline-block mx-1 p-1 outline-none relative" style={{top:'.1rem'}} onClick={e=>e.preventDefault()}>
								<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 0 32 32">
									<path d="M20 8v-8h-14l-6 6v18h12v8h20v-24h-12zM6 2.828v3.172h-3.172l3.172-3.172zM2 22v-14h6v-6h10v6l-6 6v8h-10zM18 10.828v3.172h-3.172l3.172-3.172zM30 30h-16v-14h6v-6h10v20z"></path>
								</svg>
							</button>
							<div ref={emailCopiedMsgRef} className="hidden">Copied!</div>
						</span>
					</CopyToClipboard>
				</div>
			</div>
			
			{/* Name */}
			<label className="sm:flex mb-6">
				<div className={labelClass}> Your Name </div>
				<input type="text" id="contact-name" name="name" placeholder="Who are you?"
					ref={register({ required: true })}
					className={`form-input ${textInputClass} ${errors.name ? 'shadow-error text-red-700' : ''}`}
				/>
			</label>
			
			{/* Email */}
			<label className="sm:flex mb-6">
				<div className={labelClass}> Your Email </div>
				<input type="text" name="email" placeholder="new-boss@awesome.company"
					ref={register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
					className={`form-input ${textInputClass} ${errors.email ? 'shadow-error text-red-700' : ''}`}
				/>
			</label>
			
			{/* Subject radio options */}
			{/* Fieldset breaks flexbox, chrome issue #375693, inner div */}
			<fieldset><div className="sm:flex mb-2">
				{/* Legend breaks flexbox (FF and Chrome), wrap in div */}
				<div className={labelClass}> <legend className="block p-0 pointer-events-none">
					What&apos;s up?
				</legend> </div>
				<div className={`${scope.radioContainer} w-full sm:w-2/3 flex flex-wrap`}
					onChange={ e=>setShowSubject(e.target.value === 'Custom Subject') }
				>
					<RadioCard ref={register()} value='Job' defaultChecked> Job Opportunity </RadioCard>
					<RadioCard ref={register()} value='Help'> My Site Needs Help </RadioCard>
					<RadioCard ref={register()} value='You&apos;re Awesome'> Just letting you know you&apos;re awesome </RadioCard>
					<RadioCard ref={register()} value='Custom Subject'> Another subject... </RadioCard>
				</div>
			</div></fieldset>
			
			{/* Subject input, only show when last radio above is selected */}
			<label className={`${showSubject ? 'sm:flex' : 'hidden'} mb-6`}>
				<div className={labelClass}> How can I help? </div>
				<input type="text" name="custom_subject" placeholder="About that thing..." ref={register()}
					className={`form-input ${textInputClass}`}
				/>
			</label>
			
			{/* Message body */}
			<label className="sm:flex mb-6">
				<div className={labelClass}> Your Message </div>
				<textarea name="body" ref={register({ required: true })}
					className={`h-48 form-textarea ${textInputClass}
						${errors.body ? 'shadow-error' : ''}
					`}
				></textarea>
			</label>
			
			{/* Submit button and messages */}
			<div className="sm:flex items-start sm:pl-1/3">
				<input type="submit" value={formSent ? 'Sent!' : 'Send'} disabled={formSent}
					className={`w-full sm:w-auto   py-2 px-8   mb-4
						rounded font-bold bg-blue-500 text-white
						hover:bg-blue-700   disabled:bg-green-700
					`}
				/>
				<ul className="animate-shakeX min-h-28 py-2 sm:px-8 text-lg text-red-400" key={+new Date()}>
					{errors.name?.type  === 'required' && <li className="pb-1"> Wait, what&apos;s your name? </li>}
					{errors.email?.type === 'required' && <li className="pb-1"> I&apos;ll need your email to reply! </li>}
					{errors.email?.type === 'pattern'  && <li className="pb-1"> That email won&apos;t work. </li>}
					{errors.body?.type  === 'required' && <li className="pb-1"> What&apos;s your message? </li>}
					
					{formSending && <LoadingAnimation />}
					
					{formSent && <li className="text-green-400"> Thanks! </li>}
					
					{errorSending && <li>
						Oops! Looks like there was an error submitting. Please confirm your internet connection is working. If the error persists let me know by email. 
						<div className="text-gray-500 my-2 text-sm">{errorSending.toString()}</div>
					</li>}
				</ul>
			</div>
			
		</form>
	);
};

ContactForm.propTypes = {
	heading: PropTypes.node,
	email: PropTypes.string,
};



const RadioCard = ({children, ...moreProps}) => (
	<div className="inline-block w-full sm:w-1/2 sm:odd:pr-4 mb-4">
		<label className="cursor-pointer">
			<input type="radio" name="subject" {...moreProps} className="appearance-none absolute shadow-never"/>

			<div className={`${scope.radioCard} h-full   py-2 px-4   flex
				rounded bg-gray-200 border-2 border-gray-200
				text-gray-700 leading-tight
			`}>
				
				{/* Unchecked radio icon */}
				<svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"
					className={`${scope.iconUnchecked} flex-shrink-0   h-6 mr-2   opacity-50 stroke-2 stroke-current`}
				>
					<circle cx="10" cy="10.5435" r="9" fill="none"/>
				</svg>
				
				{/* Checked radio icon */}
				<svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"
					className={`${scope.iconChecked} flex-shrink-0   h-6 mr-2   text-green-700 fill-current stroke-current stroke-2`}
				>
					<path strokeWidth="0" d="M16.0576 2.58634C14.3765 1.30459 12.2772 0.543457 10 0.543457C4.47715 0.543457 0 5.02061 0 10.5435C0 16.0663 4.47715 20.5435 10 20.5435C15.5228 20.5435 20 16.0663 20 10.5435C20 9.91753 19.9425 9.30504 19.8325 8.71098L18 10.5435C18 14.9617 14.4183 18.5435 10 18.5435C5.58172 18.5435 2 14.9617 2 10.5435C2 6.12518 5.58172 2.54346 10 2.54346C11.7242 2.54346 13.321 3.08892 14.6273 4.01669L16.0576 2.58634Z"/>
					<path d="M4.5 8.11453L10.6568 14.2713"/>
					<line x1="9.24263" y1="14.2713" x2="21.7714" y2="3.15682" />
				</svg>
				
				{children}
			</div>
		</label>
	</div>
);

RadioCard.propTypes = {
	children: PropTypes.node,
};



const LoadingAnimation = () => (
	<svg width="24px" height="30px" viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg"
		className="fill-current text-gray-100"
	>
		<rect x="0" y="13" width="4" height="5">
			<animate attributeName="height" values="5;21;5"
				begin="0s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="y" values="13; 5; 13"
				begin="0s" dur="0.6s" repeatCount="indefinite" />
		</rect>
		<rect x="10" y="13" width="4" height="5">
			<animate attributeName="height" values="5;21;5"
				begin="0.15s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="y" values="13; 5; 13"
				begin="0.15s" dur="0.6s" repeatCount="indefinite" />
		</rect>
		<rect x="20" y="13" width="4" height="5">
			<animate attributeName="height" values="5;21;5"
				begin="0.3s" dur="0.6s" repeatCount="indefinite" />
			<animate attributeName="y" values="13; 5; 13"
				begin="0.3s" dur="0.6s" repeatCount="indefinite" />
		</rect>
	</svg>
);



export default ContactForm;
