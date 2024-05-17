import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import Alert from '@/Components/Alert';

export default function Catalog({ auth, user, products, searchTerm }) {
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

            <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 mt-8">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div class="hidden w-full md:block md:w-auto">
                        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="#" class="mt-2 block text-sm py-2 px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Todos los Productos</a>
                            </li>
                            <li>
                                <a href="#" class="mt-2 block text-sm py-2 px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Nuevos Productos</a>
                            </li>
                            <li>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                            Ropa de Hombre
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href="">Todo Para Hombre</Dropdown.Link>
                                        <Dropdown.Link href="">Camisetas Bordadas</Dropdown.Link>
                                        <Dropdown.Link href="">Sublimado</Dropdown.Link>
                                        <Dropdown.Link href="">Camisetas Manga Corta</Dropdown.Link>
                                        <Dropdown.Link href="">Camisetas Manga Larga</Dropdown.Link>
                                        <Dropdown.Link href="">Camisetas Manga 3/4</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </li>
                            <li>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                            Ropa de Mujer
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href="">Todo Para Mujer</Dropdown.Link>
                                        <Dropdown.Link href="">Camisetas Bordadas</Dropdown.Link>
                                        <Dropdown.Link href="">Sublimado</Dropdown.Link>
                                        <Dropdown.Link href="">Camisetas Manga Corta</Dropdown.Link>
                                        <Dropdown.Link href="">Camisetas Manga Larga</Dropdown.Link>
                                        <Dropdown.Link href="">Camisetas Manga 3/4</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                    
                    <ul class="flex items-center space-x-3 rtl:space-x-reverse">
                        <li>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                                            <p class="text-lg">Más Populares</p>
                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href="">Más Populares</Dropdown.Link>
                                    <Dropdown.Link href="">Nuevo</Dropdown.Link>
                                    <p class="ms-2"><b>Precio</b></p>
                                    <Dropdown.Link href="">Bajo-Alto</Dropdown.Link>
                                    <Dropdown.Link href="">Alto-Bajo</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </nav>

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
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
                         <div id="alert-border-4" className="flex items-center mx-16 p-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-300 dark:bg-gray-800 dark:border-yellow-800" role="alert">
                            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                            No hay productos disponibles.
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
