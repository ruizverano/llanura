import ApplicationLogo from '@/Components/ApplicationLogo';
//import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-blue-900">
            <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-md mx-auto mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex flex-col sm:justify-center items-center ">                    
                    <ApplicationLogo />                   
                </div>
                {children}
            </div>
        </div>
    );
}
