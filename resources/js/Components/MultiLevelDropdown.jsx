import { useState, createContext, useContext, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';

const MultiLevelDropdownContext = createContext();

const MultiLevelDropdown = ({ children, level = 1 }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(prevState => !prevState);
    };

    return (
        <MultiLevelDropdownContext.Provider value={{ open, setOpen, toggleOpen, level }}>
            <div className="relative">{children}</div>
        </MultiLevelDropdownContext.Provider>
    );
};

const MultiLevelTrigger = ({ children }) => {
    const { toggleOpen } = useContext(MultiLevelDropdownContext);

    return (
        <div onClick={(e) => {
            e.stopPropagation();
            toggleOpen();
        }}>
            {children}
        </div>
    );
};

const MultiLevelContent = ({ width = '48', contentClasses = 'py-1 bg-white dark:bg-gray-700', children }) => {
    const { open, level } = useContext(MultiLevelDropdownContext);

    let alignmentClasses = '';
    if (level === 1) {
        alignmentClasses = 'origin-top-left left-0 top-full';
    } else if (level === 2) {
        alignmentClasses = 'ms-2 origin-top-left left-full top-0';
    }

    let widthClasses = '';
    if (width === '48') {
        widthClasses = 'w-40';
    }

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 mt-0 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

const MultiLevelLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out ' +
                className
            }
        >
            {children}
        </Link>
    );
};

MultiLevelDropdown.Trigger = MultiLevelTrigger;
MultiLevelDropdown.Content = MultiLevelContent;
MultiLevelDropdown.Link = MultiLevelLink;

export default MultiLevelDropdown;
