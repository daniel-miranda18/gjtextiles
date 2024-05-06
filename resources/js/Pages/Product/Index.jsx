import { Pagination } from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, products, success, error }) {
    return (
        
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Productos" />

            {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded-lg my-10 mx-10">
                {success}
            </div>)}

            {error && (<div className="bg-red-500 py-2 px-4 text-white rounded-lg my-10 mx-10">
                {error}
            </div>)}
            
            <div className="flex justify-end pr-10 mt-5">
                <Link
                    href={route("product.create")}
                    className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                >
                    NUEVO
                </Link>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">Nombre</th>
                                        <th className="px-3 py-2">Stock</th>
                                        <th className="px-3 py-2">Precio</th>
                                        <th className="px-3 py-2">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map(product => (
                                        <tr className="bg-white border-b-1 dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">
                                                {product.name}
                                            </td>
                                            <td className="px-3 py-2">
                                                {product.stock}
                                            </td>
                                            <td className="px-3 py-2">
                                                Bs. {product.price}
                                            </td>
                                            <td className="px-3 py-2">
                                                <Link
                                                    href={route("product.edit", product.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Editar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={products.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}