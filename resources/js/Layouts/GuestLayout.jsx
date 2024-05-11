import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-10 sm:pt-0 bg-gradient-to-b from-indigo-200 to-white">
            <div className="w-full sm:max-w-md px-10 py-10 bg-white dark:bg-gray-800 shadow-lg overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
