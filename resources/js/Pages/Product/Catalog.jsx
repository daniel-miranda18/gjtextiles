import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';

export default function Catalog({ auth, user, products, searchTerm }) {
    const { url } = usePage();
    const [search, setSearch] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const encodedSearchTerm = encodeURIComponent(search);
        window.location.href = `/product/catalog?search=${encodedSearchTerm}`;
    };
    const handleChange = (e) => {
        setSearch(e.target.value);
    };
    const handleClearSearch = () => {
        window.location.href = '/product/catalog';
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Catálogo" />
            {searchTerm && (
                <div className="flex justify-end pr-10 mt-4">
                    <button
                        onClick={handleClearSearch} 
                        className="block text-gray-100 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-blue-800"
                    >
                        Volver al inicio
                    </button>
                </div>
            )}
            <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        id="default-search" 
                        value={search}
                        onChange={handleChange}
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Ingrese algo..." 
                        required 
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
                </div>
            </form>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto ">
                    <div className="flex flex-wrap -m-4">
                        {products.data.map(product => (
                            <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full mb-6">
                                <a className="block relative h-64 overflow-hidden bg-gray-100 hover:bg-gray-200">
                                    {product.images.length > 0 ? (
                                        <img
                                            src={'/storage/'+product.images[0].image}
                                            alt={product.name}
                                            className="object-contain w-full h-full block"
                                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                                        />
                                    ) : (
                                        <div className="flex justify-center items-center w-full h-full bg-gray-300 text-gray-600">
                                            Sin imagen
                                        </div>
                                    )}
                                </a>
                                <div className="mt-4">
                                    <Link
                                        href={route("product.personalize", product.id)}
                                        className="font-medium text-indigo-500 dark:text-indigo-500 hover:underline mx-1"
                                    >
                                        Más Información
                                    </Link>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                                    <p className="mt-1">Bs. {product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {products.data.length === 0 && (
                        <p className="text-center text-gray-500 mt-8">No hay productos disponibles.</p>
                    )}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
