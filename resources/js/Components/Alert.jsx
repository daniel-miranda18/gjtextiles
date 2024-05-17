import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

export default function Alert({ type = 'info', children, className = '', ...props }) {
    const [visible, setVisible] = useState(true);
    
    const baseClasses = 'flex items-center p-4 border-t-4 rounded-md font-semibold text-sm';
    const typeClasses = {
        success: 'bg-green-100 text-green-800 border-green-200',
        error: 'bg-red-100 text-red-800 border-red-200',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        info: 'bg-blue-100 text-blue-800 border-blue-200',
    };

    const iconClasses = 'flex-shrink-0 w-4 h-4 mr-3';

    const icons = {
        success: (
            <svg className={iconClasses} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM8.707 13.707l-3.414-3.414 1.414-1.414L8.707 11.586l4.586-4.586 1.414 1.414-6 6z"/>
            </svg>
        ),
        error: (
            <svg className={iconClasses} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V7h2v4z"/>
            </svg>
        ),
        warning: (
            <svg className={iconClasses} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V7h2v4z"/>
            </svg>
        ),
        info: (
            <svg className={iconClasses} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V7h2v4z"/>
            </svg>
        ),
    };

    return (
        <Transition
            show={visible}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
        >
            <div
                {...props}
                className={`${baseClasses} ${typeClasses[type]} ${className}`}
            >
                {icons[type]}
                <div className="flex-grow">{children}</div>
                <button
                    onClick={() => setVisible(false)}
                    className="ml-4 text-xl font-bold leading-none focus:outline-none"
                >
                    &times;
                </button>
            </div>
        </Transition>
    );
}
