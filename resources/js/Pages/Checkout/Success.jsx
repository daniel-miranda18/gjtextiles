import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Success({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mensaje de Confirmación" />
            <div className="bg-gray-100 dark:bg-gray-800 h-screen">
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-48 mx-auto">
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 dark:text-white font-semibold text-center">¡Pago Realizado!</h3>
                    <p className="text-gray-600 dark:text-white my-2">Gracias por completar su pago en línea.</p>
                    <p className="text-gray-400"> ¡Qué tengas un lindo día!  </p>
                    <div className="py-10 text-center">
                        <a href={route('order.index')} className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            VER MIS COMPRAS
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}