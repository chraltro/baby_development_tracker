import React from 'react';
import { Domain } from '../types';

const iconClass = "h-6 w-6";

const domainIconMap: Record<Domain, React.ReactNode> = {
    [Domain.GROSS_MOTOR]: (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M13.5,5.5c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S12.4,5.5,13.5,5.5z M11.5,10.5v4h1v-4H11.5z M15,10.5v4h1v-4H15z M19.9,13.4 c-0.1-0.2-0.3-0.3-0.5-0.3H16l-1.3,4.2c2,0.6,3.3,2.4,3.3,4.5V23h-2v-1.3c0-1.5-1-2.7-2.4-2.7h-2.1c-1.4,0-2.4,1.2-2.4,2.7V23h-2 v-1.3c0-2.1,1.3-3.9,3.3-4.5L10,13.1H6.6c-0.2,0-0.4,0.1-0.5,0.3L2,19.3l1.4,1.4L6.1,15h13.8l2.7,5.7l1.4-1.4L19.9,13.4z" /></svg>
    ),
    [Domain.FINE_MOTOR]: (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11" /></svg>
    ),
    [Domain.COGNITIVE]: (
       <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
    ),
    [Domain.LANGUAGE_COMMUNICATION]: (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>
    ),
    [Domain.SOCIAL_EMOTIONAL]: (
       <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
    ),
    [Domain.ADAPTIVE_SELF_CARE]: (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>
    )
};

const DomainIcon: React.FC<{ domain: Domain }> = ({ domain }) => <>{domainIconMap[domain]}</>;

export default DomainIcon;
